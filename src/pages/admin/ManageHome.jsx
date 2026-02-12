import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ManageProducts.module.css';

const ManageHome = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.manageProducts}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Manage Home Page</h1>
                    <button 
                        className={styles.backButton}
                        onClick={() => navigate('/admin')}
                    >
                        <FaArrowLeft />
                        Back to Dashboard
                    </button>
                </div>

                <div className={styles.emptyState}>
                    <h2>Home Page Management</h2>
                    <p>
                        This section allows you to customize the home page content including:
                    </p>
                    <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
                        <li>Hero banner text and images</li>
                        <li>Featured products selection</li>
                        <li>Homepage sections order</li>
                        <li>Promotional content</li>
                    </ul>
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        Connect Strapi CMS to enable full home page customization.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ManageHome;
