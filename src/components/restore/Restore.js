import React from 'react';
import request from 'superagent';

import RunRestoreForm from './RestoreForm'
import RestoreResults from './RestoreResults'


class Restore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decryptKeys: [],
      restoreResults: [],
    };
  }

  componentWillMount() {
    this.fetchKeys();
    this.fetchResults();
  }

  fetchKeys() {

    request.get('http://127.0.0.1:4000/gpgKeys/')
    .then((res) => {
      this.setState( {decryptKeys: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });

  }

  fetchResults() {

    request.get('http://127.0.0.1:4000/restores/')
    .then((res) => {
      console.log(res.text)
      this.setState( {restoreResults: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });

  }

  runJob (location,file,dataType,decryptKey) {
    request
      .post('http://127.0.0.1:4000/restores/')
      .send({location: location, file: file, dataType: dataType, decryptKey: decryptKey})
      .set('Content-Type', 'application/json')
      .then(function(res) {
          console.log(res)
          this.fetchResults()
      })
      .catch(function(err) {
          console.log(err)
      });
  }

  render() {
    return (
      <div>
        <RunRestoreForm
          decryptKeys={this.state.decryptKeys}
          runHandler={this.runJob}
          />
        <RestoreResults 
          results={this.state.restoreResults}
          />
      </div>
    );
  }
}

export default Restore;
