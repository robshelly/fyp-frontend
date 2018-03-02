import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home'
import Restore from './components/Restore'
import Docs from './components/Docs'

class Header extends Component {
  render() {
    return (
      <div className="ui teal inverted segment">
        <h1 className="ui header">Backup Restoration Centre</h1>
      </div>
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
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}


export default App;


