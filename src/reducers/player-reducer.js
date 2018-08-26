import * as types from '../types';

const initialState = {
  visitedCells: [],
  movementAllowed: true,
  wonCurrentRound: false,
  score: 0
};

export default function player (state = initialState, action) {
  switch (action.type) {
    case types.PLAYER_MOVED:
      return {
        ...state,
        visitedCells: state.visitedCells.concat([action.newPos.join('-')])
      };

    case types.SESSION_MAZE_ARRIVAL:
      return {
        ...state,
        visitedCells: [[9, 0]],
        lastVisitedCells: [9, 0],
        wonCurrentRound: false,
        movementAllowed: true
      };
    case types.SESSION_STATE_CHANGE:
      return {
        ...state,
        movementAllowed: action.gameState !== 'waiting'
      };

    case types.PLAYER_SCORED:
      return {
        ...state,
        wonCurrentRound: true,
        movementAllowed: false
      };
    default:
      return state;
  }
}
