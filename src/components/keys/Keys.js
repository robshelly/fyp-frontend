import React from 'react';
import request from 'superagent';
import { Grid, Header } from 'semantic-ui-react';

import AWS from './KeysAws'
import SSH from './KeysSsh'
import GPG from './KeysGpg'

class Keys extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      awsKey: null,
      sshKeys: [],
      gpgKeys: []
    }
  }

  componentWillMount() {
    this.fetchAWSKey();
    this.fetchSSHKeys();
    this.fetchGPGKeys();
  }

  fetchAWSKey() {
    request.get('http://127.0.0.1:4000/awsKey/')
    .then((res) => {
      this.setState( {awsKey: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching AWS key:" + err)
    });
  }

  fetchSSHKeys() {
    request.get('http://127.0.0.1:4000/sshKeys/')
    .then((res) => {
      this.setState( {sshKeys: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching SSH keys:" + err)
    });
  }

  fetchGPGKeys() {
    request.get('http://127.0.0.1:4000/gpgKeys/')
    .then((res) => {
      this.setState( {gpgKeys: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching GPG keys:" + err)
    });
  }

  deleteAWSKey(name) {
    request.delete('http://127.0.0.1:4000/awsKey/'+name)
    .then((res) => {
      this.setState( {awsKey: null} );
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });
  }

  addAWSKey(name,keyId,secretKey) {
    console.log("Add AWS key")
    request
      .post('http://127.0.0.1:4000/awsKey/')
      .send({name: name, keyId: keyId, secretKey: secretKey})
      .set('Content-Type', 'application/json')
      .then((res) => {
        // this.fetchAWSKey;
        this.setState({awsKey: name})
      })
      .catch((err) => {
        console.log("Error fetching keys:" + err)
      });
  }

  deleteSshKey(name) {
    request.delete('http://127.0.0.1:4000/sshKeys/'+name)
    .then((res) => {
      this.fetchSSHKeys()
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });
  }

  addSshKey(name,username,privateKey) {
    request.post('http://127.0.0.1:4000/sshKeys/')
    .send({name: name, username: username, privateKey: privateKey})
    .set('Content-Type', 'application/json')

    .then((res) => {
      this.fetchSSHKeys()
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });
  }

  deleteGpgKey(name) {
    request.delete('http://127.0.0.1:4000/gpgKeys/'+name)
    .then((res) => {
      this.fetchGPGKeys()
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });
  }

  addGgpKey(name) {
    console.log("Add SSH key")
  }

  render() {
    return (
      <div>
        <Header as={'h2'}>Keys</Header>
        <Grid>
        <Grid.Row>
          <Grid.Column>
            <AWS
              awsKey={this.state.awsKey}
              deleteHandler={this.deleteAWSKey.bind(this)}
              addHandler={this.addAWSKey.bind(this)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <SSH
              sshKeys={this.state.sshKeys}
              deleteHandler={this.deleteSshKey.bind(this)}
              addHandler={this.addSshKey.bind(this)}
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <GPG
              gpgKeys={this.state.gpgKeys}
              deleteHandler={this.deleteGpgKey.bind(this)}
              addHandler={this.addGgpKey.bind(this)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </div>
    )
  }
}

export default Keys;