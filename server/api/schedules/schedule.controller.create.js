var jenkinsApi = require('../../../vars').jenkinsApi;

exports.create = function(req, res) {

  console.log("API::Creating Scheduled Restore")

    let template=`<?xml version='1.0' encoding='UTF-8'?>
    <flow-definition plugin="workflow-job@2.15">
      <actions/>
      <description>This pipeline performs a test restoration of a backup&lt;!-- Managed by Jenkins Job Builder --&gt;</description>
      <keepDependencies>false</keepDependencies>
      <properties>
        <org.jenkinsci.plugins.workflow.job.properties.DisableConcurrentBuildsJobProperty/>
        <com.sonyericsson.rebuild.RebuildSettings plugin="rebuild@1.27">
          <autoRebuild>false</autoRebuild>
          <rebuildDisabled>false</rebuildDisabled>
        </com.sonyericsson.rebuild.RebuildSettings>
        <hudson.model.ParametersDefinitionProperty>
          <parameterDefinitions>
            <hudson.model.StringParameterDefinition>
              <name>backupIp</name>
              <description>The IP address of the backup server</description>
              <defaultValue>${req.body.server}</defaultValue>
            </hudson.model.StringParameterDefinition>
            <hudson.model.StringParameterDefinition>
              <name>pathToFile</name>
              <description>The path to the backup files</description>
              <defaultValue>${req.body.pathToFile}</defaultValue>
            </hudson.model.StringParameterDefinition>
            <hudson.model.StringParameterDefinition>
              <name>dataType</name>
              <description>The data type of the backup e.g. json or mysql</description>
              <defaultValue>${req.body.dataType}</defaultValue>
            </hudson.model.StringParameterDefinition>
            <hudson.model.StringParameterDefinition>
              <name>decryptKey</name>
              <description>The GPG key to decryt the backup</description>
              <defaultValue>${req.body.decryptKey}</defaultValue>
            </hudson.model.StringParameterDefinition>
            <hudson.model.StringParameterDefinition>
              <name>email</name>
              <description>Email to notify of failed backups</description>
              <defaultValue>${req.body.email}</defaultValue>
            </hudson.model.StringParameterDefinition>
            <hudson.model.StringParameterDefinition>
              <name>frequency</name>
              <description>This is the frequency with which the job runs. Have no meaning as a parameter but given the Jenkins does not feature any way of retrieving the build schedule via API this is used as a workaround by setting it to the same value</description>
              <defaultValue>${req.body.frequency}</defaultValue>
            </hudson.model.StringParameterDefinition>   
          </parameterDefinitions>
        </hudson.model.ParametersDefinitionProperty>
        <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
          <triggers>
            <hudson.triggers.TimerTrigger>
            <spec>${req.body.frequency}</spec>
            </hudson.triggers.TimerTrigger>
          </triggers>
        </org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
      </properties>
      <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@2.41">
        <script>node {
          def restorationServerIp  
          def backupFileTested
          def backupFileTestedDate
          def restoreFailed = false
          try {
    
            stage (&apos;Deploy Restoration Server&apos;) {
              build job: &apos;auto-pipeline-deploy-restoration-server&apos;, parameters: [
                string(name: &apos;instanceName&apos;, value: &quot;$BUILD_TAG&quot;),
                string(name: &apos;dataType&apos;, value: &quot;\${dataType}&quot;),
              ]
            }

            stage(&apos;Retrieve Restoration Server IP&apos;) {        
          
              withCredentials([[$class: &apos;AmazonWebServicesCredentialsBinding&apos;, accessKeyVariable: &apos;KEY_ID&apos;, credentialsId: &apos;api-aws-jenkins&apos;, secretKeyVariable: &apos;SECRET_KEY&apos;]]) {
          
                restorationServerIp = sh (
                  script: &apos;&apos;&apos;AWS_ACCESS_KEY_ID=$KEY_ID AWS_SECRET_ACCESS_KEY=$SECRET_KEY aws ec2 --region eu-west-1 describe-instances --filters &quot;Name=tag-value,Values=&quot;$BUILD_TAG | grep PublicIpAddress | awk -F&apos;&quot;&apos; &apos;{print $4}&apos; &apos;&apos;&apos;,
                  returnStdout:true
                ).trim()
              }
            }
          
            println &quot;Restoration Server IP: \${restorationServerIp}&quot;
          
            stage(&apos;Decrypt Backup&apos;) {
              def decryptResult = build job: &apos;auto-pipeline-backup-decrypt-latest&apos;, parameters: [
                string(name: &apos;backupIp&apos;, value: &quot;\${backupIp}&quot;),
                string(name: &apos;pathToFile&apos;, value: &quot;\${pathToFile}&quot;),
                string(name: &apos;decryptKey&apos;, value: &quot;\${decryptKey}&quot;),
                string(name: &apos;restorationServerIp&apos;, value: &quot;\${restorationServerIp}&quot;)
              ]
              backupFileTested = decryptResult.getBuildVariables().BackupFile
              backupFileTestedDate = decryptResult.getBuildVariables().BackupFileDate
            }
          
            stage(&apos;Restore Backup&apos;) {
            // Run the correct restore and read according to the data type!
              switch(dataType) {
                case &apos;json&apos;:
                  build job: &apos;auto-pipeline-backup-restore-json&apos;, parameters: [
                    string(name: &apos;restorationServerIp&apos;, value: &quot;\${restorationServerIp}&quot;)
                  ]
                  break;
                case &apos;mysql&apos;:
                  println(&quot;MySQL not implemented yet... here for demo purposes only&quot;)
                  break;
              }
            }

          } catch(Exception e ) {
            restoreFailed = true
            mail (to: "\${email}",
                  subject: "Backup Restoration Failure",
                  body: "A backup test restoration has failed: '\${env.BUILD_TAG}"
                  );
          } finally {
            // Destroy resoration server
            if (restorationServerIp) {
              println("Restoration server was created... destroying")
              stage(&apos;Destroy Restoration Server&apos;) {
                build job: &apos;auto-pipeline-destroy-restoration-server&apos;, parameters: [
                  string(name: &apos;instanceName&apos;, value: &quot;\${BUILD_TAG}&quot;)
                ]
              }
            }
            // End if job failed
            if (restoreFailed) error("Restoration failed")
          }

          // If job reaches this point it was successful, email result
          // and indicate which file was validated
          mail (to: "\${email}",
            subject: "Backup Restoration Successful",
            body: "A backup test restoration has succeeded: test \${env.BUILD_TAG}. The following backup file was verified: \${backupFileTested}, modified \${backupFileTestedDate}"
          );

        }</script>
        <sandbox>false</sandbox>
      </definition>
      <disabled>false</disabled>
    </flow-definition>
    `

  console.log("API: creating schedule: ", req.body.name)

  jenkinsApi.create_job('schedule-'+req.body.name, template, function(err, data) {
    console.log("\tSuccess")
    res.json(data)
  });

}