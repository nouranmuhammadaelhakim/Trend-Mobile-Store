import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <div className={`container ${styles.contactPage} section-padding`}>
            <SectionTitle title="CONTACT" />

            <div className={styles.content}>
                <div className={styles.infoSection}>
                    <div className={styles.block}>
                        <h3>FOLLOW US NOW</h3>
                        <a href="#" className={styles.socialLink}><FaFacebook /> Facebook page : Trend store</a>
                        <a href="#" className={styles.socialLink}><FaInstagram /> Instagram page : Trend_store</a>
                    </div>

                    <div className={styles.separator}></div>

                    <div className={styles.block}>
                        <h3>CALL US</h3>
                        <div className={styles.contactItem}><FaWhatsapp /> Whatsapp : +20 123456789</div>
                        <div className={styles.contactItem}><FaPhoneAlt /> Mobile : +20 123456789</div>
                    </div>

                    <div className={styles.separator}></div>

                    <div className={styles.block}>
                        <h3>LOCATION</h3>
                        <p className={styles.address}>شارع طه حسين امام النادي <br /> الرياضي , المنيا</p>

                        {/* Small map preview */}
                        <div className={styles.smallMap}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d37.36317467794521!3d26.820553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb555246747d4!2sMinya%2C%20Menia%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className={styles.imageSection}>
                    <div className={styles.storeImagePlaceholder}>
                        Store picture
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
