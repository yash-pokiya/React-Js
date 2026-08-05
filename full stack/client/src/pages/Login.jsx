import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FloatingInput from '../components/FloatingInput';
import AnimatedButton from '../components/AnimatedButton';

const formVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const formItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await login(usernameOrEmail, password);
      toast.success(res.msg || 'Logged in successfully!');
      window.dispatchEvent(new Event('cart-updated'));
      window.dispatchEvent(new Event('wishlist-updated'));
      navigate('/');
    } catch (err) {
      toast.error(err || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-32 pb-24 px-6 bg-surface min-h-screen flex flex-col justify-center">
      <div className="bg-card border border-default p-8 sm:p-10 rounded-2xl shadow-2xl">
        <div className="mb-10 text-left">
          <h1 className="text-[2.25rem] font-bold tracking-tight leading-tight text-primary">
            Welcome back.
          </h1>
          <p className="text-sm text-secondary mt-2">
            Minimal prices. No clutter.
          </p>
        </div>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <motion.div variants={formItem}>
            <FloatingInput
              id="usernameOrEmail"
              label="Email or Username"
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              error={errors.usernameOrEmail}
              required
            />
          </motion.div>

          <motion.div variants={formItem}>
            <FloatingInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
          </motion.div>

          <motion.div variants={formItem}>
            <AnimatedButton
              type="submit"
              disabled={loading}
              className="w-full bg-[#F23F0C] text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-orange-500/10 border border-transparent"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </AnimatedButton>
          </motion.div>
        </motion.form>

        <div className="mt-8 text-center">
          <Link
            to="/register"
            className="text-secondary hover:text-primary transition-colors duration-150 text-sm font-semibold"
          >
            Don't have an account? <span className="text-[#F23F0C] font-bold hover:underline">Register →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
