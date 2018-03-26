import React from 'react';
import request from 'superagent';

import ScheduleRestoreForm from './ScheduleRestoreForm'
import ScheduleList from  './ScheduleList'


class Schedule extends React.Component {
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
      console.log(res.text)
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
      .then((res) => {
        console.log("Restore triggered")
      })
      .catch((err) => {
        console.log("Error fetching keys:" + err)
      });



  }


  scheduleRestore(name,server,pathToFile,dataType,decryptKey,frequency) {
    console.log("Scheduling Restorations")
    console.log(
      "Name: " + name + "\n " +
      "Server: " + server + "\n" +
      "Path To Files: " + pathToFile + "\n" +
      "DataType: " + dataType + "\n" +
      "Key: " + decryptKey + "\n" +
      "Frequency: " + frequency
    )

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
      .then(function(res) {
          console.log(res)
          // TODO get results
      })
      .catch(function(err) {
          console.log(err)
      });
  }

  render() {
    return (
      <div>
        <ScheduleRestoreForm
          decryptKeys={this.state.decryptKeys}
          runHandler={this.scheduleRestore}
          />
        <ScheduleList
          runHandler={this.runSchedule}
          schedules={this.state.schedules} />
      </div>
    )
  }
}


export default Schedule;