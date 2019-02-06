import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ThemeProvider } from 'styled-components';

import store, { history } from './store/store';
import theme from './utilities/themes/themes';

import App from './App';


ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  ),
  document.getElementById('root'),
);

module.hot.accept();
