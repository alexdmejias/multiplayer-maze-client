import * as types from '../types';

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

export const stateChange = (data) => {
  return {
    type: types.SESSION_STATE_CHANGE,
    data
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

export const changeUsername = (newUsername) => {
  return {
    type: types.SESSION_CHANGE_USERNAME,
    username: newUsername
  };
};
