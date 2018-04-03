import React from 'react';
import { Table, Button } from 'semantic-ui-react';

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
      </div>
    )
  }
}

export default GpgKeys;