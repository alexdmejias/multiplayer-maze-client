import * as types from '../types';

const initState = {
  winningId: '0-9', // todo this should come from the server and change on a per game basis
  maze: '',
  status: 'disconnected',
  heartbeat: true
};

export default function session (state = initState, action) {
  switch (action.type) {
    case types.SESSION_STARTED:
      break;
    case types.SESSION_INIT_CONNECTION:
      return {
        ...state,
        maze: action.data.maze,
        gameState: action.data.currentState,
        username: action.data.username,
        id: action.data.id,
        status: 'connected'
      };

    case types.SESSION_CONNECTION_STATUS:
      return {
        ...state,
        status: action.status
      };

    case types.SESSION_STATE_CHANGE:
      return {
        ...state,
        ...action.data
      };

    case types.SESSION_HEART_BEAT_STATE_CHANGE:
      return {
        ...state,
        heartbeat: action.newState
      };

    default:
      return state;
  }
}
