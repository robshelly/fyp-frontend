import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import SchedulesAll from './SchedulesAll'
import ScheduleSingle from './ScheduleSingle'

class Schedules extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/schedules' component={SchedulesAll}/>
          <Route path='/schedules/:name' component={ScheduleSingle}/>
        </Switch>
      </div>
    );
  }
}


export default Schedules;


