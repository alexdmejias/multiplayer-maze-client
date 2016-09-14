import axios from 'axios';

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

export const showDetails = function(userId) {
  return {
    type: 'SHOW_DETAILS',
    user: userId
  }
}

export const hideDetails = function() {
  return {
    type: 'HIDE_DETAILS'
  }
}

export const getData = function() {
  const request = axios.get('https://jsonplaceholder.typicode.com/users');

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({type: 'DATA_ARRIVED', payload: data.map((d) => { return d.id})});
    })
  }
}