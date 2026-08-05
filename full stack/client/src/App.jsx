import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import PageWrapper from './components/PageWrapper';

import IosCursor from './components/IosCursor';

// Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import AllOrders from './pages/admin/AllOrders';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-primary">
      <Navbar />
      <main className="flex-grow pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageWrapper><Profile /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <PageWrapper><Cart /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <PageWrapper><Wishlist /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <PageWrapper><Orders /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <PageWrapper><Checkout /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <PageWrapper><Dashboard /></PageWrapper>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <PageWrapper><Products /></PageWrapper>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <PageWrapper><Categories /></PageWrapper>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <PageWrapper><AllOrders /></PageWrapper>
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const ThemedToaster = () => {
  const { isDark } = useTheme();
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? '#0A0A0A' : '#FFFFFF',
          color: isDark ? '#FFFFFF' : '#09090b',
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          borderRadius: '12px',
          padding: '12px 20px',
          boxShadow: isDark
            ? '0 10px 30px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.08)',
        },
        success: {
          iconTheme: { primary: '#F23F0C', secondary: isDark ? '#FFFFFF' : '#09090b' }
        },
        error: {
          iconTheme: { primary: '#EF4444', secondary: isDark ? '#FFFFFF' : '#09090b' }
        }
      }}
    />
  );
};

function App() {
  return (
    <ThemeProvider>
      <IosCursor />
      <AuthProvider>
        <Router>
          <MainLayout>
            <AnimatedRoutes />
        
          </MainLayout>
        </Router>
        <ThemedToaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
