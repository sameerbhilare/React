import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';

/*
    If the vast majority of your components (entire app) need access to the store,
    you should typically provide on this highest level.
    It will make sure that this component and its child components and their child components and so on 
    will get access to the store
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
