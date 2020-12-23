import React from 'react';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function MessagesList({ messages }) {
    return (
        <div className={styles.messagesList}>
            <ul className="message-list">
                {messages.map((message) => (
                    <Message
                        content={message.content}
                        nickname={message.nickname}
                        key={message.id}
                    />
                ))}
            </ul>
        </div>
    );
}

MessagesList.propTypes = {
    messages: PropTypes.array
};
