import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import './index.css';

import App from './components/App';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store); 

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
