import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Chat({ userId, chat, deleteHandler, joinHandler, goHandler }) {
    function isOwner() {
        return userId === chat.userId;
    }

    function isParticipant() {
        return chat.participants.includes(userId);
    }

    function innerClickHandler(e) {
        e.preventDefault();
        goHandler(chat.id);
    }

    if (isOwner()) {
        return (
            <li>
                <a href="/" onClick={(e) => innerClickHandler(e)}>
                    <span className={styles.chatTitle}>{chat.title}</span>
                </a>
                <button className={styles.button} onClick={() => deleteHandler(chat.id)}>
                    Delete
                </button>
            </li>
        );
    }

    if (isParticipant()) {
        return (
            <li>
                <a href="/" onClick={(e) => innerClickHandler(e)}>
                    <span className={styles.chatTitle}>{chat.title}</span>
                </a>
                {/* TODO: exit button */}
            </li>
        );
    }

    return (
        <li>
            <span className={styles.chatTitle}>{chat.title}</span>
            <button className={styles.button} onClick={() => joinHandler(chat.id)}>
                Join
            </button>
        </li>
    );
}

Chat.propTypes = {
    userId: PropTypes.string.isRequired,
    chat: PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        participants: PropTypes.arrayOf(PropTypes.string)
    }),
    goHandler: PropTypes.func,
    joinHandler: PropTypes.func,
    deleteHandler: PropTypes.func
};
