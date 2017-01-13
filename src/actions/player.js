import * as types from '../types';

export const playerMoved = (newPos) => {
  return {
    type: types.PLAYER_MOVED,
    newPos
  };
};

export const playerFinished = () => {
  return {
    type: types.PLAYER_FINISHED
  };
};
