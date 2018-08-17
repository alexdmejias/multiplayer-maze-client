import * as types from '../types';

export const setOverlay = (newState) => {
  return {
    type: types.UI_SET_OVERLAY,
    showOverlay: newState
  };
};
