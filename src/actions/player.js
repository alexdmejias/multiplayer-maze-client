import * as types from '../types';

export const playerMoved = (newPos) => {
  return {
    type: types.PLAYER_MOVED,
    newPos
  };
};

export const playerScored = () => {
  return {
    type: types.PLAYER_SCORED,
    socketEvent: 'player:scored'
  };
};
