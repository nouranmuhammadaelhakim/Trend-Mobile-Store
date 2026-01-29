import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaHome, FaServicestack, FaShoppingBag, FaInfoCircle, FaPhone } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`${styles.sidebarOverlay} ${isOpen ? styles.show : ''}`} onClick={toggleSidebar}>
            <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={toggleSidebar}>
                    <FaTimes />
                </button>

                <div className={styles.sidebarLogo}>
                    Trend<span>Store</span>
                </div>

                <ul className={styles.menuItems}>
                    <li>
                        <Link to="/" onClick={toggleSidebar}>
                            <FaHome className={styles.icon} /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/category/services" onClick={toggleSidebar}>
                            <FaServicestack className={styles.icon} /> Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={toggleSidebar}>
                            <FaInfoCircle className={styles.icon} /> About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={toggleSidebar}>
                            <FaPhone className={styles.icon} /> Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/new-arrival" onClick={toggleSidebar}>
                            <FaShoppingBag className={styles.icon} /> New Arrival
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
