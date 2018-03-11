//Using two different Jenkins API node wrappers because they each do some jobs better
var ip = "34.244.96.240";

let jenkins = require('jenkins')({ baseUrl: 'http://admin:cloudTech2017@' + ip + ':8080', crumbIssuer: false });

var jenkinsapi = require('jenkins-api');
let jenkinsApi = jenkinsapi.init('http://admin:cloudTech2017@' + ip + ':8080');

module.exports = {
  jenkins,
  jenkinsApi,
  ip
};