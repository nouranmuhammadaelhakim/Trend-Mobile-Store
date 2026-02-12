import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    let user = null;
    
    try {
        const clerkUser = useUser();
        user = clerkUser.user;
    } catch {
        // Clerk not configured
    }

    const [activeTab, setActiveTab] = useState('overview');

    // Mock orders data - in production, fetch from backend
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            total: 450,
            status: 'completed',
            items: 3
        },
        {
            id: 'ORD-002',
            date: '2024-01-20',
            total: 280,
            status: 'processing',
            items: 2
        }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'overview':
                return (
                    <div>
                        <h2>Dashboard Overview</h2>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <h4>Total Orders</h4>
                                <p>{orders.length}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Total Spent</h4>
                                <p>${orders.reduce((sum, order) => sum + order.total, 0)}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Active Orders</h4>
                                <p>{orders.filter(o => o.status === 'processing').length}</p>
                            </div>
                        </div>
                        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Recent Orders</h3>
                        {orders.length > 0 ? (
                            <table className={styles.ordersTable}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.items}</td>
                                            <td>${order.total}</td>
                                            <td>
                                                <span className={`${styles.status} ${styles[order.status]}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.emptyState}>
                                <h3>No orders yet</h3>
                                <p>Your orders will appear here once you make a purchase</p>
                            </div>
                        )}
                    </div>
                );
            case 'orders':
                return (
                    <div>
                        <h2>My Orders</h2>
                        {orders.length > 0 ? (
                            <table className={styles.ordersTable}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.items}</td>
                                            <td>${order.total}</td>
                                            <td>
                                                <span className={`${styles.status} ${styles[order.status]}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.emptyState}>
                                <h3>No orders yet</h3>
                                <p>Your orders will appear here once you make a purchase</p>
                            </div>
                        )}
                    </div>
                );
            case 'profile':
                return (
                    <div>
                        <h2>My Profile</h2>
                        <div className={styles.profileInfo}>
                            <div className={styles.infoRow}>
                                <div className={styles.infoLabel}>Name:</div>
                                <div className={styles.infoValue}>{user?.fullName || 'Not provided'}</div>
                            </div>
                            <div className={styles.infoRow}>
                                <div className={styles.infoLabel}>Email:</div>
                                <div className={styles.infoValue}>
                                    {user?.primaryEmailAddress?.emailAddress || 'Not provided'}
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <div className={styles.infoLabel}>Member Since:</div>
                                <div className={styles.infoValue}>
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Welcome back, {user?.firstName || 'User'}!</h1>
                    <p>Manage your orders and account settings</p>
                </div>

                <div className={styles.content}>
                    <aside className={styles.sidebar}>
                        <h3>Menu</h3>
                        <ul className={styles.sidebarMenu}>
                            <li>
                                <button
                                    className={activeTab === 'overview' ? styles.active : ''}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Overview
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeTab === 'orders' ? styles.active : ''}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    My Orders
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeTab === 'profile' ? styles.active : ''}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    Profile
                                </button>
                            </li>
                        </ul>
                    </aside>

                    <main className={styles.main}>
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
