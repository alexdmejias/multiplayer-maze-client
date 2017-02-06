import * as types from '../types';

const initState = {
  winningId: '0-9',
  // sampleMaze: '3333333331|5555556662|6655556562|6566566562|5556666652|6565656562|6666666662|5565655562|5655656562|5555566552|'
  maze: '',
  mazeComplete: false
};

export default function session (state = initState, action) {
  switch (action.type) {
    case types.SESSION_STARTED:
      break;
    case types.SESSION_MAZE_ARRIVAL:
      let maze = state.maze;
      let mazeComplete = false;

      if (action.secret) {
        maze += action.maze;
        mazeComplete = true;
      } else {
        maze = action.maze;
      }

      return {
        ...state,
        mazeComplete,
        maze
      };
    default:
      return state;
  }
}
