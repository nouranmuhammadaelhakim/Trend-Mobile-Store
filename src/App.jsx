import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import Admin from './pages/Admin';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} cartItemCount={cartCount} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AdminProvider>
  );
};

export default App;
