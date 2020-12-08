import React from 'react';
import PropTypes from 'prop-types';

export default class ViewHeader extends React.Component {
    render() {
        const { title, children } = this.props;

        return (
            <>
                <h1>{title}</h1>
                {React.cloneElement(children, this.props)}
            </>
        );
    }
}

ViewHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any
};
