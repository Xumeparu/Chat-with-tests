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
                render={routeProps =>
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
            user: null
        };
    }

    componentDidMount() {
        apiServices.user
            .getProfile()
            .then((response) => response.data)
            .then((user) => this.setState({ user }));
    }

    render() {
        const { user } = this.state;

        return (
            <>
                <div className="links">
                    <Link to="/auth">Authentication</Link>&nbsp;
                    <Link to="/registration">Registration</Link>&nbsp;
                    <Link to="/profile">Profile</Link>&nbsp;
                </div>
                <Switch>
                    <Route path="/auth" component={LoginView} />
                    <Route path="/registration" component={RegistrationView} />
                    <PrivateRoute user={user} path="/profile" component={ProfileView} />
                    <PrivateRoute user={user} path="/chat/:id" component={ChatView} />
                    <Redirect exact from="/" to="/profile" />
                </Switch>
            </>
        );
    }
}

PrivateRoute.propTypes = {
    user: PropTypes.string,
    component: PropTypes.any,
    componentProps: PropTypes.any
}

export default App;
