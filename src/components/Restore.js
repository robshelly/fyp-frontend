import React, { Component } from 'react';
import request from 'superagent';
import 'semantic-ui-css/semantic.min.css';

class SelectDecryptKeyOption extends React.Component {
  render() {
    return(
      <option value={JSON.stringify(this.props.decryptKey.name)}>
        {this.props.decryptKey.name}
      </option>
    )
  }
}

class RunRestoreForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { file: '', location: '', dataType: '', decryptKey:''};
  }
  handleFileChange (e) {
    this.setState({file: e.target.value});
  }
  handleLocationChange (e) {
    this.setState({location: e.target.value});
  }
  handleDataTypeChange (e) {
    this.setState({dataType: e.target.value})
  }
  handleDecryptKeyChange (e) {
    this.setState({decryptKey: e.target.value})
  }
  handleSubmit (e) {
    e.preventDefault();
    var file = this.state.file.trim();
    var location = this.state.location.trim();
    var dataType = this.state.dataType;
    var decryptKey = this.state.decryptKey;
    if (!file || !location || !dataType) {
      console.log("no data type")
      return;
    }
    this.props.runHandler(location, file, dataType, decryptKey);
    this.setState({file: '', location: '', dataType: '', decryptKey: ''});
  }
  render() {
    var options = this.props.decryptKeys.map(function(decryptKey) {
      return <SelectDecryptKeyOption key={decryptKey.name} decryptKey={decryptKey} />
    });
    return (
      <form className="ui form">
        <div className="field">
          <label>Backup Location</label>
          <input type="text"
            className="form-control"
            placeholder="IP or DNS"
            value={this.state.location}
            onChange={this.handleLocationChange.bind(this)} />
        </div>
        <div className="field">
          <label>Backup File</label>
          <input type="text"
            className="form-control"
            placeholder="Full Path"
            value={this.state.file}
            onChange={this.handleFileChange.bind(this)} />
        </div>
        <div className="field">
          <label>Backup Type</label>
          <select className='ui fluid dropdown'
            value={this.state.dataType}
            onChange={this.handleDataTypeChange.bind(this)}>
            <option defaultValue >Backup Type</option>
            <option value={"json"}>
              json
            </option>
            <option value={"json"}>
              mysql
            </option>
          </select>
        </div>
        <div className="field">
          <label>Decryption Key</label>
          <select className='ui fluid dropdown'
            value={this.state.dataType}
            onChange={this.handleDecryptKeyChange.bind(this)}>
            <option defaultValue >Unencrypted</option>
            {options}
          </select>
        </div>
        <button type="submit"
          className="ui button"
          onClick={this.handleSubmit.bind(this)}>Run
        </button>
      </form>
    )
  }
};

class Test extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    this.props.runHandler();
  }
  render() {
    return (
      <form className="ui form">
        <button type="submit"
          className="ui button"
          onClick={this.handleSubmit.bind(this)}>TEST Fetch Jobs
        </button>
      </form>
    )
  }
};

class Restore extends Component {

  runJob (location,file,dataType,decryptKey) {
    request
      .post('http://127.0.0.1:4000/restores/')
      .send({location: location, file: file, dataType: dataType, decryptKey: decryptKey})
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          alert('Error Triggering Job');
        } 
      });
  }
  getJobs () { // Just here for now as a Test
    request.get('http://127.0.0.1:4000/schedules/')
      .end(function(error, res){
        if (res) {
          console.log("Jobs:" + JSON.parse(res.text))
        } else {
          console.log(error );
        }
      });
  }
  render() {
    // Test data to ensure form works
    var decryptKeys = 
    [
        {"name": "backup1-key"},
        {"name": "backup2-key"}
    ]
    return (
      <div className="App">
        <Test runHandler={this.getJobs}/>
        <RunRestoreForm
          
          decryptKeys={decryptKeys}
          runHandler={this.runJob}
            />
      </div>
    );
  }
}

export default Restore;
