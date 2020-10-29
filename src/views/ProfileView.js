import React from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            errorMessage: ""
        };
    }

    componentDidMount() {
        axiosInstance
            .get('/user')
            .then(response => response.data)
            .then(user => this.setState({ user }))
            .catch(error => this.setState({ errorMessage: "Error! " + error.response.data.error}));
    }

    render() {
        const { user, errorMessage } = this.state;
        return (
            <>
                <h1>Profile</h1>
                {user && (
                    <>
                        <div>
                            ID: { user.id }
                            Nickname: {user.nickname}
                            Created: {new Date(user.createdAt).toLocaleString()}
                        </div>
                    </>
                )}
                { errorMessage }
            </>
        );
    }
}
