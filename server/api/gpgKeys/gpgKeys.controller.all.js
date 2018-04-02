var request = require('superagent');
var jenkinsUrl = require('../../../vars').jenkinsUrl;

exports.getKeys = function(req, res) {

  console.log("API::Fetching GPG keys")

  request.get(jenkinsUrl + '/credentials/')
  .then(parseKeys)
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    console.log("Error: ", err)
  });
}


var parseKeys = function(data) {
  // Parse the http response for the gpg keys
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

  var gpgKeys = keys.filter((key) => key.startsWith('gpg'))

  return pairKeys(gpgKeys)
    
}

var pairKeys = function(keys) {
  // Jenkins stores gpg keys in and their uname password separetely
  // Filter the keys and return just the common name for each pair
  // i.e
  //    gpg-creds-backup1
  //    gpg-key-secret-key-backup1
  //    gpg-creds-backup2
  //    gpg-key-secret-key-backup2
  // return
  // [backup1, backup2]

  var gpgKeys = keys.filter((key) => {
    // return only keys
    // and only if the corresponding creds exist too
    if (key.startsWith('gpg-key')) {
      var name = key.substring(8)
      if (keys.includes('gpg-creds-'+name)) return key;
    }
    // but return only the name
  }).map((key) => key.substring(8))

  return gpgKeys;

}

