import React from 'react';
import pain from './pain.png';
import styles from './styles.module.css';
import './styles.module.css';

export default function Index() {
    return (
        <div className={styles.cat}>
            <img className={styles.catPain} src={pain} alt="Cat fells pain :c" />
        </div>
    );
}
