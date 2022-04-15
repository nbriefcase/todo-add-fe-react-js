import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import withNavigation from './WithNavigation'
import withParams from './WithParams'
import ErrorComponent from './ErrorComponent'
import { FooterComponent } from './FooterComponent';
import { HeaderComponent } from './HeaderComponent';
import WelcomeComponent from './WelcomeComponent';
import { ListTodoComponent } from './ListTodoComponent';
import { LogoutComponent } from './LogoutComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import TodoComponent from './TodoComponent';

class TodoApp extends Component {
    render() {

        const LoginComponentWithNavigation = withNavigation(LoginComponent)
        const WelcomeComponentWithParam = withParams(WelcomeComponent)
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodoComponentWithNavWithPar = withParams(withNavigation(ListTodoComponent));
        const TodoComponentWithNavWithPar = withParams(withNavigation(TodoComponent))

        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute>
                                <WelcomeComponentWithParam />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <ListTodoComponentWithNavWithPar />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/logout" element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos/:id" element={
                            <AuthenticatedRoute>
                                <TodoComponentWithNavWithPar />
                            </AuthenticatedRoute>
                        } />
                        <Route path="*" element={<ErrorComponent />
                        } />
                    </Routes>
                    <FooterComponent />
                </Router>
            </div>
        )
    };
}

export default TodoApp;
