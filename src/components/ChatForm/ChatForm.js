import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function ChatForm(props) {
    const [title, setTitle] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
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
            props.handleSubmit({
                title: title,
                isPrivate: isPrivate
            });
            setTitle('');
            setIsPrivate(false);
        }
    }

    return (
        <>
            <h3>Create and edit chat</h3>
            <form className="chat-form" onSubmit={(e) => handleSubmit(e)}>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <div className={styles.createAndEditChat}>
                    <label>
                        Chat title:&nbsp;
                        <input
                            type="text"
                            value={title}
                            name="chat-title"
                            className={styles.inputChatTitle}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </label>
                    <button type="submit" className={styles.button}>
                        Save
                    </button>
                    <label>
                        Is private:&nbsp;
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            name="is-private"
                            className={styles.inputIsPrivate}
                            onChange={(event) => setIsPrivate(event.target.checked)}
                        />
                    </label>
                </div>
            </form>
        </>
    );
}

ChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};
