import React from 'react';
import { Segment, Header, Table, Button, Form } from 'semantic-ui-react';

const initialFormState = {
  name: '',
  username: '',
  password: '',
  privateKey: '',
  nameRequiredWarning: false,
  usernameRequiredWarning: false,
  passwordRequiredWarning: false,
  privateKeyRequiredWarning: false
}

class GpgKeyForm extends React.Component {
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
    var password = this.state.password.trim();
    var privateKey = this.state.privateKey.trim();

    // If any fields are blank, set a warning and return
    if (!name) this.setState({nameRequiredWarning: true});
    if (!username) this.setState({usernameRequiredWarning: true});
    if (!password) this.setState({passwordRequiredWarning: true});
    if (!privateKey) this.setState({privateKeyRequiredWarning: true});
    if (!name || !username || !password || !privateKey) {
      return;
    }

    this.props.addHandler(name, username, password, privateKey);
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
          <Form.Input
            required={this.state.passwordRequiredWarning}
            error={this.state.passwordRequiredWarning}
            type='password'
            fluid label='Password'
            placeholder='Password'
            name='password'
            value={this.state.password}
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

class GpgKey extends React.Component {
  handleDelete = () => {
    this.props.deleteHandler(this.props.gpgKey)
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          {this.props.gpgKey}
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
    var gpgKeys = this.props.gpgKeys.map(function(gpgKey, index) {
      return <GpgKey
        key={index}
        gpgKey={gpgKey}
        deleteHandler={this.props.deleteHandler}
      />
    }.bind(this));
    return (
      <Table color={'blue'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>GPG Key</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {gpgKeys}
        </Table.Body>
      </Table>
    )
  }
}

class GpgKeys extends React.Component {
  render() {
    return (
      <div>
        <KeysList
          gpgKeys={this.props.gpgKeys}
          deleteHandler={this.props.deleteHandler}
        />
        <GpgKeyForm
          addHandler={this.props.addHandler}
        />
      </div>
    )
  }
}

export default GpgKeys;