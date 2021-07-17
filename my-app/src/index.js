import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import './index.css';
import './App.css';
// import App from './BucketList/App'
import App from './project/App'
// import store from './BucketList/redux/configStore'
import store from './project/redux/configStore'
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </Provider>,
  document.getElementById('root')
);