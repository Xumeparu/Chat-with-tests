import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            password: "",
            successMessage: "",
            errorMessage: ""
        };
    }

    handleSubmit(e) {
        const { nickname, password } = this.state;
        e.preventDefault();
        this.setState({
            successMessage: "",
            errorMessage: ""
        });
        axiosInstance
            .post('/auth', {nickname, password})
            .then(() => this.setState({successMessage: "User registered successfully!"}))
            .then(() => setTimeout(() => this.props.history.push('/profile'),2000))
            .catch(error => this.setState({ errorMessage: "Error! " + error.response.data.error}));
    }

    render() {
        const { nickname, password, successMessage, errorMessage } = this.state;
        return (
            <>
                <h1>Login</h1>
                <div className="su/er">
                    {successMessage}
                    {errorMessage}
                </div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label>
                            Nickname:&nbsp;
                            <input
                                type="text"
                                value={nickname}
                                onChange={e => this.setState({ nickname: e.target.value})}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:&nbsp;
                            <input
                                type="password"
                                value={password}
                                onChange={e => this.setState({ password: e.target.value})}
                            />
                        </label>
                    </div>
                    <button type="submit">Go!</button>
                </form>
            </>
        );
    }
}

LoginView.propTypes = {
    history: PropTypes.object,
}
