import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ toggleSidebar, cartItemCount }) => {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link to="/" className={styles.logo}>
                    Trend<span>Store</span>
                </Link>

                <div className={styles.navLinks}>
                    <Link to="/">Home</Link>
                    <Link to="/category/services">Services</Link>
                    <Link to="/category/all">Shop</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className={styles.navIcons}>
                    <Link to="/cart" className={styles.iconBtn}>
                        <FaShoppingCart />
                        {cartItemCount > 0 && <span className={styles.badge}>{cartItemCount}</span>}
                    </Link>
                    <Link to="/profile" className={styles.iconBtn}>
                        <FaUser />
                    </Link>
                    <button className={styles.menuBtn} onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
