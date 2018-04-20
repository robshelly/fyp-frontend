var express = require('express');
var app = express();
var mongoose = require('mongoose');

require('./config/express').addMiddleware(app)

var jwt    = require('jsonwebtoken'); // used to create, sign, verify tokens
var secrets = require('./secrets'); // get our secrets file
var User   = require('./models/user'); // get our mongoose model

mongoose.connect(secrets.database);
app.set('secret', secrets.secret);

// Allow necessary headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  req.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  if (req.method === "OPTIONS") 
      res.sendStatus(200);
  else 
      next();
})

// Create authenticate routes
var authRoutes = express.Router();

// This route authenticates a user
authRoutes.post('/authenticate', function(req, res) {

  console.log("Authenticating user: ", req.body.username)

  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      id: user._id,
      user: user.username
    };
        var token = jwt.sign({ id: user.id, username: user.username }, app.get('secret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

// This route verifies that a user is authenticated
// and forwards the request is so
// Thus, order is important here
// All authenticated routes should be declared after this one
authRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('secret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

// apply the above routes the prefix /api
app.use('/', authRoutes);


// All other routes are now accessible only after authentication
require('./routes')(app);

app.listen(4000, function() {
  console.log('Express server listening.');
});

