import * as types from '../types';

export const mazeArrival = (data, secret) => {
  return {
    type: types.SESSION_MAZE_ARRIVAL,
    maze: data.maze,
    secret
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

export const stateChange = (state, devMode) => {
  return {
    type: types.SESSION_STATE_CHANGE,
    devMode,
    state
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
  }
}