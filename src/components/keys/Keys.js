import React from 'react';
import request from 'superagent';
import { Header } from 'semantic-ui-react';

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
    //TODO
  }

  fetchSSHKeys() {

  }

  fetchGPGKeys() {

  }

  render() {
    return (
      <Header as={'h2'}>Keys</Header>


    )
  }
}

export default Keys;