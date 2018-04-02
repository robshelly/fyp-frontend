import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Home from './components/Home'
import Docs from './components/docs/Docs'
import Restores from './components/restore/Restore'
import Schedules from './components/schedule/Schedules'

import { Header, Segment, Menu } from 'semantic-ui-react'

class AppMenu extends Component {
  render() {
    return (
      <Menu
        inverted
        color={'teal'}
        size={'large'}
        >
          <Menu.Item as={ Link } name='schedules' to='/schedules'>
            Schedules
          </Menu.Item>
          <Menu.Item as={ Link } name='restores' to='/restores'>
            Restorations
          </Menu.Item>
          <Menu.Item as={ Link } name='docs' to='/docs'>
            Documentation
          </Menu.Item>
      </Menu>
    )
  }
}

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
          <Route path='/restores' component={Restores}/>
          <Route path='/schedules' component={Schedules}/>
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
        <AppMenu/>
        <Main/>
      </Segment>
    );
  }
}


export default App;


