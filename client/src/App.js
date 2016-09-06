import React, { Component } from 'react';
import logo from './logo.svg';
import io from 'socket.io-client';
import {connect} from 'redux';
import store from './reducers'; 
import * as actions from './actions';

import './App.css';

import Indicator from './components/Indicator';
import UserListContainer from './containers/UserListContainer';

const socket = io('http://localhost:8001');

class App extends Component {

  constructor() {
    super();

    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('game_new-connection', this.onNewConnection);
    socket.on('game_delete-connection', this.onDeleteConnection);
    socket.on('game_current-connections', this.onCurrentConnections);

    this.state = {
      connectionStatus: 'disconnected'
    }
  }

  onConnect() {
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

  onNewConnection(payload) {
    store.dispatch(actions.addUser(payload));
  }

  onDeleteConnection(payload) {
    store.dispatch(actions.deleteUser(payload));
  }

  onCurrentConnections(payload) {
    store.dispatch({
      type: 'SET_CURR_USERS',
      users: payload
    });
  }
  
  render() {
    return (
      <div className="App">
        <Indicator connectionStatus={this.state.connectionStatus}/>
        <UserListContainer />
      </div>
    );
  }
}

export default App;
