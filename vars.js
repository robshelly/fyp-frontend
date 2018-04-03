//Using two different Jenkins API node wrappers because they each do some jobs better
var jenkinsIp = "52.210.204.166"
var jenkinsUsername = "admin"
var jenkinsPassword ="cloudTech2017"

let jenkinsUrl = 'http://' + jenkinsUsername + ':' + jenkinsPassword + '@' + jenkinsIp + ':8080'

let jenkins = require('jenkins')({ baseUrl: jenkinsUrl, crumbIssuer: false, promisify: true });

var jenkinsapi = require('jenkins-api');
let jenkinsApi = jenkinsapi.init(jenkinsUrl);

module.exports = {
  jenkins,
  jenkinsApi,
  jenkinsUrl
};