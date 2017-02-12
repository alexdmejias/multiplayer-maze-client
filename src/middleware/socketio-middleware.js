import io from 'socket.io-client';
import config from '../config.json';
import * as sessionsActions from '../actions/session';

const socketMiddleware = (store) => {
  let socket;

  function _socketConnect () {
    console.log('socketio connection established');

    if (config.socket.connect) {
      socket = io.connect('http://localhost:3005');
      socket.on = _overWriteTX();
      _registerCallbacks();
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
        if (callback) {
          callback(args);
        }
      };
      return oldOn.call(this, name, _callback);
    };
  }

  const eventsToListenTo = {
    'connection': () => { console.log('another player connected'); },
    'mazeArrival': (data) => {
      if (data.secret) {
        store.dispatch(sessionsActions.mazeArrival(data, true));
      } else {
        store.dispatch(sessionsActions.mazeArrival(data));
      }
    }
  };

  return (next) => (action) => {
    const result = next(action);

    if (action.type === 'SOCKET_CONNECT') {
      _socketConnect();
    } else if (action.socketEvent && socket && socket.emit) {
      const payload = action.socketPayload || {};
      console.log('%cTX: ' + action.socketEvent, 'color: red; font-weight: bold', payload);
      socket.emit(action.socketEvent, payload);
    }

    return result;
  };
};

export default socketMiddleware;
