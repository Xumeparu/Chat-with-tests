import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
    render() {
        const { nickname, content } = this.props;
        return (
            <li>
                <b>{nickname}: </b>
                {content}
            </li>
        );
    }
}

Message.propTypes = {
    nickname: PropTypes.string,
    content: PropTypes.string
};

export default Message;
