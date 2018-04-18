# Final Year Project - Web App Frontend

## Final Year Project: Backups Restoration Centre

The objective of the final year project is to create an service for running and automating test restorations of data base backup files.

## Frontend

This repo contains the web app frontend for the system. It server as a user friendly interface for a Jenkins servers whcih will run the test restoration.

## Frameworks

* NodeJS
* ReactJS

### Packages

* semantic-ui-css
* superagent
* jenkins

## Docker Image

Build Image with the follwing:

    docker build -t rshelly/dashboard-backup-test-centre .

Run image with the following command

    docker run --net="host" -d --name dashboard -p 3000:3000 -p 4000:4000 rshelly/dashboard-backup-test-centre