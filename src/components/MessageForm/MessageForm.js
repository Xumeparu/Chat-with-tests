import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function MessageForm({ sendMessage }) {
    const [content, setContent] = useState('');

    function handleSend(event) {
        event.preventDefault();
        if (content === '') {
            alert('Enter your message, please');
        } else {
            sendMessage({
                content: content
            });

            setContent('');
        }
    }

    return (
        <form className="message-form" onSubmit={(event) => handleSend(event)}>
            <input
                value={content}
                name="content"
                className={styles.content}
                placeholder="Enter your message"
                onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <button type="submit" className={styles.button}>
                Send
            </button>
        </form>
    );
}

MessageForm.propTypes = {
    sendMessage: PropTypes.func
};
