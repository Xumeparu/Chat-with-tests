import React, { useState } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import apiServices from '../../apiServices';
import styles from './styles.module.css';

export default function LoginView({ location, updateAuthHandler, history }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(values) {
        setSuccessMessage(null);
        setErrorMessage(null);

        apiServices.auth
            .login({
                nickname: values.nickname,
                password: values.password
            })
            .then(() => {
                setSuccessMessage('Welcome');
                setTimeout(() => redirectAfterLogin(), 2000);
            })
            .catch((error) => setErrorMessage('Error! ' + error.response.data.error));
    }

    function redirectAfterLogin() {
        const redirectUrl = location.state ? location.state.from.pathname : '/profile';
        updateAuthHandler().then(() => history.push(redirectUrl));
    }

    return (
        <div className="login-view">
            {successMessage && (
                <div className="success-message">
                    <div className={styles.successMessage}>{successMessage}</div>
                </div>
            )}
            <div className={styles.errorMessage}>{errorMessage}</div>
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
                    if (values.password.length < 7) {
                        errors.password = 'The password must be at least 7 characters long';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values).then(() => setSubmitting(false));
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
                            <div className={styles.validationError}>{errors.nickname}</div>
                        )}
                        <div>
                            <label>
                                Nickname:&nbsp;
                                <input
                                    type="text"
                                    name="nickname"
                                    className={styles.inputNickAndPass}
                                    value={values.nickname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </label>
                        </div>
                        {errors.password && touched.password && (
                            <div className={styles.validationError}>{errors.password}</div>
                        )}
                        <div>
                            <label>
                                Password:&nbsp;
                                <input
                                    type="password"
                                    name="password"
                                    className={styles.inputNickAndPass}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </label>
                        </div>
                        <button type="submit" className={styles.button} disabled={isSubmitting}>
                            Go!
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

LoginView.propTypes = {
    history: PropTypes.object,
    updateAuthState: PropTypes.func,
    updateAuthHandler: PropTypes.func,
    location: PropTypes.any
};
