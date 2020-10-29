import React from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
    }

    componentDidMount() {
        axiosInstance
            .get('/user')
            .then(response => response.data)
            .then(user => this.setState({ user }));
    }

    render() {
        return (
            <>
                <h1>Profile</h1>
                {this.state.user && (
                    <>
                        Nickname: {this.state.user.nickname}
                        Created: {new Date(this.state.user.createdAt).toLocaleString()}
                    </>
                )}
            </>
        );
    }
}
