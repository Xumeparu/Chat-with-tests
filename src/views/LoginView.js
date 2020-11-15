import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import apiServices from '../apiServices';
import styles from './LoginView.module.css';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successMessage: '',
            errorMessage: ''
        };
    }

    handleSubmit(values) {
        this.setState({
            successMessage: null,
            errorMessage: null
        });

        return apiServices.auth
            .login(values)
            .then(() => {
                this.setState({ successMessage: 'User registered successfully' });
                setTimeout(() => this.props.history.push('/profile'), 2000);
            })
            .catch((error) =>
                this.setState({ errorMessage: 'Error! ' + error.response.data.error })
            );
    }

    render() {
        return (
            <>
                <h1>Authentication</h1>
                <div className={styles.successMessage}>{this.state.successMessage}</div>
                <Formik
                    initialValues={{
                        nickname: '',
                        password: ''
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (values.nickname.length === 0) {
                            errors.nickname = 'Enter your nickname, please';
                        }
                        if (values.password.length === 0) {
                            errors.password = 'Enter your password, please';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        this.handleSubmit(values).then(() => setSubmitting(false));
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {errors.nickname && touched.nickname && (
                                <div className={styles.errorMessage}>{errors.nickname}</div>
                            )}
                            <div>
                                <label>
                                    Nickname:&nbsp;
                                    <input
                                        type="text"
                                        name="nickname"
                                        className="nick-pass"
                                        value={values.nickname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </label>
                            </div>
                            {errors.password && touched.password && (
                                <div className={styles.errorMessage}>{errors.password}</div>
                            )}
                            <div>
                                <label>
                                    Password:&nbsp;
                                    <input
                                        type="password"
                                        name="password"
                                        className="nick-pass"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </label>
                            </div>
                            <button type="submit" className="button" disabled={isSubmitting}>
                                Go!
                            </button>
                        </form>
                    )}
                </Formik>
            </>
        );
    }
}

LoginView.propTypes = {
    history: PropTypes.object
};
