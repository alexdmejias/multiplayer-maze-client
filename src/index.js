import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import './index.css';

import AppContainer from './containers/app';

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,

  document.getElementById('root')
);
