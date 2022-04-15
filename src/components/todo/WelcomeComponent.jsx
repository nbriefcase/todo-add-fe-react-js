import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMesssage: ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSucessfulReponse = this.handleSucessfulReponse.bind(this)
    }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    <div>Welcome {this.props.params.name}. You can manage your tasks using <Link to="/todos">Todo List</Link> </div>
                </div>
                <div className="container">
                    <div>Click here to get a customized welcome page
                        <button className="btn btn-success" onClick={() => this.retrieveWelcomeMessageWithName(this.props.params.name)}>Get Welcome Message</button>
                    </div>
                </div>
                <div className="container">
                    {this.state.welcomeMesssage}
                </div>
            </>
        );
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldBeanService()
            .then(response => {
                this.handleSucessfulReponse(response)
            })
            .catch(error => this.handleError(error))
    }

    retrieveWelcomeMessageWithName(name) {
        HelloWorldService.executeHelloWorldBeanServiceWithPath(name)
            .then(response => {
                this.handleSucessfulReponse(response)
            })
            .catch(error => this.handleError(error))
    }

    handleSucessfulReponse(response) {
        this.setState({ welcomeMesssage: response.data.message })
    }

    handleError(error) {
        let errorMessage = ''

        if (error.message) {
            errorMessage += error.message
        } else if (error.response && error.response.data) {
            errorMessage += error.response.data
        }

        this.setState({ welcomeMesssage: errorMessage })
    }
}

export default WelcomeComponent
