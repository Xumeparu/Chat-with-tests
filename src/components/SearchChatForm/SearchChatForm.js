import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function SearchChatForm(props) {
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function validate() {
        setErrorMessage('');
        if (title.length === 0) {
            setErrorMessage('Enter the title of the chat, please');
            return false;
        }
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validate()) {
            props.handleSubmit({ title: title });
            setTitle('');
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <div className={styles.searchChat}>
                    <label>
                        Chat title:&nbsp;
                        <input
                            value={title}
                            className={styles.inputChatTitle}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </label>
                    <button type="submit" className={styles.button}>
                        Search
                    </button>
                </div>
            </form>
        </>
    );
}

SearchChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};
