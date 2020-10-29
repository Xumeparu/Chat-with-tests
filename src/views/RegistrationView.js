import React from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

export default class RegistrationView extends React.Component {
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
            .post('/user', {nickname, password})
            .then(() => this.setState({successMessage: "Success!"}))
            .catch(error => this.setState({ errorMessage: "Error!" + error.response.data.error}));
    }

    render() {
        const { nickname, password, successMessage, errorMessage } = this.state;
        return (
            <>
                <h1>Registration</h1>
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
                    <button type="submit">Create user</button>
                </form>
            </>
        );
    }
}
