import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import { store } from './store';
import App from './app.js';
import '../css/main.css';

render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('app')
);
