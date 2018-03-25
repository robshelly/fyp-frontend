import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Restore from './components/restore/Restore'
import Docs from './components/Docs'

import { Header, Segment } from 'semantic-ui-react'

class Banner extends Component {
  render () {
    return (
      <Segment inverted color='teal'>
          <Header as='h1'>
            Backup Test Restoration Centre
          </Header>
      </Segment>
    );
  }
}


class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/restore' component={Restore}/>
          <Route path='/docs' component={Docs}/>
        </Switch>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Segment basic>
        <Banner/>
        <Main/>
      </Segment>
    );
  }
}


export default App;


