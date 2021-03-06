import React  from 'react';
import { Button, Form, Segment, Grid } from 'semantic-ui-react';

const initialState = {
  server: '',
  file: '',
  dataType: '',
  decryptKey:'',
  serverRequiredWarning: false,
  pathRequiredWarning: false,
  dataTypeRequiredWarning: false,
  decryptKeyRequiredWarning: false,
}
  

class RunRestoreForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.Change = this.handleChange.bind(this);
    this.Click = this.handleSubmit.bind(this);
  }

  handleChange = (event, {name, value}) => {
    var warningKey = name + 'RequiredWarning'
    this.setState({ [warningKey]: false })
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault();
    var server = this.state.server.trim();
    var file = this.state.file.trim();
    var dataType = this.state.dataType;
    var decryptKey = this.state.decryptKey;

    // If any fields are blank, set a warning and return
    if (!server) this.setState({serverRequiredWarning: true});
    if (!file) this.setState({fileRequiredWarning: true});
    if (!dataType) this.setState({dataTypeRequiredWarning: true});
    if (!decryptKey) this.setState({decryptKeyRequiredWarning: true});
    if (!server || !file || !dataType || !decryptKey) {
      return;
    }

    this.props.runHandler(server, file, dataType, decryptKey);
    this.setState(initialState);
  }

  render() {
    var decryptKeys = this.props.decryptKeys.map(function(decryptKey) {
      return { key: decryptKey, text: decryptKey, value: decryptKey }
    });
    var dataTypes = [
      {key: 'json', text: 'json', value: 'json'},
      {key: 'mysql', text: 'mysql', value: 'mysql'}
    ]
    return (

      <Segment inverted color={'blue'}>
        <Form inverted color={'blue'}>
          {/* Using Grid inside Form allows for nicer adaptive fields sizing different screen sizes */}
          <Grid>
            <Grid.Row>
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
                required={this.state.fileRequiredWarning}
                error={this.state.fileRequiredWarning}
                fluid label='Backup File'
                placeholder='Full Path'
                name='file'
                value={this.state.file}
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
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button type='submit' onClick={this.Click}>Run</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    )
  }
};

export default RunRestoreForm;