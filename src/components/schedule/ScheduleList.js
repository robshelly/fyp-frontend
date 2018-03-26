import React from 'react';
import { Header, Segment, Grid, Icon, Message, Button } from 'semantic-ui-react';
import Moment from 'react-moment';

function Result(props) {
  if (props.result === "SUCCESS" )
    return (
      <Grid.Column>
        <Message positive>
          <Message.Content>
            <Icon name='check circle' /> Success
          </Message.Content>
        </Message>
      </Grid.Column>
    )
  if (props.result === "FAILURE" )
    return (
      <Grid.Column>
        <Message negative>
          <Message.Content>
            <Icon name='check circle' />Failure
          </Message.Content>
        </Message>
      </Grid.Column>
    )
  if (props.result === null )
    return (
      <Grid.Column>
        <Message >
          <Message.Content>
            <Icon name='clock' /> Running
          </Message.Content>
        </Message>
      </Grid.Column>
    )
  return (
    <Grid.Column >
      <Message warning>
        <Message.Content>
          <Icon name='question circle' /> Unknown
        </Message.Content>
      </Message>
    </Grid.Column>
  )
}

function Time(props) {
  if (props.lastRun === null )
    return (
      <Grid.Column>
        "Just Now"
      </Grid.Column>
    )
  else return (
    <Grid.Column>
      <Header as={'h4'}>
        <Moment format="ddd, MMM Do YYYY @ HH:mm:ss" unix>{props.timestamp}</Moment>
      </Header>
    </Grid.Column>
  )
}

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.Click = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault();
    this.props.runHandler(this.props.schedule.name);
  }

  render() {
    return (
      <Segment color={'green'}>
        <Grid stackable columns={4}>
          <Grid.Column>
            <Header as={'h4'}>{this.props.schedule.name}</Header>
          </Grid.Column>
          <Time timestamp={this.props.schedule.lastRun} />
          <Result result={this.props.schedule.lastResult} />
          <Grid.Column>
            <Button 
              color={'red'}
              onClick={this.Click}> 
              Run Now </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

class ScheduleList extends React.Component {
  render() {
    var schedules = this.props.schedules.map(function(schedule) {
      return <Schedule key={schedule.name} schedule={schedule} runHandler={this.props.runHandler} />
    }.bind(this));
    return (
      <div>
        <Segment inverted color={'green'}>
          <Grid stackable columns={4}>
            <Grid.Column>
              <Header inverted as='h4'>Name</Header>
            </Grid.Column>
            <Grid.Column>
              <Header inverted as='h4'>Last Run</Header>
            </Grid.Column>
            <Grid.Column>
              <Header inverted as='h4'>Last Result</Header>
            </Grid.Column>
          </Grid>
        </Segment>
        {schedules}
      </div>
    )
  }
}

export default ScheduleList;