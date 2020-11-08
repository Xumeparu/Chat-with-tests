import React from 'react';
import PropTypes from 'prop-types';

class ChatList extends React.Component {
    render() {
        return <ul>

        </ul>;
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
