import * as actions from './message-actions';
import io from 'socket.io-client';  

export default function(store) {
  const socket = io('http://localhost:8001');

  socket.on('connect', () => {
    store.dispatch({name: 'test'});
  });
  
  socket.on('disconnect', () => {
    // store.dispatch(actions.disconnect());
    console.log('disconnect');
  });

  socket.on('game_disconnection', () => {
    console.log('game_disconnection');
  });
}