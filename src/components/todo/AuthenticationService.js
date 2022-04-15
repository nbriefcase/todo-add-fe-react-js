import axios from 'axios'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get('http://localhost:8080/basicauth',
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:8080/authenticate', { username, password })
    }

    createBasicAuthToken(username, password) {
        return "Basic " + window.btoa(username + ":" + password)
    }

    createJwtToken(token) {
        return "Bearer " + token
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptor(this.createJwtToken(token))
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptor(this.createBasicAuthToken(username, password))
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptor(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                    console.log(config)
                }
                return config
            })
    }
}

export default new AuthenticationService()