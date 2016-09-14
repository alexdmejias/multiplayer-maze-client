export default function userDetailsReducer(state = '', action) {
  if (action.type === 'SHOW_DETAILS') {
    state = action.user;
  }

  if (action.type === 'HIDE_DETAILS') {
    state = '';
  }
  
  return state;
}