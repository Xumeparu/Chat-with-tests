import React from 'react';
import PropTypes from 'prop-types';
import apiServices from '../apiServices';
import styles from './RegistrationView.module.css';

export default class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            successMessage: '',
            errorMessage: ''
        };
    }

    validate() {
        const { nickname, password } = this.state;
        if (nickname.length === 0) {
            this.setState({
                errorMessage: 'Enter your nickname, please'
            });
            return false;
        }
        if (password.length === 0) {
            this.setState({
                errorMessage: 'Enter your password, please'
            });
            return false;
        }
        return true;
    }

    handleSubmit(e) {
        const { nickname, password } = this.state;
        e.preventDefault();
        this.setState({
            successMessage: null,
            errorMessage: null
        });

        if (!this.validate()) return;

        apiServices.user
            .create({ nickname, password })
            .then(() => this.setState({ successMessage: 'Success! ' }))
            .then(() => setTimeout(() => this.props.history.push('/login'), 2000))
            .catch((error) =>
                this.setState({ errorMessage: 'Error! ' + error.response.data.error })
            );
    }

    render() {
        const { nickname, password, successMessage, errorMessage } = this.state;
        return (
            <>
                <h1>Registration</h1>
                <div className={styles.errorMessage}>
                    {successMessage}
                    {errorMessage}
                </div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label>
                            Nickname:&nbsp;
                            <input
                                type="text"
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
                                className="nick-pass"
                                value={password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </label>
                    </div>
                    <button type="submit" className="button">
                        Create user
                    </button>
                </form>
            </>
        );
    }
}

RegistrationView.propTypes = {
    history: PropTypes.object
};
