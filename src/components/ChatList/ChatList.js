import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../Chat/Chat';
import styles from './styles.module.css';

export default function ChatList({ list, userId, goHandler, joinHandler, deleteHandler }) {
    if (!list.length) {
        return <span className={styles.spanEmptyList}>Chat list is empty</span>;
    }
    return (
        <ul className="chat-list">
            {list.map((chat) => (
                <Chat
                    userId={userId}
                    chat={chat}
                    goHandler={goHandler}
                    joinHandler={joinHandler}
                    deleteHandler={deleteHandler}
                    key={chat.id}
                />
            ))}
        </ul>
    );
}

ChatList.propTypes = {
    userId: PropTypes.string,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            participants: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    goHandler: PropTypes.func,
    joinHandler: PropTypes.func,
    deleteHandler: PropTypes.func
};
