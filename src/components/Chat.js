import React from 'react';
import PropTypes from 'prop-types';

class Chat extends React.Component {
    innerClickHandle(e) {
        e.preventDefault();
        this.props.clickHandle(this.props.id);
    }

    render() {
        const { title } = this.props;
        return (
            <li>
                <a href="/" onClick={(e) => this.innerClickHandle(e)}>
                    {title}
                </a>
            </li>
        );
    }
}

Chat.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    clickHandle: PropTypes.func.isRequired
};

export default Chat;
