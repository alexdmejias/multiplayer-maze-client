import * as types from '../types';

export const playerMoved = function(newPos) {
  return {
    type: types.PLAYER_MOVED,
    newPos
  }
}

export const playerFinished = () => {
  return {
    type: types.PLAYER_FINISHED
  };
};
