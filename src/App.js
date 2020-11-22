import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';
import ProfileView from './views/ProfileView';
import apiServices from './apiServices';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {
    render() {
        const { user, component: Component, componentProps, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(routeProps) =>
                    user ? (
                        <Component {...componentProps} {...routeProps} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: true
        };
        this.authStateHandler = this.authStateHandler.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        return apiServices.user
            .getProfile()
            .then((response) => response.data)
            .then((user) => this.setState({ user, isLoading: false }))
            .catch(() => this.setState({ user: null, isLoading: false }));
    }

    authStateHandler() {
        return this.getCurrentUser();
    }

    logoutHandler() {
        apiServices.auth.logout().then(() => this.setState({ user: null }));
    }

    render() {
        const { user, isLoading } = this.state;

        if (isLoading) {
            return <>Loading...</>;
        }

        return (
            <>
                {user ? (
                    <>
                        <div className="links">
                            <Link to="/profile">Profile {user.nickname}</Link>&nbsp;
                        </div>
                        <div>
                            <button onClick={() => this.logoutHandler()}>Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="links">
                            <Link to="/auth">Authentication</Link>&nbsp;
                            <Link to="/registration">Registration</Link>&nbsp;
                        </div>
                    </>
                )}
                <Switch>
                    <Route
                        path="/auth"
                        render={(routeProps) => (
                            <LoginView authStateHandler={this.authStateHandler} {...routeProps} />
                        )}
                    />
                    <Route path="/registration" component={RegistrationView} />
                    <PrivateRoute user={user} path="/profile" component={ProfileView} />
                    <PrivateRoute
                        user={user}
                        path="/chat/:id"
                        component={ChatView}
                        componentProps={{ user }}
                    />
                    <Redirect from="/" to="/profile" />
                </Switch>
            </>
        );
    }
}

PrivateRoute.propTypes = {
    user: PropTypes.object,
    component: PropTypes.any,
    componentProps: PropTypes.any
};

export default App;
