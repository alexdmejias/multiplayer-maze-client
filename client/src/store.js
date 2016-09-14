import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers/index.js';
// connectionStatus
//   connected
//   name
//   id
//   lastPage
//   unitFilter
//   sectionFilter
//   rooms

// currentSlideShow
//   subsections
//   currentIndex
//   currentslideShow  

// units
//   units

const allReducers = combineReducers({
  usersState: reducers.usersReducer,
  userDetails: reducers.userDetailsReducer,
  routing: routerReducer
});

const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = compose(middlewareEnhancer, window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(allReducers, enhancers);

export default store;