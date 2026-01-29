import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.heroContent}>
                    <h1>UPGRADE YOUR PHONE <br /> NEEDS</h1>
                    <p>Discover the latest and greatest in mobile accessories.</p>
                    <Link to="/category/all" className={styles.ctaButton}>
                        Shop Now
                    </Link>
                </div>
                <div className={styles.heroImage}>
                    {/* Detailed Image or Background Image will go here */}
                    {/* <img src="/assets/hero-phones.png" alt="Phones" /> */}
                </div>
            </div>
        </section>
    );
};

export default Hero;
