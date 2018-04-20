import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import SchedulesAll from './SchedulesAll'
import ScheduleSingle from './ScheduleSingle'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/app/schedules' component={SchedulesAll}/>
        <Route path='/app/schedules/:name' component={ScheduleSingle}/>
      </Switch>
    )
  }
}

class Schedules extends Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}


export default Schedules;


