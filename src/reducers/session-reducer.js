import * as types from '../types';

const initState = {
  winningId: '0-9',
  // sampleMaze: '3333333331|5555556662|6655556562|6566566562|5556666652|6565656562|6666666662|5565655562|5655656562|5555566552|'
  maze: '',
  mazeComplete: false,
  status: 'disconnected',
  heartbeat: true
};

export default function session (state = initState, action) {
  switch (action.type) {
    case types.SESSION_STARTED:
      break;
    case types.SESSION_MAZE_ARRIVAL:
      let maze = state.maze;
      let mazeComplete = true;

      maze = action.maze;
      return {
        ...state,
        mazeComplete,
        maze
      };

    case types.SESSION_CONNECTION_STATUS:
      return {
        ...state,
        status: action.status
      };

    case types.SESSION_STATE_CHANGE:
      return {
        ...state,
        gameState: action.gameState
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
