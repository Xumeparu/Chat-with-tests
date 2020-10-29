import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://some-domain.com/api/'
});
instance.get(URL)

export default class RegistrationView extends React.Component {
    render() {
        return (
            <>
                <h1>Registration</h1>
            </>
        );
    }
}
