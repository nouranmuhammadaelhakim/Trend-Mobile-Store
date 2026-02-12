import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { products } from '../data/mockData';
import styles from './Admin.module.css';

const Admin = () => {
  const { isAdminAuthenticated, login, logout } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setError('');
    } else {
      setError('Invalid credentials. Use admin/admin123');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.loginBtn}>Login</button>
          </form>
          <p className={styles.hint}>Default credentials: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p className={styles.statValue}>{products.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>New Products</h3>
          <p className={styles.statValue}>{products.filter(p => p.isNew).length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Best Sellers</h3>
          <p className={styles.statValue}>{products.filter(p => p.isBestSeller).length}</p>
        </div>
      </div>

      <div className={styles.productsSection}>
        <h2>Products Management</h2>
        <div className={styles.productsTable}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    {product.isNew && <span className={styles.badge}>New</span>}
                    {product.isBestSeller && <span className={styles.badgeBest}>Best Seller</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
