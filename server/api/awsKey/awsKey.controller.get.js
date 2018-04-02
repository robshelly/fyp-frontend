var request = require('superagent');
var jenkinsUrl = require('../../../vars').jenkinsUrl;

exports.getKey = function(req, res) {

  console.log("API::Fetching AWS key")

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
  // Parse the http response for the aws key
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

  var awsKey = keys.find((key) => key.startsWith('api-aws'));

  return ({name: awsKey.substring(8)})
    
}

