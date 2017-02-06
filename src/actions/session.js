import * as types from '../types';

export const mazeArrival = (data, secret) => {
  return {
    type: types.SESSION_MAZE_ARRIVAL,
    maze: data.maze,
    secret
  };
};
