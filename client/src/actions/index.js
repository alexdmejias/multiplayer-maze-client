export const addUser = function(user) {
  return {
    type: 'ADD_USER',
    user
  }
}

export const deleteUser = function(user) {
  return {
    type: 'DELETE_USER',
    user
  }
}

