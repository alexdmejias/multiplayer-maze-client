import * as types from '../types';

export const mazeArrival = (data, secret) => {
  return {
    type: types.SESSION_MAZE_ARRIVAL,
    maze: data.maze,
    secret
  };
};

export const connectionStatus = (status) => {
  return {
    type: types.SESSION_CONNECTION_STATUS,
    status
  };
};
