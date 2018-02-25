import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';

const is_logged = true;

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={props => is_logged ? <App {...props} /> : <Redirect to="/login" /> } />
            <Route path="/login" render={props => !is_logged ? <Login {...props} /> : <Redirect to="/" /> } />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
