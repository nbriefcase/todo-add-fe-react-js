import React, { Component } from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import moment from 'moment';

export class ListTodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                // { id: 0, description: 'Description', done: false, targetDate: new Date() },
                // { id: 1, description: 'Description 2', done: false, targetDate: new Date() },
                // { id: 2, description: 'Description 3', done: false, targetDate: new Date() }
            ],
            message: null
        };
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.createTodo = this.createTodo.bind(this)
    }

    componentWillUnmount() {
        console.log("component ListTodo was unmounted")
    }


    shouldComponentUpdate() {
        console.log("updating component")
        return true
    }

    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.deleteTodo(username, id)
            .then(response => {
                this.setState({ message: `Delete of todo ${id} Successful` })
                this.refreshTodos()
            })
        console.log("deleted")
    }

    updateTodoClicked(id) {
        this.props.navigate(`/todos/${id}`)
    }

    createTodo() {
        this.props.navigate(`/todos/-1`)
    }

    render() {
        return (

            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Complete?</th>
                                <th>Target Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className='btn btn-success' onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className='btn btn-warning' onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='row'>
                        <button className='btn btn-success' onClick={() => this.createTodo()} >Add</button>
                    </div>
                </div>
            </div>
        )
    }
}
