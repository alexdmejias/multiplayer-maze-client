import * as types from '../types';

export const playersUpdate = (players) => {
  return {
    type: types.PLAYERS_UPDATE,
    data: {
      players
    }
  };
};
