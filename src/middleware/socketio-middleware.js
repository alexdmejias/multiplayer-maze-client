import io from 'socket.io-client';
import config from '../config.json';
import * as sessionsActions from '../actions/session';
import {SESSION_HEART_BEAT_STATE_CHANGE} from '../types';

const socketMiddleware = (store) => {
  let socket;
  let heartbeat = true;

  function _socketConnect () {
    if (config.socket.connect) {
      console.log('attempting to connect to socket server...');
      socket = io.connect('http://localhost:3005');
      socket.on = _overWriteTX();
      _registerCallbacks();
    } else {
      console.log('running in offline mode, will not attempt to connect to server');
    }
  }

  function _registerCallbacks () {
    for (let event in eventsToListenTo) {
      if (eventsToListenTo.hasOwnProperty(event)) {
        socket.on(event, eventsToListenTo[event]);
      }
    }
  }

  function _overWriteTX () {
    const oldOn = socket.on;
    return function (name, callback) {
      const _callback = (args) => {
        console.log('%cRX: ' + name, 'color: green; font-weight: bold', args || '');
        if (!heartbeat) {
          console.log('ignoring event since heartbeat is off');
        } else if (callback) {
          callback(args);
        }
      };
      return oldOn.call(this, name, _callback);
    };
  }

  const eventsToListenTo = {
    'socket-initConnection': (data) => {
      // only received when current client joins
      store.dispatch(sessionsActions.initConnection(data));
    },
    'connect': () => {
    },
    'disconnect': () => {
      store.dispatch(sessionsActions.connectionStatus('disconnected'));
    },
    'connection': () => {
    },
    'maze-arrival': (data) => {
      store.dispatch(sessionsActions.mazeArrival(data));
    },
    'fsm-waiting': () => {
      store.dispatch(sessionsActions.stateChange('waiting'));
    },
    'fsm-playing': () => {
      store.dispatch(sessionsActions.stateChange('playing'));
    },
    'player-update': (player) => {
      store.dispatch({type: 'PLAYER_UPDATE', player});
    },
    'debug': (message) => {
      console.log('alexalex - ---------- socket debug message', message);
    }
  };

  return (next) => (action) => {
    const result = next(action);

    if (action.type === 'SOCKET_CONNECT') {
      _socketConnect();
    } else if (action.type === SESSION_HEART_BEAT_STATE_CHANGE) {
      heartbeat = action.newState;
    } else if (action.socketEvent && socket && socket.emit && heartbeat) {
      const payload = action.socketPayload || {};
      console.log('%cTX: ' + action.socketEvent, 'color: red; font-weight: bold', payload);
      socket.emit(action.socketEvent, payload);
    }

    return result;
  };
};

export default socketMiddleware;
