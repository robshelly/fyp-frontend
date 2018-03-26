import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';


function Result(props) {
  if (props.result === "SUCCESS" )
    return (
      <Table.Cell positive>
        <Icon name='check circle' /> Success
      </Table.Cell>
    )
  if (props.result === "FAILURE" )
    return (
      <Table.Cell negative>
        <Icon name='warning circle' />Failure
      </Table.Cell>
    )
  if (props.result === null )
    return (
      <Table.Cell>
        <Icon name='clock' /> Running
      </Table.Cell>
    )
  return (
    <Table.Cell warning>
      <Icon name='question circle' /> Unknown
    </Table.Cell>
  )
}

function Time(props) {
  if (props.timestamp === null )
    return (
      <Table.Cell>
        "Just Now"
      </Table.Cell>
    )
  else return (
    <Table.Cell>
      <Moment format="ddd, MMM Do YYYY @ HH:mm:ss" unix>{props.timestamp}</Moment>
    </Table.Cell>
  )
}


class RestoreResultsItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>
        {this.props.result.server}
        </Table.Cell>
        <Table.Cell>
        {this.props.result.file}
        </Table.Cell>
        <Time timestamp={this.props.result.timestamp} />
        <Result result={this.props.result.result} />
      </Table.Row>
    )
  }
}


class RestoreResults extends React.Component {
  render() {
    var results =  this.props.results.map(function(result) {
      return <RestoreResultsItem key={result.id} result={result} />
    })
    return (
      <Table celled columns={4} color={'blue'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Server</Table.HeaderCell>
            <Table.HeaderCell>File</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {results}
        </Table.Body>
      </Table>

    )
  }
}

export default RestoreResults;