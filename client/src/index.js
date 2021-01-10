import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setAuthorization from './config/setAuthorization';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

setAuthorization(localStorage.userToken);
const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
