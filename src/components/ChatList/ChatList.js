import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../Chat/Chat';
import styles from './styles.module.css';

class ChatList extends React.Component {
    render() {
        if (!this.props.list.length) {
            return <span className={styles.spanEmptyList}>Chat list is empty</span>;
        }
        return (
            <ul className="chat-list">
                {this.props.list.map((chat) => (
                    <Chat
                        userId={this.props.userId}
                        chat={chat}
                        goHandler={this.props.goHandler}
                        joinHandler={this.props.joinHandler}
                        deleteHandler={this.props.deleteHandler}
                        key={chat.id}
                    />
                ))}
            </ul>
        );
    }
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

export default ChatList;
