import React from 'react';
import request from 'superagent';

import Results from './ScheduleResults'
import ScheduleDetails from './ScheduleDetails'

class ScheduleSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: null,
      results: [],
      decryptKeys: []
    };
  }

  componentWillMount() {
    this.fetchKeys();
    this.fetchSchedule();
  }

  fetchSchedule() {

    request.get('http://127.0.0.1:4000/schedules/' + this.props.match.params.name)
    .then((res) => {
      var schedule = JSON.parse(res.text)
      this.setState( {results: schedule.tests} );
      delete schedule['tests']
      this.setState( {schedule: schedule} );
    })
    .catch((err) => {
      console.log("Error fetching schedule:" + err)
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
        var newResults = this.state.results
        var id = newResults.length === 0 ? 1 : (parseInt(newResults[0].id, 10) + 1).toString()
        newResults.unshift({
          id: id,
          timestamp: null,
          result: null
        })
        this.setState({results: newResults})
      })
      .catch((err) => {
        console.log("Error triggering restore: ", err)
      });
  }

  updateSchedule(name, server, pathToFile, dataType, decryptKey, email, frequency) {
    console.log("Updating Scheduled Restore: " + name)
    request
      .put('http://127.0.0.1:4000/schedules/' + name)
      .send({
        name: name,
        server: server,
        pathToFile: pathToFile,
        dataType: dataType,
        decryptKey: decryptKey,
        email: email,
        frequency: frequency
      })
      .set('Content-Type', 'application/json')
      .then((res) => {
        this.fetchSchedule()
      })
      .catch((err) => {
          console.log(err)
      });
  }

  render() {
    return (
      <div>
        <ScheduleDetails
          schedule={this.state.schedule}
          decryptKeys={this.state.decryptKeys}
          runHandler={this.runSchedule.bind(this)}
          updateHandler={this.updateSchedule.bind(this)}
          />
        <Results 
          results={this.state.results}
          />
      </div>
    )
  }
}

export default ScheduleSingle;