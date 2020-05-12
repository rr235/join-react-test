import React from 'react';
import { render } from 'react-dom';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const rootElement = document.querySelector('#root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
