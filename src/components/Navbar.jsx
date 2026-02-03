import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { useUser, UserButton } from '@clerk/clerk-react';
import styles from './Navbar.module.css';

const Navbar = ({ toggleSidebar, cartItemCount }) => {
    const { isSignedIn, user } = useUser();
    const isAdmin = user?.publicMetadata?.role === 'admin' || 
                    user?.emailAddresses?.[0]?.emailAddress?.includes('admin');

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
                    <Link to="/contact">Contact</Link>
                    {isAdmin && (
                        <Link to="/admin" style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                            Admin
                        </Link>
                    )}
                </div>

                <div className={styles.navIcons}>
                    <Link to="/cart" className={styles.iconBtn}>
                        <FaShoppingCart />
                        {cartItemCount > 0 && <span className={styles.badge}>{cartItemCount}</span>}
                    </Link>
                    {isSignedIn ? (
                        <>
                            <Link to="/dashboard" className={styles.iconBtn}>
                                <FaUser />
                            </Link>
                            <div style={{ marginLeft: '0.5rem' }}>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </>
                    ) : (
                        <Link to="/sign-in" className={styles.iconBtn}>
                            <FaUser />
                        </Link>
                    )}
                    <button className={styles.menuBtn} onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
