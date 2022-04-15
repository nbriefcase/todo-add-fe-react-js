import axios from 'axios'

class TodoDataService {
    retrieveAllTodos(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`)
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        console.log(todo)
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        console.log(todo)
        return axios.post(`http://localhost:8080/users/${name}/todos`, todo)
    }

    getTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    }
}

export default new TodoDataService()
