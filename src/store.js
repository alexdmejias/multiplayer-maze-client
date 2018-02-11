import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import reducers from './reducers';
import socketMiddleware from './middleware/socketio-middleware';

const middlewares = [socketMiddleware];
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
