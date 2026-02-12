import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ManageProducts.module.css';

const ManageOrders = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.manageProducts}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Manage Orders</h1>
                    <button 
                        className={styles.backButton}
                        onClick={() => navigate('/admin')}
                    >
                        <FaArrowLeft />
                        Back to Dashboard
                    </button>
                </div>

                <div className={styles.emptyState}>
                    <h2>Order Management</h2>
                    <p>
                        View and manage customer orders:
                    </p>
                    <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
                        <li>View all orders</li>
                        <li>Update order status</li>
                        <li>Process refunds</li>
                        <li>Track shipments</li>
                        <li>Export order data</li>
                    </ul>
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        Orders will appear here once customers start placing orders through Stripe checkout.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ManageOrders;
