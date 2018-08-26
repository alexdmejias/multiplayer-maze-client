import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducers from './reducers';
import socketMiddleware from './middleware/socketio-middleware';
import arrowControlsMiddleware from './middleware/arrow-controls';

const logger = createLogger({
  diff: true,
  collapsed: true
});

const middlewares = [
  logger,
  socketMiddleware,
  // arrowControlsMiddleware
];

const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = compose(middlewareEnhancer, window.devToolsExtension ? window.devToolsExtension() : f => f);

const allReducers = combineReducers({
  ...reducers
});

const store = createStore(allReducers, enhancers);

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(allReducers)
    })
  }
}


export default store;
