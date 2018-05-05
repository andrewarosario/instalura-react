import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.location.state ? 'Você deve fazer login primeiro!' : '',
            has_token: false
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        fetch('https://instalura-api.herokuapp.com/api/public/login', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({
                login: this.login.value,
                senha: this.password.value
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('As informações estão incorretas!');
            }

            return response.text();
        }).then(token => {
            localStorage.setItem('token', token);

            this.setState({
                has_token: true
            });
        }).catch(error => this.setState({
            'message': error.message
        }));
    }

    render() {
        let from = this.props.location.state;

        if (this.state.has_token) {
            return <Redirect to={from ? from : '/'} />
        }

        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.message}</span>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={input => this.login = input} />
                    <input type="password" ref={input => this.password = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}

export default Login;
