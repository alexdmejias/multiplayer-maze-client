import * as types from '../types';

const initialState = {
  players: {}
};

export default function players (state = initialState, action) {
  switch (action.type) {
    case types.PLAYERS_UPDATE:
    case types.SESSION_INIT_CONNECTION:
      return {
        ...state,
        players: action.data.players
      };
    default:
      return state;
  }
}
