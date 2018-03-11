module.exports = function(app) {

  app.use('/restores', require('./api/restores/index'));
  app.use('/schedules', require('./api/schedules/index'));
  app.use('/sshKeys', require('./api/sshKeys/index'));
  app.use('/gpgKeys', require('./api/gpgKeys/index'));

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|app|assets)/*')
   .get(function(req, res) {
    res.send(404);
  })

};