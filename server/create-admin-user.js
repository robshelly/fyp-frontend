var User   = require('./models/user'); 
var mongoose    = require('mongoose');
var secrets = require('./secrets'); // get our secrets file

mongoose.connect(secrets.database); // connect to database


// create a sample user
var user = new User({ 
  username: 'USERNAME', 
  password: 'PASSWORD'
});

// save the sample user
user.save()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
  .then(() => {
    mongoose.disconnect()
  })