module.exports = function(app) {

  app.use('/restores', require('./api/restores/index'));
  app.use('/schedules', require('./api/schedules/index'));
  app.use('/sshKeys', require('./api/sshKeys/index'));
  app.use('/gpgKeys', require('./api/gpgKeys/index'));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|app|assets)/*')
   .get(function(req, res) {
    res.send(404);
  })

};