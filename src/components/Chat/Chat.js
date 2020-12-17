import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Chat(props) {
    function isOwner() {
        return props.userId === props.chat.userId;
    }

    function isParticipant() {
        return props.chat.participants.includes(props.userId);
    }

    function renderChat() {
        if (isOwner()) {
            return (
                <>
                    <a href="/" onClick={(e) => innerClickHandler(e)}>
                        <span className={styles.chatTitle}>{props.chat.title}</span>
                    </a>
                    <button
                        className={styles.button}
                        onClick={() => props.deleteHandler(props.chat.id)}
                    >
                        Delete
                    </button>
                </>
            );
        }
        if (isParticipant()) {
            return (
                <>
                    <a href="/" onClick={(e) => innerClickHandler(e)}>
                        <span className={styles.chatTitle}>{props.chat.title}</span>
                    </a>
                    {/* TODO: exit button */}
                </>
            );
        }
        return (
            <>
                <span className={styles.chatTitle}>{props.chat.title}</span>
                <button className={styles.button} onClick={() => props.joinHandler(props.chat.id)}>
                    Join
                </button>
            </>
        );
    }

    function innerClickHandler(e) {
        e.preventDefault();
        props.goHandler(props.chat.id);
    }

    return <li>{renderChat()}</li>;
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
