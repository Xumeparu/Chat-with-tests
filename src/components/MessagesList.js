import React from 'react';
import Message from './Message';
import PropTypes from "prop-types";

class MessagesList extends React.Component {
    render(){
        const {messages} = this.props;
        return <div id="messages">
            <ul>
                {messages.map((message, index) => (
                    <Message nick={message.nick} message={message.message} key={index}/>
                ))}
            </ul>
        </div>;
    }
}

MessagesList.propTypes = {
    messages: PropTypes.array
}

export default MessagesList;