import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const login = (username, password) => {
    // Simple authentication - in production, this should use proper backend authentication
    if (username === 'admin' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAdminAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
