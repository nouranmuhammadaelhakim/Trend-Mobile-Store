import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { CartProvider, useCart } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ManageHome from './pages/admin/ManageHome';
import ManageBanners from './pages/admin/ManageBanners';
import ManageOrders from './pages/admin/ManageOrders';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* Protected User Routes */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage/products" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageProducts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage/categories" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageCategories />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage/home" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage/banners" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageBanners />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage/orders" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageOrders />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  // Only use ClerkProvider if API key is configured
  const hasClerkKey = Boolean(
    clerkPubKey && 
    clerkPubKey.startsWith('pk_') && 
    !clerkPubKey.includes('your_clerk')
  );

  if (!hasClerkKey) {
    console.warn('Clerk API key not configured. Authentication features will be limited. Configure your .env.local file to enable authentication.');
  }

  const AppWrapper = hasClerkKey ? (
    <ClerkProvider publishableKey={clerkPubKey}>
      <DataProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </DataProvider>
    </ClerkProvider>
  ) : (
    <DataProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </DataProvider>
  );

  return AppWrapper;
};

export default App;
