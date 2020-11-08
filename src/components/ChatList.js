import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

class ChatList extends React.Component {
    render() {
        const { list, clickHandle } = this.props;
        return (
            <ul>
                {list.map((chat) => (
                    <Chat id={chat.id} title={chat.title} clickHandle={clickHandle} key={chat.id} />
                ))}
            </ul>
        );
    }
}

ChatList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    ),
    clickHandle: PropTypes.func.isRequired
};

export default ChatList;
