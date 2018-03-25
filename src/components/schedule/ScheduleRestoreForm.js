import React  from 'react';
import { Button, Form, Segment, Grid } from 'semantic-ui-react';

const initialState = {
  name: '',
  server: '',
  pathToFile: '',
  dataType: '',
  decryptKey:'',
  frequency: '',
  nameRequiredWarning: false,
  serverRequiredWarning: false,
  pathRequiredWarning: false,
  dataTypeRequiredWarning: false,
  decryptKeyRequiredWarning: false,
  frequencyRequiredWarning: false
}

class ScheduleRestoreForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.Change = this.handleChange.bind(this);
    this.Click = this.handleSubmit.bind(this);
  }

  handleChange = (event, {name, value}) => {
    console.log("Change")
    var warningKey = name + 'RequiredWarning'
    this.setState({ [warningKey]: false })
    this.setState({ [name]: value })
  }

  handleSubmit (e) {

    e.preventDefault();
    var name = this.state.name.trim();
    var server = this.state.server.trim();
    var pathToFile = this.state.pathToFile.trim();
    var dataType = this.state.dataType;
    var decryptKey = this.state.decryptKey;
    var frequency = this.state.frequency.trim();

    // If any fields are blank, set a warning and return
    if (!name) this.setState({nameRequiredWarning: true});
    if (!server) this.setState({serverRequiredWarning: true});
    if (!pathToFile) this.setState({pathRequiredWarning: true});
    if (!dataType) this.setState({dataTypeRequiredWarning: true});
    if (!decryptKey) this.setState({decryptKeyRequiredWarning: true});
    if (!frequency) this.setState({frequencyRequiredWarning: true});
    if (!name || !server || !pathToFile || !dataType || !decryptKey || !frequency) {
      return;
    }

    this.props.runHandler(name, server, pathToFile, dataType, decryptKey, frequency);
    this.setState(initialState);
  }

  render() {
    console.log("Rendering")
    var decryptKeys = this.props.decryptKeys.map(function(decryptKey) {
      return { key: decryptKey, text: decryptKey, value: decryptKey }
    });
    var dataTypes = [
      {key: 'json', text: 'json', value: 'json'}
    ]
    return (

      <Segment inverted color={'blue'}>
        <Form inverted color={'blue'}>
          {/* Using Grid inside Form allows for nicer adaptive fields sizing different screen sizes */}
          <Grid>
            <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Input
                required={this.state.nameRequiredWarning}
                error={this.state.nameRequiredWarning}
                fluid label='Name'
                placeholder='Name the restoration schedule'
                name='name'
                value={this.state.name}
                onChange={this.Change}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Input
                required={this.state.serverRequiredWarning}
                error={this.state.serverRequiredWarning}
                fluid label='Backup Server'
                placeholder='IP or DNS'
                name='server'
                value={this.state.server}
                onChange={this.Change}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Input
                required={this.state.pathRequiredWarning}
                error={this.state.pathRequiredWarning}
                fluid label='Path to Files'
                placeholder='Full Path'
                name='pathToFile'
                value={this.state.pathToFile}
                onChange={this.Change}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Select
                required={this.state.dataTypeRequiredWarning}
                error={this.state.dataTypeRequiredWarning}
                fluid label='Data Type'
                placeholder='Select'
                name='dataType'
                value={this.state.dataType}
                onChange={this.Change}
                options={dataTypes} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Select
                required={this.state.decryptKeyRequiredWarning}
                error={this.state.decryptKeyRequiredWarning}
                fluid label='Decryption Key'
                placeholder='Select'
                name='decryptKey'
                value={this.state.decryptKey}
                onChange={this.Change}
                options={decryptKeys} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Input
                required={this.state.frequencyRequiredWarning}
                error={this.state.frequencyRequiredWarning}
                fluid label='Frequency'
                placeholder='* * * * *'
                name='frequency'
                value={this.state.frequency}
                onChange={this.Change}/>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button type='submit' onClick={this.Click}>Run</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }

}

export default ScheduleRestoreForm;