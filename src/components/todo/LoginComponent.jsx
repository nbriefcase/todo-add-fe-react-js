import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'username',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handlerChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    loginClicked() {
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then(
                (response) => {
                    {/* https://github.com/remix-run/history/blob/dev/docs/navigation.md  
                https://v5.reactrouter.com/web/api/history 

                this.props.history.push("/welcome")

                    
                // this.setState({ hasLoginFailed: false })
                // this.setState({ showSuccessMessage: true })
            */ }
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                    this.props.navigate(`/welcome/${this.state.username}`)
                }
            ).catch(
                () => {
                    this.setState({ hasLoginFailed: true })
                    this.setState({ showSuccessMessage: false })
                }
            )
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handlerChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handlerChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div >
        )
    }
}

export default LoginComponent
