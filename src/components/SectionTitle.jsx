import React from 'react';
import styles from './SectionTitle.module.css';

const SectionTitle = ({ title, subtitle }) => {
    return (
        <div className={styles.titleWrapper}>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};

export default SectionTitle;
