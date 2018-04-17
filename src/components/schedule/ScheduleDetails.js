import React  from 'react';
import { Segment, Grid, Form, Button, Header } from 'semantic-ui-react';
import buttons from '../../config/buttonConfig';

class DetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState(this.props.schedule)
    this.Change = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.schedule) !== JSON.stringify(nextProps.schedule))
    {
      this.setState(this.getInitialState(nextProps.schedule));
    }
  } 

  getInitialState = (schedule) => {
    return {
      status: 'singleNormal',
      server: schedule.server,
      pathToFile: schedule.pathToFile,
      dataType: schedule.dataType,
      decryptKey: schedule.decryptKey,
      email: schedule.email,
      frequency: schedule.frequency,
      serverRequiredWarning: false,
      pathRequiredWarning: false,
      dataTypeRequiredWarning: false,
      decryptKeyRequiredWarning: false,
      emailRequiredWarning: false,
      frequencyRequiredWarning: false
    }
  }

  handleChange = (event, {name, value}) => {
    var warningKey = name + 'RequiredWarning'
    this.setState({ [warningKey]: false })
    this.setState({ [name]: value })
  }

  handleEdit = () => {
    this.setState({ status : 'edit'} )
  }

  handleCancel = () => {
    this.setState(this.getInitialState(this.props.schedule));
  }

  handleRun = () => {
    this.setState({ status : 'run'} )
  }

  handleStart = () => {
    this.props.runHandler(this.props.schedule.name);
    this.setState(this.getInitialState)
  }

  handleSave = (e) => {
    var server = this.state.server.trim();
    var pathToFile = this.state.pathToFile.trim();
    var dataType = this.state.dataType;
    var decryptKey = this.state.decryptKey;
    var email = this.state.email.trim();
    var frequency = this.state.frequency.trim();

    e.preventDefault();

    // If any fields are blank, set a warning and return
    if (!server) this.setState({serverRequiredWarning: true});
    if (!pathToFile) this.setState({pathRequiredWarning: true});
    if (!dataType) this.setState({dataTypeRequiredWarning: true});
    if (!decryptKey) this.setState({decryptKeyRequiredWarning: true});
    if (!email) this.setState({emailRequiredWarning: true});
    if (!frequency) this.setState({frequencyRequiredWarning: true});
    if (!server || !pathToFile || !dataType || !decryptKey || !email || !frequency) {
      return;
    }

    this.props.updateHandler(this.props.schedule.name, server, pathToFile, dataType, decryptKey, email, frequency);
  }

  render() {
    var decryptKeys = this.props.decryptKeys.map(function(decryptKey) {
      return { key: decryptKey, text: decryptKey, value: decryptKey }
    });
    var dataTypes = [
      {key: 'json', text: 'json', value: 'json'}
    ]
    var activeButtons = buttons.singleNormal;
    var leftButtonHandler = this.handleRun;
    var rightButtonHandler = this.handleEdit;
    if (this.state.status === 'run' ) {
      activeButtons = buttons.run ;
      leftButtonHandler = this.handleCancel;
      rightButtonHandler = this.handleStart;
    } else if (this.state.status === 'edit' ) {
      activeButtons = buttons.edit ;
      leftButtonHandler = this.handleSave;
      rightButtonHandler = this.handleCancel;
    }
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
                required={this.state.nameRequiredWarning}
                error={this.state.nameRequiredWarning}
                fluid label='Email'
                placeholder='email'
                name='email'
                value={this.state.email}
                onChange={this.Change}/>
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
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <Button
                  color={activeButtons.leftButtonColor}
                  onClick={leftButtonHandler}
                  >{activeButtons.leftButtonVal}
                </Button>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <Button
                  color={activeButtons.rightButtonColor}
                  onClick={rightButtonHandler}
                  >{activeButtons.rightButtonVal}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

class ScheduleDetails extends React.Component {
  render() {
    const scheduleDetails = this.props.schedule ? (
      <div>
        <Header
          as={'h2'}
          color={'teal'}>
          Scheduled Restore: {this.props.schedule.name}
        </Header>
        <DetailsForm 
          schedule={this.props.schedule}
          decryptKeys={this.props.decryptKeys}
          runHandler={this.props.runHandler}
          updateHandler={this.props.updateHandler}
          deleteHandler={this.props.deleteHandler}/>
      </div>
    ) : (
      <Header as={'h2'}>Scheduled Restore</Header>
    );
    return (
      <div>
        {scheduleDetails}
      </div>
    )
  }
}

export default ScheduleDetails;