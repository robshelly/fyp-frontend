import React, { Component } from 'react';
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

class App extends Component {

  runJob (location,file,dataType,decryptKey) {
    console.log("Running Job\n"
      + "Location: " + location
      + "\nFile: "+ file
      + "\nData Type: " + dataType
      + "\nDecryption Key: " + decryptKey)
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
        <div className="ui teal inverted segment">
          <h1 className="ui header">Backup Restoration Centre</h1>
        </div>
        <RunRestoreForm
          
          decryptKeys={decryptKeys}
          runHandler={this.runJob}
            />
      </div>
    );
  }
}

export default App;
