import io from 'socket.io-client';
import config from '../config.json';

const socketMiddleware = (socket) => {
  function _socketConnect () {
    console.log('socketio connection established');

    if (config.socket.connect) {
      socket = io.connect('http://localhost:3005');
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

  const eventsToListenTo = {
    'connection': () => { console.log('another player connected'); }
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
