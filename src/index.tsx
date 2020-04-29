import React from 'react';
import ReactDOM from 'react-dom';
import Provider from "react-redux/es/components/Provider";
import store from './redux/store';
import App from './containers/app/App';
import * as serviceWorker from './serviceWorker';
import './styles/_styles.scss';
import {configureSocket} from './api/server';

export const socket = configureSocket(store.dispatch);

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
