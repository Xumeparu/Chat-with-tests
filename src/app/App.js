import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import LoginView from '../views/LoginView';
import RegistrationView from '../views/RegistrationView';
import ChatView from '../views/ChatView';
import ProfileView from '../views/ProfileView';
import apiServices from '../apiServices';
import PropTypes from 'prop-types';
import styles from "./style.module.css";

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
            initDone: true
        };
        this.updateAuthState = this.updateAuthState.bind(this);
    }

    componentDidMount() {
        this.updateAuthState();
    }

    updateAuthState() {
        return apiServices.user
            .getProfile()
            .then((response) => response.data)
            .then((user) => this.setState({ user, initDone: true }))
            .catch(() => this.setState({ user: null, initDone: true }));
    }

    logoutHandler() {
        apiServices.auth.logout().then(() => {
            this.setState({ user: null });
        });
    }

    render() {
        const { user, initDone } = this.state;

        if (!initDone) {
            return <>Loading...</>;
        }

        return (
            <>
                {user ? (
                    <>
                        <div className={styles.links}>
                            <Link to="/profile">Profile {user.nickname}</Link>&nbsp;
                        </div>
                        <div>
                            <button onClick={() => this.logoutHandler()}>Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.links}>
                            <Link to="/auth">Authentication</Link>&nbsp;
                            <Link to="/registration">Registration</Link>&nbsp;
                        </div>
                    </>
                )}
                <Switch>
                    <Route
                        path="/login"
                        render={(routeProps) => (
                            <LoginView updateAuthState={this.updateAuthState} {...routeProps} />
                        )}
                    />
                    <Route path="/registration" component={RegistrationView} />
                    <PrivateRoute path="/chat/:id" user={user} component={ChatView} />
                    <PrivateRoute
                        path="/profile"
                        user={user}
                        component={ProfileView}
                        componentProps={{ user }}
                    />
                    <Redirect exact from="/" to="/profile" />
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
