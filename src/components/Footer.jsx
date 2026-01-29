import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>

                <div className={styles.brandSection}>
                    <div className={styles.logo}>
                        Trend<span>Store</span>
                        <span className={styles.storeBadge}>MOBILE STORE</span>
                    </div>
                    <p className={styles.tagline}>TREND STORE , YOUR TRUSTED MOBILE ACCESSORIES STORE !</p>

                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialLink}><FaInstagram /> TREND_STORE</a>
                        <a href="#" className={styles.socialLink}><FaTwitter /> TREND STORE</a>
                        <a href="#" className={styles.socialLink}><FaFacebookF /> TREND STORE</a>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.addressBox}>
                        <h3>العنوان</h3>
                        <p>شارع طه حسين امام النادي الرياضي</p>
                        <p>, المنيا</p>
                    </div>

                    <div className={styles.contactBox}>
                        <h3>CONTACT US</h3>
                        <p>+20 123456789</p>
                        <p>+20 123456789</p>
                    </div>

                    <div className={styles.mapBox}>
                        {/* Use a static image or a placeholder for the map in footer */}
                        <div className={styles.mapPlaceholder}>Map</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
