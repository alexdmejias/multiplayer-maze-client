import {createStore, combineReducers, compose} from 'redux';
import reducers from './reducers';
// import {routerReducer} from 'react-router-redux';

// middleware
// import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
// import socketMiddleware from './middleware/socket-middleware';

// const middlewares = [thunkMiddleware, socketMiddleware];
// const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

const allReducers = combineReducers({
  ...reducers,
  // routing: routerReducer
});

const store = createStore(allReducers, enhancers);

export default store;


