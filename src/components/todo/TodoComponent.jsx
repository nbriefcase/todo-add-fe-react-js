import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticatorService from './AuthenticationService.js'

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        let username = AuthenticatorService.getLoggedInUser()
        TodoDataService.getTodo(username, this.state.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            })
    }

    onSubmit(values) {
        let username = AuthenticatorService.getLoggedInUser()
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo).then(() => this.props.navigate('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo).then(() => this.props.navigate('/todos'))
        }
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors = { description: 'Enter a description' }
        } else if (values.description.length < 5) {
            errors = { description: 'Should have at least 5 Characters' }
        }

        if (!moment(values.targetDate).isValid()) {
            errors = { description: 'Invalid Target Date' }
        }
        return errors
    }

    render() {
        let { description, targetDate } = this.state;
        return (
            <div>
                <h1>Todo..</h1>
                <div className='container'>
                    <Formik initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className='form-group'>
                                        <label>Description</label>
                                        <Field className='form-control' type="text" name="description" />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Target Date</label>
                                        <Field className='form-control' type="date" name="targetDate" />
                                    </fieldset>
                                    <button type='submit' className='btn btn-success'>Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                    Todo Component for id - {this.props.params.id}
                </div>
            </div>
        )
    }
}

export default TodoComponent