import React from 'react';
import Message from './Message';
import PropTypes from 'prop-types';

class MessagesList extends React.Component {
    render() {
        const { messages } = this.props;
        return (
            <div id="messages">
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
}

MessagesList.propTypes = {
    messages: PropTypes.array
};

export default MessagesList;
