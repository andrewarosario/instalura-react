import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import registerServiceWorker from './registerServiceWorker';

let is_logged = () => {
    return localStorage.getItem('token') ? true : false;
}

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={props => is_logged() ? <App {...props} /> : <Redirect to={{
                pathname: '/login',
                state: {
                    from: props.location
                }
            }} />} />
            <Route path="/login" render={props => !is_logged() ? <Login {...props} /> : <Redirect to="/" /> } />
            <Route path="/logout" component={Logout} />
            <Route path="/usuario/:login" component={App}  />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
