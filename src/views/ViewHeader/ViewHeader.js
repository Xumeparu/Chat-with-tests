import React from 'react';
import PropTypes from 'prop-types';

export default function ViewHeader(props) {
    const { title, children } = props;
    return (
        <>
            <h1>{title}</h1>
            {React.cloneElement(children, props)}
        </>
    );
}

ViewHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any
};
