import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class Chat extends React.Component {
    isOwner() {
        return this.props.userId === this.props.chat.userId;
    }

    isParticipant() {
        return this.props.chat.participants.includes(this.props.userId);
    }

    renderChat() {
        if (this.isOwner()) {
            return (
                <>
                    <a href="/" onClick={(e) => this.innerClickHandler(e)}>
                        <span className={styles.chatTitle}>{this.props.chat.title}</span>
                    </a>
                    <button
                        className={styles.button}
                        onClick={() => this.props.deleteHandler(this.props.chat.id)}
                    >
                        Delete
                    </button>
                </>
            );
        }
        if (this.isParticipant()) {
            return (
                <>
                    <a href="/" onClick={(e) => this.innerClickHandler(e)}>
                        <span className={styles.chatTitle}>{this.props.chat.title}</span>
                    </a>
                    {/* TODO: exit button */}
                </>
            );
        }
        return (
            <>
                <span className={styles.chatTitle}>{this.props.chat.title}</span>
                <button
                    className={styles.button}
                    onClick={() => this.props.joinHandler(this.props.chat.id)}
                >
                    Join
                </button>
            </>
        );
    }

    innerClickHandler(e) {
        e.preventDefault();
        this.props.goHandler(this.props.chat.id);
    }

    render() {
        return <li>{this.renderChat()}</li>;
    }
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

export default Chat;