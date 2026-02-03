import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import { useData } from '../../context/DataContext';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { products, categories, usingStrapiData } = useData();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const adminPages = [
        {
            id: 'home',
            title: 'Home Page',
            description: 'Manage featured products and hero section',
            path: '/admin/manage/home'
        },
        {
            id: 'products',
            title: 'Products',
            description: 'Add, edit, and delete products',
            path: '/admin/manage/products'
        },
        {
            id: 'categories',
            title: 'Categories',
            description: 'Manage product categories',
            path: '/admin/manage/categories'
        },
        {
            id: 'orders',
            title: 'Orders',
            description: 'View and manage customer orders',
            path: '/admin/manage/orders'
        },
        {
            id: 'banners',
            title: 'Banners',
            description: 'Manage promotional banners',
            path: '/admin/manage/banners'
        }
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setDropdownOpen(false);
    };

    return (
        <div className={styles.adminDashboard}>
            <div className={styles.header}>
                <h1>Admin Dashboard</h1>
                <p>Welcome back, {user?.firstName || 'Admin'}! Manage your store here.</p>
            </div>

            <div className={styles.content}>
                {/* Navigation Dropdown */}
                <div className={styles.navigation}>
                    <h2 className={styles.navTitle}>Manage Content</h2>
                    <div className={styles.dropdown}>
                        <button 
                            className={styles.dropdownButton}
                            onClick={toggleDropdown}
                        >
                            <span>Select a page to manage</span>
                            {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        
                        {dropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {adminPages.map(page => (
                                    <div
                                        key={page.id}
                                        className={styles.dropdownItem}
                                        onClick={() => handleNavigate(page.path)}
                                    >
                                        <h3>{page.title}</h3>
                                        <p>{page.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h3>Total Products</h3>
                        <p>{products.length}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Categories</h3>
                        <p>{categories.length}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Data Source</h3>
                        <p>{usingStrapiData ? 'Strapi' : 'Mock'}</p>
                    </div>
                </div>

                {/* Welcome Section */}
                <div className={styles.welcomeSection}>
                    <h2>Getting Started</h2>
                    <p>
                        Use the dropdown menu above to navigate to different management pages. 
                        You can add, edit, and delete items on each page.
                    </p>
                    
                    <div className={styles.quickActions}>
                        <button 
                            className={styles.actionButton}
                            onClick={() => navigate('/admin/manage/products')}
                        >
                            Manage Products
                        </button>
                        <button 
                            className={styles.actionButton}
                            onClick={() => navigate('/admin/manage/categories')}
                        >
                            Manage Categories
                        </button>
                        <button 
                            className={styles.actionButton}
                            onClick={() => navigate('/')}
                        >
                            View Store
                        </button>
                    </div>

                    {!usingStrapiData && (
                        <div className={styles.infoBox}>
                            <p>
                                <strong>Note:</strong> Currently using mock data. 
                                Configure Strapi in your .env.local file to use live data management.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
