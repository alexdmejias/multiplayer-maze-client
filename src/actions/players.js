import * as types from '../types';

export const playerUpdate = (player) => {
  return {
    type: types.PLAYER_UPDATE,
    player
  };
};
