import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../api/axios';
import FloatingInput from '../components/FloatingInput';
import AnimatedButton from '../components/AnimatedButton';

const formVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const formItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
};

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await api.post('/user/register', {
        fullname,
        username,
        email,
        password,
      });

      if (response.data.msg && response.data.msg.includes('must be required')) {
        toast.error(response.data.msg);
        return;
      }
      if (response.data.msg && response.data.msg.includes('passwoth')) {
        toast.error('Password must be at least 6 characters');
        return;
      }

      toast.success(response.data.msg || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-32 pb-24 px-6 bg-surface min-h-screen flex flex-col justify-center">
      <div className="bg-card border border-default p-8 sm:p-10 rounded-2xl shadow-2xl">
        <div className="mb-10 text-left">
          <h1 className="text-[2.25rem] font-bold tracking-tight leading-tight text-primary">
            Create account.
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
              id="fullname"
              label="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              error={errors.fullname}
              required
            />
          </motion.div>

          <motion.div variants={formItem}>
            <FloatingInput
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
            />
          </motion.div>

          <motion.div variants={formItem}>
            <FloatingInput
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
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
              {loading ? 'Creating...' : 'Create account'}
            </AnimatedButton>
          </motion.div>
        </motion.form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-secondary hover:text-primary transition-colors duration-150 text-sm font-semibold"
          >
            Already have an account? <span className="text-[#F23F0C] font-bold hover:underline">Login here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
