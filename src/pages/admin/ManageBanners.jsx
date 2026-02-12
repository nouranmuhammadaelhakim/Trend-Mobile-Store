import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ManageProducts.module.css';

const ManageBanners = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.manageProducts}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Manage Banners</h1>
                    <button 
                        className={styles.backButton}
                        onClick={() => navigate('/admin')}
                    >
                        <FaArrowLeft />
                        Back to Dashboard
                    </button>
                </div>

                <div className={styles.emptyState}>
                    <h2>Banner Management</h2>
                    <p>
                        Manage promotional banners and announcements displayed throughout your store:
                    </p>
                    <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
                        <li>Hero banners</li>
                        <li>Promotional banners</li>
                        <li>Announcement bars</li>
                        <li>Sale banners</li>
                    </ul>
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        Connect Strapi CMS to enable banner management.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ManageBanners;
