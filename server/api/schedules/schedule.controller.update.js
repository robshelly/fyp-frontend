var jenkins = require('../../../vars').jenkinsApi;

exports.update = function(req, res) {

  console.log("API::Updating Scheduled Restore")
  console.log(
    "\tName: " + req.body.name + "\n" +
    "\tLocation: " + req.body.location + "\n" +
    "\tFile: "+ req.body.file + "\n" +
    "\tData Type: " + req.body.dataType + "\n" +
    "\tDecryption Key: " + req.body.decryptKey + "\n" +
    "\tFrequency: " + req.body.frequency)

  
  let template = 
`<?xml version='1.0' encoding='UTF-8'?>
<flow-definition plugin="workflow-job@2.15">
  <actions/>
  <description>This pipeline performs a test restoration of a backup</description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <org.jenkinsci.plugins.workflow.job.properties.DisableConcurrentBuildsJobProperty/>
    <com.sonyericsson.rebuild.RebuildSettings plugin="rebuild@1.27">
      <autoRebuild>false</autoRebuild>
      <rebuildDisabled>false</rebuildDisabled>
    </com.sonyericsson.rebuild.RebuildSettings>
    <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
      <triggers>
        <hudson.triggers.TimerTrigger>
          <spec>${req.body.frequency}</spec>
        </hudson.triggers.TimerTrigger>
      </triggers>
    </org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
  </properties>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@2.41">
    <script>def backupIp = "${req.body.location}";
    def backupFile = "${req.body.file}";
    def dataType = "${req.body.dataType}";
    def decryptKey = "${req.body.decryptKey}";

    println &quot;Backup Server IP: \${backupIp}&quot;
    println &quot;Backup File: \${backupFile}&quot;


    node {

      stage (&apos;Deploy Restoration Server&apos;) {
        build job: &apos;auto-pipeline-deploy-restoration-server&apos;, parameters: [
          string(name: &apos;instanceName&apos;, value: &quot;$BUILD_TAG&quot;)
        ]
      }

      def restorationServerIp  
      stage(&apos;Retrieve Restoration Server IP&apos;) {        

        withCredentials([[$class: &apos;AmazonWebServicesCredentialsBinding&apos;, accessKeyVariable: &apos;KEY_ID&apos;, credentialsId: &apos;aws-jenkins&apos;, secretKeyVariable: &apos;SECRET_KEY&apos;]]) {

          restorationServerIp = sh (
            script: &apos;&apos;&apos;AWS_ACCESS_KEY_ID=$KEY_ID AWS_SECRET_ACCESS_KEY=$SECRET_KEY aws ec2 --region eu-west-1 describe-instances --filters &quot;Name=tag-value,Values=&quot;$BUILD_TAG | grep PublicIpAddress | awk -F&apos;&quot;&apos; &apos;{print $4}&apos; &apos;&apos;&apos;,
            returnStdout:true
          ).trim()
        }
      }

      println &quot;Restoration Server IP: \${restorationServerIp}&quot;

      stage(&apos;Decrypt Backup&apos;) {
        build job: &apos;auto-pipeline-backup-decrypt&apos;, parameters: [
          string(name: &apos;backupIp&apos;, value: &quot;\${backupIp}&quot;),
          string(name: &apos;backupFile&apos;, value: &quot;\${backupFile}&quot;),
          string(name: &apos;restorationServerIp&apos;, value: &quot;\${restorationServerIp}&quot;)
        ]
      }

      stage(&apos;Restore Backup&apos;) {
        build job: &apos;auto-pipeline-backup-restore&apos;, parameters: [
          string(name: &apos;restorationServerIp&apos;, value: &quot;\${restorationServerIp}&quot;)
        ]
      }

      stage(&apos;Destroy Restoration Server&apos;) {
        build job: &apos;auto-pipeline-destroy-restoration-server&apos;, parameters: [
          string(name: &apos;instanceName&apos;, value: &quot;\${BUILD_TAG}&quot;)
        ]
      }

    }</script>
    <sandbox>false</sandbox>
  </definition>
  <disabled>false</disabled>
</flow-definition>`


  // jenkinsApi.create_job('api-'+req.body.name, template, function(err, data) {
  //   if (err){ return console.log("Error: "+err); }
  //   console.log(data)
  //   res.json(data)
  // });

  jenkins.update_job('schedule-'+req.body.name, template, function(err, data) {
    // if no error, job was copied 
    if (err){ return console.log(err); }
    console.log("\tSuccess")
    res.json(data)
  });

}