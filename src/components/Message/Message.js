import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Message({ nickname, content }) {
    return (
        <li className={styles.content}>
            <b>{nickname}: </b>
            {content}
        </li>
    );
}

Message.propTypes = {
    nickname: PropTypes.string,
    content: PropTypes.string
};
