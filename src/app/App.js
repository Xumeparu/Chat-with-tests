import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import LoginView from '../views/LoginView/LoginView';
import RegistrationView from '../views/RegistrationView/RegistrationView';
import ChatView from '../views/ChatView/ChatView';
import ProfileView from '../views/ProfileView/ProfileView';
import apiServices from '../apiServices';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import SearchChatsView from '../views/SearchChatsView';
import UsersSearchView from '../views/UsersSearchView';
import ViewHeader from '../views/ViewHeader/ViewHeader';

class PrivateRoute extends React.Component {
    render() {
        const { user, children, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(routeProps) =>
                    user ? (
                        React.cloneElement(children, { ...routeProps, user })
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
            initDone: false
        };
        this.updateAuthState = this.updateAuthState.bind(this);
    }

    componentDidMount() {
        this.updateAuthState();
    }

    updateAuthState() {
        return apiServices.user
            .getCurrent()
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
                        <div>
                            <div className={styles.links}>
                                <Link to="/profile">Profile {user.nickname}</Link>
                                <Link to="/searchChats">Search chat</Link>
                                <Link to="/userSearch">User search</Link>
                            </div>
                            <button
                                className={styles.logoutButton}
                                onClick={() => this.logoutHandler()}
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.links}>
                            <Link to="/login">Authentication</Link>&nbsp;
                            <Link to="/registration">Registration</Link>&nbsp;
                        </div>
                    </>
                )}
                <Switch>
                    <Route
                        path="/login"
                        render={(routeProps) => (
                            <ViewHeader title="Authentication">
                                <LoginView
                                    updateAuthHandler={this.updateAuthState}
                                    {...routeProps}
                                />
                            </ViewHeader>
                        )}
                    />
                    <Route
                        path="/registration"
                        render={(routeProps) => (
                            <ViewHeader title="Registration">
                                <RegistrationView {...routeProps} />
                            </ViewHeader>
                        )}
                    />
                    <PrivateRoute path="/chat/:id" user={user} component={ChatView} />
                    <PrivateRoute path="/profile" user={user}>
                        <ViewHeader title="Profile">
                            <ProfileView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/searchChats" user={user}>
                        <ViewHeader title="Search chats">
                            <SearchChatsView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/userSearch" user={user}>
                        <ViewHeader title="Users search">
                            <UsersSearchView />
                        </ViewHeader>
                    </PrivateRoute>
                    <Redirect exact from="/" to="/profile" />
                </Switch>
            </>
        );
    }
}

PrivateRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.any
};

export default App;
