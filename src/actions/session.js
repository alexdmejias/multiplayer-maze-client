import * as types from '../types';

export const mazeArrival = (data) => {
  return {
    type: types.SESSION_MAZE_ARRIVAL,
    maze: data.maze
  };
};

/**
 * sets the connection status of the client
 * @param {String} status
 */
export const connectionStatus = (status) => {
  return {
    type: types.SESSION_CONNECTION_STATUS,
    status
  };
};

export const stateChange = (gameState, devMode) => {
  return {
    type: types.SESSION_STATE_CHANGE,
    devMode,
    gameState
  };
};

export const setHeartBeat = (newState) => {
  return {
    type: types.SESSION_HEART_BEAT_STATE_CHANGE,
    newState
  };
};

export const initConnection = (data) => {
  return {
    type: types.SESSION_INIT_CONNECTION,
    data
  };
};