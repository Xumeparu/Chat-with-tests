import React from 'react';
import PropTypes from 'prop-types';
import apiServices from '../apiServices';
import styles from './LoginView.module.css';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            successMessage: '',
            errorMessage: ''
        };
    }

    handleSubmit(e) {
        this.setState({
            successMessage: null,
            errorMessage: null
        });
        apiServices.auth
            .login({
                nickname: this.state.nickname,
                password: this.state.password
            })
            .then(() => {
                this.setState({ successMessage: 'User registered successfully' });
                setTimeout(() => this.redirectAfterLogin(), 2000);
            })
            .catch((error) =>
                this.setState({ errorMessage: 'Error! ' + error.response.data.error })
            );
        e.preventDefault();
    }

    redirectAfterLogin() {
        const redirectUrl = this.props.location?.state.from.pathname
            ? this.props.location.state.from.pathname
            : '/profile';
        this.props.updateAuthState().then(() => this.props.history.push(redirectUrl));
    }

    render() {
        const { successMessage, errorMessage, nickname, password } = this.state;
        return (
            <div className="login-view">
                <h1>Authentication</h1>
                <div className={styles.mainError}>{errorMessage}</div>
                {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label>
                            Nickname:&nbsp;
                            <input
                                type="text"
                                name="nickname"
                                className="nick-pass"
                                value={nickname}
                                onChange={(e) => this.setState({ nickname: e.target.value })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:&nbsp;
                            <input
                                type="password"
                                name="password"
                                className="nick-pass"
                                value={password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </label>
                    </div>
                    <button type="submit" className="button">
                        Go!
                    </button>
                </form>
            </div>
        );
    }
}

LoginView.propTypes = {
    history: PropTypes.object,
    updateAuthState: PropTypes.func,
    location: PropTypes.any
};
