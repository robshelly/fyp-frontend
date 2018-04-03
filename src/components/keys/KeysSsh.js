import React from 'react';
import { Segment, Header, Table, Button, Form } from 'semantic-ui-react';

const initialFormState = {
  name: '',
  username: '',
  privateKey: '',
  nameRequiredWarning: false,
  usernameRequiredWarning: false,
  privateKeyRequiredWarning: false
}

class SshKeyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = (initialFormState)
  }

  handleChange = (event, {name, value}) => {
    var warningKey = name + 'RequiredWarning'
    this.setState({ [warningKey]: false })
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var name = this.state.name.trim();
    var username = this.state.username.trim();
    var privateKey = this.state.privateKey.trim();

    // If any fields are blank, set a warning and return
    if (!name) this.setState({nameRequiredWarning: true});
    if (!username) this.setState({usernameRequiredWarning: true});
    if (!privateKey) this.setState({privateKeyRequiredWarning: true});
    if (!name || !username || !privateKey) {
      return;
    }

    console.log("Add Handler" +
      "\nName: ", name +
      "\nUsername: ", username +
      "\nPrivateKey: ", privateKey)
    this.props.addHandler(name, username, privateKey);
    this.setState(initialFormState);
  }

  render() {
    return (
      <Segment color={'blue'}>
        <Header as={'h3'} color={'blue'}>Add SSH Key</Header>
        <Form>
          <Form.Input
            required={this.state.nameRequiredWarning}
            error={this.state.nameRequiredWarning}
            fluid label='Name'
            placeholder='Name'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}/>
          <Form.Input
            required={this.state.usernameRequiredWarning}
            error={this.state.usernameRequiredWarning}
            fluid label='Username'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}/>
          <Form.TextArea
            required={this.state.privateKeyRequiredWarning}
            error={this.state.privateKeyRequiredWarning}
            label='Private Key'
            placeholder='Private Key'
            name='privateKey'
            value={this.state.privateKey}
            onChange={this.handleChange}/>
          <Button type='submit' onClick={this.handleSubmit}>Add</Button>
        </Form>
      </Segment>
    )
  }
}

class SshKey extends React.Component {
  handleDelete = () => {
    this.props.deleteHandler(this.props.sshKey)
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          {this.props.sshKey}
        </Table.Cell>
        <Table.Cell textAlign='right'>
          <Button
            color={'red'}
            onClick={this.handleDelete}
            >Delete
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

class KeysList extends React.Component {
  render() {
    var sshKeys = this.props.sshKeys.map(function(sshKey, index) {
      return <SshKey
        key={index}
        sshKey={sshKey}
        deleteHandler={this.props.deleteHandler}
      />
    }.bind(this));
    return (
      <Table color={'blue'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>SSH Key</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sshKeys}
        </Table.Body>
      </Table>
    )
  }
}

class SshKeys extends React.Component {
  render() {
    return (
      <div>
        <KeysList
          sshKeys={this.props.sshKeys}
          deleteHandler={this.props.deleteHandler}
        />
        <SshKeyForm
          addHandler={this.props.addHandler}
        />
      </div>
    )
  }
}

export default SshKeys;
