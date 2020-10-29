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
            password: ""
        };
    }

    handleSubmit(e) {
        axiosInstance.post('/user', {
            nickname: this.state.nickname,
            password: this.state.password
        });
        e.preventDefault();
    }

    render() {
        const { nickname, password } = this.state;
        return (
            <>
                <h1>Registration</h1>
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
                                type="text"
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
