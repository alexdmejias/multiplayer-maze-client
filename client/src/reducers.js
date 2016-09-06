import {createStore, combineReducers} from 'redux';

function usersReducer(state = [], action) {
  if (action.type === 'ADD_USER') {
    return state.concat([action.user]);
  }

  if (action.type === 'DELETE_USER') {
    let newState = state.filter((curr) => { return curr === action.user});
    return newState
  }

  if (action.type === 'SET_CURR_USERS') {
    state = JSON.parse(action.users);
  }

  return state;
}

const reducers = combineReducers({
  usersState: usersReducer
});

const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

export default store;