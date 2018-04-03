import React from 'react';
import request from 'superagent';
import { Header } from 'semantic-ui-react';

import AWS from './KeysAws'

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

  render() {
    return (
      <div>
        <Header as={'h2'}>Keys</Header>
        <AWS
          awsKey={this.state.awsKey}
          deleteHandler={this.deleteAWSKey.bind(this)}
          addHandler={this.addAWSKey.bind(this)}
        />
      </div>
    )
  }
}

export default Keys;