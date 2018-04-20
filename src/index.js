import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { Segment, Header } from 'semantic-ui-react'

import App from './App';
import Login from './components/Login'


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

render((
  <Segment basic>
    <Banner />
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/app' component={App} />
      </Switch>
    </BrowserRouter>

  </Segment>
), document.getElementById('root'));
registerServiceWorker();
