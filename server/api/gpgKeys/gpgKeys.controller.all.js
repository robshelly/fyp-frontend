var request = require('superagent');
var ip = require('../../../vars').ip;



exports.getKeys = function(req, res) {

  console.log("API::Fetching GPG keys")

  request.get('http://admin:cloudTech2017@' + ip + ':8080/credentials/')
  .then(function(data) {

    var regex = /href="\/credentials\/store\/system\/domain\/_\/credential.+?"/ig

    var matches = []
    var match;
    

    do {
        match = regex.exec(data.text);
        if (match) {
            matches.push(match[0]);
        }
    } while (match);


    var arrayLength = matches.length;
    var keys = []
    for (var i = 0; i < arrayLength; i++) {
      keys.push(matches[i].split("/").slice(-1)[0].slice(0,-1))
    }

    var gpgKeys = keys.filter(function (k){
      if (k.includes('gpg')) return k;
    })

    res.json(gpgKeys)
      
  })
  .catch(function(err) {
      console.log(err)
      console.log("Error")
  });

}