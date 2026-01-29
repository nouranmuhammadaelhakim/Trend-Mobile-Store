import React from 'react';
import styles from './Banner.module.css';

const Banner = ({ title, text, image, reverse }) => {
    return (
        <section className={styles.banner}>
            <div className={`container ${styles.container} ${reverse ? styles.reverse : ''}`}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
                <div className={styles.image}>
                    {/* img src={image} */}
                </div>
            </div>
        </section>
    );
};

export default Banner;
