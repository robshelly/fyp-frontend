import React  from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

class RunRestoreForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      location: '',
      dataType: '',
      decryptKey:'',
    };
    this.Change = this.handleChange.bind(this);
    this.Click = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit (e) {
    e.preventDefault();
    var file = this.state.file.trim();
    var location = this.state.location.trim();
    var dataType = this.state.dataType;
    var decryptKey = this.state.decryptKey;

    console.log(
      "\nfile: " + file +
      "\nlocation: " + location +
      "\ndataType: " + dataType +
      "\ndecryptKey: " + decryptKey
    )

    if (!file || !location || !dataType || !decryptKey) {
      return;
    }
    this.props.runHandler(location, file, dataType, decryptKey);
    this.setState({file: '', location: '', dataType: '', decryptKey: ''});
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
          <Form.Group widths='equal'>
            <Form.Input
              fluid label='Backup Server'
              placeholder='IP or DNS'
              name='location'
              value={this.state.location}
              onChange={this.Change}/>
            <Form.Input
              fluid label='Backup Directory'
              placeholder='Full Path'
              name='file'
              value={this.state.file}
              onChange={this.Change}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select
              fluid label='Data Type'
              placeholder='Select'
              name='dataType'
              value={this.state.dataType}
              onChange={this.Change}
              options={dataTypes} />
            <Form.Select
              fluid label='Decryption Key'
              placeholder='Select'
              name='decryptKey'
              value={this.state.decryptKey}
              onChange={this.Change}
              options={decryptKeys} />
          </Form.Group>
          <Button type='submit' onClick={this.Click}>Run</Button>
        </Form>
      </Segment>
    )
  }
};

export default RunRestoreForm;