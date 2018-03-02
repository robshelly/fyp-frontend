// Trigger a restore
exports.runRestore = function(req, res) {

  console.log("API::Running Job\n"
      + "Location: " + req.body.location
      + "\nFile: "+ req.body.file
      + "\nData Type: " + req.body.dataType
      + "\nDecryption Key: " + req.body.decryptKey)

  // TODO Uncomment
  // jenkins.job.build(
  //   { name: 'backup-restoration-pipeline', 
  //     parameters: { 
  //       backupIpAddress: req.body.location,
  //       backup: req.body.file,
  //       dbIpAddress: '34.244.138.102'
  //     }
  //   },
  //   function(err) {
  //     if (err) throw err;
  //     console.log(err);
  //   }
  // );

};