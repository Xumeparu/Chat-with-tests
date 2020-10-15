import React from 'react';
import pain from './pain.png';
import styles from './styles.module.css';
import './styles.scss';

export default function Index() {
    return <div className={styles.cat}>
        <img src={pain} alt="Cat fells pain :c"/>
    </div>;
}