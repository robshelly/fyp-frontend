import React from 'react';
import { Table, Button } from 'semantic-ui-react';

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
      </div>
    )
  }
}

export default SshKeys;
