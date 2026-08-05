import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  ShoppingBag as OrderIcon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import AnimatedButton from './AnimatedButton';
import BorderBeam from './BorderBeam';
import GooeyNav from './GooeyNav';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const categoryRef = useRef(null);
  const profileRef = useRef(null);

  // Framer Motion scroll tracking
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 30);
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category/categories');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch counts
  const fetchCounts = async () => {
    if (!isLoggedIn) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }
    try {
      const cartResponse = await api.get('/cart/view-cart');
      const cartItems = cartResponse.data.cart || [];
      setCartCount(cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0));

      const wishlistResponse = await api.get('/wishlist/see');
      const wishlistItems = wishlistResponse.data.wishlist || [];
      setWishlistCount(wishlistItems.length);
    } catch (error) {
      if (error !== 'wishlist is empty' && error !== 'cart already clear..!') {
        console.error('Failed to fetch counts:', error);
      }
      if (error === 'wishlist is empty') setWishlistCount(0);
    }
  };

  useEffect(() => {
    fetchCounts();

    window.addEventListener('cart-updated', fetchCounts);
    window.addEventListener('wishlist-updated', fetchCounts);

    return () => {
      window.removeEventListener('cart-updated', fetchCounts);
      window.removeEventListener('wishlist-updated', fetchCounts);
    };
  }, [isLoggedIn]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 300 } },
    exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } }
  };

  const getActiveIndex = () => {
    const searchParams = new URLSearchParams(location.search);
    if (location.pathname === '/' && !searchParams.get('category')) {
      return 0;
    }
    if (searchParams.get('category') || categoryDropdownOpen) {
      return 1;
    }
    return -1;
  };

  const activeIndex = getActiveIndex();

  const handleNavClick = (index) => {
    if (index === 1) {
      setCategoryDropdownOpen(!categoryDropdownOpen);
    } else {
      setCategoryDropdownOpen(false);
    }
  };

  const navItems = [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Categories',
      icon: (
        <motion.span
          className="inline-block"
          animate={{ rotate: categoryDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={12} />
        </motion.span>
      )
    }
  ];

  return (
    <motion.header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b shadow-2xl navbar-scrolled'
          : 'bg-transparent border-b border-transparent'
      }`}
      animate={{ height: scrolled ? 64 : 76 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-full">
        <div className="flex justify-between items-center h-full">

          {/* Logo Left */}
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold tracking-tight text-primary flex items-center gap-2.5">
              <div className="bg-[#F23F0C] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                S
              </div>
              <span className="tracking-widest">SHOPVIBE</span>
            </Link>
          </div>

          {/* Nav Links Center (Fills space gracefully like Hero02) */}
          <nav className="hidden md:flex nav-pill backdrop-blur-md border rounded-full px-1.5 py-1.5 relative items-center overflow-visible" ref={categoryRef}>
            <BorderBeam
              colorFrom="#F23F0C"
              colorTo="#F23F0C"
              duration={6}
              borderThickness={1.2}
              glowIntensity={6}
            />
            <GooeyNav
              items={navItems}
              activeIndex={activeIndex}
              onItemClick={handleNavClick}
            />

            <AnimatePresence>
              {categoryDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute right-4 top-full mt-3 w-56 bg-card border border-default py-2 z-50 rounded-2xl shadow-premium text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/?category=${cat.id}`}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block px-5 py-2.5 text-xs text-secondary hover:bg-[var(--color-hover-white5)] hover:text-primary transition-colors duration-150 font-bold uppercase tracking-wider"
                      >
                        {cat.category_name}
                      </Link>
                    ))
                  ) : (
                    <span className="block px-5 py-2 text-xs text-muted font-bold uppercase tracking-wider">No categories</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Icons Right */}
          <div className="flex items-center space-x-2">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-secondary hover:text-primary transition-colors duration-200 rounded-xl hover:bg-[var(--color-hover-white5)]"
              title="Wishlist"
            >
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
                <Heart size={20} strokeWidth={1.5} />
              </motion.div>
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#F23F0C] text-white text-[9px] w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full font-semibold border border-[var(--color-bg)]"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-secondary hover:text-primary transition-colors duration-200 rounded-xl hover:bg-[var(--color-hover-white5)]"
              title="Cart"
            >
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
                <ShoppingBag size={20} strokeWidth={1.5} />
              </motion.div>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#F23F0C] text-white text-[9px] min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full font-semibold border border-[var(--color-bg)]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Dropdown */}
            {isLoggedIn ? (
              <div className="relative flex items-center" ref={profileRef}>
                <AnimatedButton
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center justify-center p-2 text-secondary hover:text-primary hover:bg-[var(--color-hover-white5)] focus:outline-none cursor-pointer rounded-xl transition-colors duration-200"
                >
                  <User size={20} strokeWidth={1.5} />
                </AnimatedButton>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="absolute right-0 top-full mt-4 w-56 bg-card border border-default py-2 z-50 rounded-2xl shadow-premium text-primary"
                    >
                      <div className="px-5 py-3 border-b border-default mb-1">
                        <p className="text-sm font-semibold text-primary line-clamp-1">{user?.username}</p>
                        <p className="text-xs text-muted line-clamp-1">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-secondary hover:bg-[var(--color-hover-white5)] hover:text-primary transition-colors duration-150 font-medium"
                      >
                        <User size={15} strokeWidth={1.5} />
                        Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-secondary hover:bg-[var(--color-hover-white5)] hover:text-primary transition-colors duration-150 font-medium"
                      >
                        <OrderIcon size={15} strokeWidth={1.5} />
                        My Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-[#F23F0C] bg-orange-500/10 hover:bg-orange-500/20 transition-colors duration-150 font-semibold"
                        >
                          <LayoutDashboard size={15} strokeWidth={1.5} />
                          Admin Panel
                        </Link>
                      )}

                      <div className="border-t border-default mt-1 pt-1">
                        <AnimatedButton
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full text-left px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-150 font-medium cursor-pointer"
                        >
                          <LogOut size={15} strokeWidth={1.5} />
                          Logout
                        </AnimatedButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold text-black bg-white hover:bg-zinc-200 px-5 py-2.5 rounded-full transition-all duration-200"
              >
                Sign in
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <AnimatedButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-secondary hover:text-primary hover:bg-[var(--color-hover-white5)] focus:outline-none cursor-pointer rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-card border-b border-default shadow-2xl"
          >
            <div className="px-6 py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors duration-150"
              >
                Home
              </Link>

              <div className="border-t border-default pt-3">
                <span className="block text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                  Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/?category=${cat.id}`}
                      className="block p-3 bg-surface-secondary text-sm font-medium text-secondary text-center hover:bg-[var(--color-hover-white5)] hover:text-primary transition-colors duration-150 rounded-xl"
                    >
                      {cat.category_name}
                    </Link>
                  ))}
                </div>
              </div>

              {isLoggedIn && isAdmin && (
                <div className="border-t border-default pt-3">
                  <Link
                    to="/admin"
                    className="block p-3 text-center bg-[#F23F0C] hover:bg-orange-600 text-white text-sm font-semibold rounded-xl"
                  >
                    Admin Panel
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
