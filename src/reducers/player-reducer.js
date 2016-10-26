import * as types from '../types';

const initialState = {
  visitedCells: [[0, 0]],
  lastVisitedCells: [0, 0]
};

export default function player (state = initialState, action) {
  switch (action.type) {
    
    case types.PLAYER_MOVED:
      return {
        ...state,
        visitedCells: state.visitedCells.concat([action.newPos]),
        lastVisitedCells: action.newPos
      }
    
    default:
      return state;
  }
}


