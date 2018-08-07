import * as types from '../types';

const initialState = { };

export default function players (state = initialState, action) {
  switch (action.type) {
    case types.PLAYER_UPDATE:
      return {
        ...state,
        [action.player.id]: action.player
      };
    default:
      return state;
  }
}
