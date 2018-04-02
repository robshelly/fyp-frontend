import React from 'react';
import request from 'superagent';

import ScheduleRestoreForm from './ScheduleRestoreForm'
import ScheduleList from  './ScheduleList'


class SchedulesAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decryptKeys: [],
      schedules: []
    };
  }

  componentWillMount() {
    this.fetchKeys();
    this.fetchSchedules();
  }

  fetchSchedules() {

    request.get('http://127.0.0.1:4000/schedules/')
    .then((res) => {
      this.setState( {schedules: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching schedules:" + err)
    });

  }

  fetchKeys() {

    request.get('http://127.0.0.1:4000/gpgKeys/')
    .then((res) => {
      this.setState( {decryptKeys: JSON.parse(res.text)} );
    })
    .catch((err) => {
      console.log("Error fetching keys:" + err)
    });
  }

  runSchedule(name) {
    console.log("Running Scheduled Restore Now: " + name)

    request
      .post('http://127.0.0.1:4000/schedules/' + name)
      .send()
      .set('Content-Type', 'application/json')
      .then((res) => {
        var newSchedules = this.state.schedules
        for(var i = 0; i < newSchedules.length; i++) {
          console.log("Job: ", name)
          console.log("Found: ", newSchedules[i].name)
          if (newSchedules[i].name === name) {
            console.log("updating")
            newSchedules[i].lastResult = null
            newSchedules[i].lastRun = null
            break;
          }
        }
        this.setState({schedules: newSchedules})
        console.log("Refetching")

      })
      .catch((err) => {
        console.log("Error triggering restore: ", err)
      });
  }

  scheduleRestore(name,server,pathToFile,dataType,decryptKey,frequency) {
    request
      .post('http://127.0.0.1:4000/schedules/')
      .send({
        name: name,
        server: server,
        pathToFile: pathToFile,
        dataType: dataType,
        decryptKey: decryptKey,
        frequency: frequency
      })
      .set('Content-Type', 'application/json')
      .then((res) => {
        this.fetchSchedules()
      })
      .catch((err) => {
          console.log(err)
      });
  }

  deleteSchedule(name) {
    console.log("Deleting Schedule: ", name)
    request
      .delete('http://127.0.0.1:4000/schedules/' + name)
      .then(() => {
        var schedules = this.state.schedules.filter((schedule) => schedule.name !== name)
        this.setState({schedules: schedules})
      })
      .catch((err) => {
          console.log(err)
      });
  }

  render() {
    return (
      <div>
        <ScheduleRestoreForm
          decryptKeys={this.state.decryptKeys}
          runHandler={this.scheduleRestore.bind(this)}
          />
        <ScheduleList
          schedules={this.state.schedules}
          runHandler={this.runSchedule.bind(this)}
          deleteHandler={this.deleteSchedule.bind(this)}/>
      </div>
    )
  }
}

export default SchedulesAll;