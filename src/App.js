import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Home from './components/Home'
import Docs from './components/docs/Docs'
import Restores from './components/restore/Restore'
import Schedules from './components/schedule/Schedules'
import Keys from './components/keys/Keys'

import { Menu } from 'semantic-ui-react'

import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class AppMenu extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.state = { activeItem: ''}
  }
  
  handleItemClick = (e, { name }) => {
    this.setState({activeItem: name})
    this.props.history.push(`/app/${name}`);
  }



  handleLogout() {
    this.props.handleLogout();
  }

  render() {
    return (
      <Menu
        inverted
        color={'teal'}
        size={'large'}
        >
          <Menu.Item name='schedules' active={this.state.activeItem ==='schedules'} onClick={this.handleItemClick}>
            Schedules
          </Menu.Item>
          <Menu.Item name='restores' active={this.state.activeItem ==='restores'} onClick={this.handleItemClick}>
            Restorations
          </Menu.Item>
          <Menu.Item name='keys' active={this.state.activeItem ==='keys'} onClick={this.handleItemClick}>
            Keys
          </Menu.Item>
          <Menu.Item name='docs' active={this.state.activeItem ==='docs'} onClick={this.handleItemClick}>
            Documentation
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item onClick={this.handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Menu>
      </Menu>
    )
  }
}

class Main extends Component {
  render() {
    return (
        <Switch>
          <Route path='/app/schedules' component={Schedules}/>
          <Route path='/app/restores' component={Restores}/>
          <Route path='/app/keys' component={Keys}/>
          <Route path='/app/docs' component={Docs}/>
        </Switch>
    );
  }
}




class App extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/');
  }

  render() {
    return (
      <div>
        <AppMenu handleLogout={this.handleLogout.bind(this)} history={this.props.history}/>
        <Main/>
      </div>
    );
  }
}


export default withAuth(App);


