import React from 'react';
import { Header, Segment, Grid, Icon, Message, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import buttons from '../../config/buttonConfig';

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
    if (props.result === 'NONE' )
      return (
        <Grid.Column>
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
  if (props.lastRun === "NONE" )
    return (
      <Grid.Column>
        <Header as={'h4'}>Never</Header>
      </Grid.Column>
    )
  else if (props.lastRun === null )
    return (
      <Grid.Column>
        <Header as={'h4'}>Just Now</Header>
      </Grid.Column>
    )
  else return (
    <Grid.Column>
      <Header as={'h4'}>
        <Moment format="ddd, MMM Do YYYY @ HH:mm:ss" unix>{props.lastRun}</Moment>
      </Header>
    </Grid.Column>
  )
}

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: 'listNormal' }
    // this.runHandler = this.props.runHandler.bind(this)
  }

  handleDelete = () => {
    this.setState({status: 'del'})
  }

  handleConfirm = () => {
    this.props.deleteHandler(this.props.schedule.name)
  }

  handleCancel = () => {
    this.setState({status: 'listNormal'});
  }

  handleRun = () => {
    this.setState({ status : 'run'} )
  }

  handleStart = () => {
    this.props.runHandler(this.props.schedule.name);
    this.setState({status: 'listNormal'});
  }

  render() {
    var activeButtons = buttons.listNormal;
    var leftButtonHandler = this.handleRun;
    var rightButtonHandler = this.handleDelete;
    if (this.state.status === 'run' ) {
      activeButtons = buttons.run ;
      leftButtonHandler = this.handleCancel;
      rightButtonHandler = this.handleStart;
    } else if (this.state.status === 'del' ) {
      activeButtons = buttons.delete ;
      leftButtonHandler = this.handleConfirm;
      rightButtonHandler = this.handleCancel;
    }
    return (
      <Segment color={'green'}>
        <Grid stackable columns={4}>
          <Grid.Column>
            <Header as={'h4'}>
            <Link to={'/app/schedules/' + this.props.schedule.name}> {this.props.schedule.name} </Link>
            </Header>
          </Grid.Column>
          <Time lastRun={this.props.schedule.lastRun} />
          <Result result={this.props.schedule.lastResult} />
          <Grid.Column>
            <Button
              color={activeButtons.leftButtonColor}
              onClick={leftButtonHandler}
              >{activeButtons.leftButtonVal}
            </Button>
            <Button
              color={activeButtons.rightButtonColor}
              onClick={rightButtonHandler}
              >{activeButtons.rightButtonVal}
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

class ScheduleList extends React.Component {
  render() {
    var schedules = this.props.schedules.map(function(schedule) {
      return <Schedule
        key={schedule.name}
        schedule={schedule}
        runHandler={this.props.runHandler}
        deleteHandler={this.props.deleteHandler}
      />
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