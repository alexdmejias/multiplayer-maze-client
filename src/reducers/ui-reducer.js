import * as types from '../types';

const initialState = {
  showOverlay: true
};

export default function ui (state = initialState, action) {
  switch (action.type) {
    case types.UI_SET_OVERLAY:
      return {
        ...state,
        showOverlay: action.showOverlay
      };
    default:
      return state;
  }
}
