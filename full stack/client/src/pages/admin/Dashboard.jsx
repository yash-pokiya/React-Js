import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DollarSign, Users, Award, ShoppingBag, FolderTree, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import Spinner from '../../components/Spinner';
import AnimatedButton from '../../components/AnimatedButton';

const statContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const statItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [salesReport, setSalesReport] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [salesRes, usersRes, topRes] = await Promise.all([
          api.get('/admin/stats/sales'),
          api.get('/admin/stats/users'),
          api.get('/admin/stats/top-products'),
        ]);

        setTotalSales(salesRes.data['all time total sale '] || 0);
        setSalesReport(salesRes.data.report || []);
        setTotalUsers(usersRes.data.totalUser || 0);
        setTopProducts(topRes.data.top || []);
      } catch (err) {
        toast.error(err || 'Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="py-32 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );

  const bestProduct = topProducts[0]?.product_name || 'N/A';

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-surface min-h-screen text-primary">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Admin Dashboard
          </h1>
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1.5">
            Sales figures and store metrics
          </p>
        </div>

        {/* Quick Admin Navigation links */}
        <div className="flex flex-wrap gap-2.5">
          <AnimatedButton
            onClick={() => navigate('/admin/products')}
            className="flex items-center gap-1.5 bg-surface-secondary border border-default hover:border-[#F23F0C] text-secondary hover:text-[#F23F0C] px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shadow-lg"
          >
            <ShoppingBag size={14} />
            Products
          </AnimatedButton>
          <AnimatedButton
            onClick={() => navigate('/admin/categories')}
            className="flex items-center gap-1.5 bg-surface-secondary border border-default hover:border-[#F23F0C] text-secondary hover:text-[#F23F0C] px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shadow-lg"
          >
            <FolderTree size={14} />
            Categories
          </AnimatedButton>
          <AnimatedButton
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-1.5 bg-surface-secondary border border-default hover:border-[#F23F0C] text-secondary hover:text-[#F23F0C] px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shadow-lg"
          >
            <ClipboardList size={14} />
            Orders
          </AnimatedButton>
        </div>
      </div>

      {/* Stat Cards */}
      <motion.div
        variants={statContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {/* Total Sales */}
        <motion.div
          variants={statItemVariants}
          className="bg-card border border-default rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:border-[var(--color-border-hover)] shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-[#F23F0C]/10 text-[#F23F0C] flex items-center justify-center flex-shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-[9px] text-muted uppercase tracking-widest font-bold">
              Total Revenue
            </p>
            <h3 className="text-xl font-bold text-primary mt-0.5">
              ₹{totalSales}
            </h3>
          </div>
        </motion.div>

        {/* Total Users */}
        <motion.div
          variants={statItemVariants}
          className="bg-card border border-default rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:border-[var(--color-border-hover)] shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-[#F23F0C]/10 text-[#F23F0C] flex items-center justify-center flex-shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[9px] text-muted uppercase tracking-widest font-bold">
              Total Users
            </p>
            <h3 className="text-xl font-bold text-primary mt-0.5">
              {totalUsers}
            </h3>
          </div>
        </motion.div>

        {/* Top Product */}
        <motion.div
          variants={statItemVariants}
          className="bg-card border border-default rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:border-[var(--color-border-hover)] shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-[#F23F0C]/10 text-[#F23F0C] flex items-center justify-center flex-shrink-0">
            <Award size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] text-muted uppercase tracking-widest font-bold">
              Top Product
            </p>
            <h3 className="text-sm font-bold text-primary truncate mt-0.5" title={bestProduct}>
              {bestProduct}
            </h3>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Report Table */}
        <div className="bg-card border border-default rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="p-5 border-b border-default">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
              Recent Sales Reports
            </h3>
          </div>

          <div className="overflow-x-auto flex-grow">
            {salesReport.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-default bg-surface-secondary text-muted font-bold uppercase tracking-widest">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Product</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] font-semibold text-secondary">
                  {salesReport.map((sale, idx) => (
                    <tr key={idx} className="hover:bg-[var(--color-hover-subtle)] transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-primary">{sale.fullname}</p>
                        <p className="text-[10px] text-muted mt-0.5">{sale.email}</p>
                      </td>
                      <td className="p-4 text-primary">{sale.product_name}</td>
                      <td className="p-4 text-center">{sale.quantity}</td>
                      <td className="p-4 text-right font-bold text-primary">₹{sale.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-muted text-xs font-bold">No sales reported yet</div>
            )}
          </div>
        </div>

        {/* Top Selling Products Table */}
        <div className="bg-card border border-default rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="p-5 border-b border-default">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
              Top Products Performance
            </h3>
          </div>

          <div className="overflow-x-auto flex-grow">
            {topProducts.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-default bg-surface-secondary text-muted font-bold uppercase tracking-widest">
                    <th className="p-4 text-center">Rank</th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4 text-center">Units Sold</th>
                    <th className="p-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] font-semibold text-secondary">
                  {topProducts.map((prod, idx) => (
                    <tr key={prod.id || idx} className="hover:bg-[var(--color-hover-subtle)] transition-colors">
                      <td className="p-4 text-center font-bold text-muted">#{idx + 1}</td>
                      <td className="p-4 text-primary font-bold">{prod.product_name}</td>
                      <td className="p-4 text-center font-bold text-primary">{prod.total_quantity_sold}</td>
                      <td className="p-4 text-right font-bold text-primary">₹{prod.total_sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-muted text-xs font-bold">No product performance data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
