import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    console.log("Rendering Home")
    return (
      <div className="ui teal segment">
        <h2 className="ui header">Welcome to the Home page. You are logged in!</h2>
      </div>
    );
  }
}


export default App;


