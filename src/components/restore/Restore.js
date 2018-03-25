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
      this.setState( {restoreResults: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });

  }

  runJob (server,file,dataType,decryptKey) {

    console.log(
      "Server: " + server + "\n" + 
      "File: " + file + "\n" + 
      "Type: " + dataType + "\n" + 
      "Key: " + decryptKey
    )
    
    var self = this;

    request
      .post('http://127.0.0.1:4000/restores/')
      .send({server: server, file: file, dataType: dataType, decryptKey: decryptKey})
      .set('Content-Type', 'application/json')
      .then((res) => {
        var newResults = this.state.restoreResults
        newResults.unshift({
          id: (parseInt(newResults[0].id, 10) + 1).toString(),
          timestamp: null,
          result: null,
          server: server,
          file: file
        })
        self.setState({restoreResults: newResults})
      })
      .catch((err) => {
          console.log(err)
      });
  }

  render() {
    return (
      <div>
        <RunRestoreForm
          decryptKeys={this.state.decryptKeys}
          runHandler={this.runJob.bind(this)}
          />
        <RestoreResults 
          results={this.state.restoreResults}
          />
      </div>
    );
  }
}

export default Restore;
