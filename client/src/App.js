import React, { Component } from 'react';
import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

import Indicator from './components/Indicator';

const socket = io('http://localhost:8001');

class App extends Component {

  
  constructor() {
    super();

    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('game_disconnection', this.onDisconnection);

    this.state = {
      connectionStatus: 'disconnected'
    }
  }
  
  onConnect() {
    console.log('connected');
    console.log(this.state, '........');
    
    this.setState({
      connectionStatus: 'connected'
    });
  }

  onDisconnect() {
    console.log('disconnected');
    this.setState({
      connectionStatus: 'disconnected'
    });
  }

  onDisconnection(payload) {
    console.log('someone disconnected, this is the current list of connections', JSON.parse(payload));
    
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Indicator connectionStatus={this.state.connectionStatus}/>
      </div>
    );
  }
}

export default App;
