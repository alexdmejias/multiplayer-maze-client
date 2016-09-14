export default function usersReducer(state = [], action) {
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

  if (action.type === 'DATA_ARRIVED') {
    console.log(state);
    return state.concat(action.payload);
  }

  return state;
}