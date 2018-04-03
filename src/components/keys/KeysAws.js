import React from 'react';
import { Segment, Grid, Label, Form, Button } from 'semantic-ui-react';

const initialState = {
  name: '',
  keyId: '',
  secretKey: '',
  nameRequiredWarning: false,
  keyIdRequiredWarning: false,
  secretKeyRequiredWarning: false,
}

class KeyForm extends React.Component {
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
  
  handleSubmit = (e) => {
    e.preventDefault();
    var name = this.state.name.trim();
    var keyId = this.state.keyId.trim();
    var secretKey = this.state.secretKey.trim();

    // If any fields are blank, set a warning and return
    if (!name) this.setState({nameRequiredWarning: true});
    if (!keyId) this.setState({keyIdRequiredWarning: true});
    if (!secretKey) this.setState({secretKeyRequiredWarning: true});
    if (!name || !keyId || !secretKey) {
      return;
    }

    this.props.addHandler(name, keyId, secretKey);
    this.setState(initialState);
  }

  render() {
    return (<Segment inverted color={'blue'}>
    <Form inverted color={'blue'}>
      {/* Using Grid inside Form allows for nicer adaptive fields sizing different screen sizes */}
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Form.Input
              required={this.state.nameRequiredWarning}
              error={this.state.nameRequiredWarning}
              fluid label='Key Name'
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={this.Change}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Form.Input
              required={this.state.keyIdRequiredWarning}
              error={this.state.keyIdRequiredWarning}
              fluid label='AWS Access Key ID'
              placeholder='Key ID'
              name='keyId'
              value={this.state.keyId}
              onChange={this.Change}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Form.Input
              required={this.state.secretKeyRequiredWarning}
              error={this.state.secretKeyRequiredWarning}
              type='password'
              fluid label='AWS Secret Access Key'
              placeholder='Secret Key'
              name='secretKey'
              value={this.state.secretKey}
              onChange={this.Change}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button
              type='submit'
              color={'red'}
              onClick={this.Click}>Add
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  </Segment>
    )
  }
}

class KeyDetails extends React.Component {

  handleDelete = () => {
    this.props.deleteHandler(this.props.awsKey);
  }

  render() {
    return (
      <Segment color={'blue'}>
      <Grid stackable columns={2}>
        <Grid.Column floated={'left'} width={4}> 
          <Label size={'large'} color='blue' horizontal>Name</Label> 
          <Label basic size={'large'} horizontal>{this.props.awsKey}</Label>
        </Grid.Column>
        <Grid.Column floated={'right'} width={4}> 
          <Button
            color={'red'}
            onClick={this.handleDelete}
            >Delete
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
    )
  }
}


class AwsKey extends React.Component {
  render() {
    const keyComponent = this.props.awsKey ? (
      <KeyDetails
        awsKey={this.props.awsKey}
        deleteHandler={this.props.deleteHandler}
      />
    ) : (
      <KeyForm 
      addHandler={this.props.addHandler}/>
    )
    return (
      <div>
        {keyComponent}
      </div>
    )
  }
}

export default AwsKey

