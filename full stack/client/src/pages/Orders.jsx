import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Package, Calendar } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import Spinner from '../components/Spinner';
import AnimatedButton from '../components/AnimatedButton';
import StatusBadge from '../components/StatusBadge';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersListRef] = useAutoAnimate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get('/order/see-order');
        // Backend returns: res.json({ msg: "Product fetch successfull..!", "product": [orderDetails] })
        // Therefore, response.data.product[0] contains the actual array
        const rawOrders = response.data.product?.[0] || [];
        setOrders(rawOrders);
      } catch (err) {
        if (err !== 'Orders not found..!') {
          toast.error(err || 'Failed to load orders');
        }
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="py-32 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-surface min-h-screen text-primary">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          My Orders
        </h1>
        <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1.5">
          Check status of your purchases
        </p>
      </div>

      {orders.length > 0 ? (
        <motion.div
          ref={ordersListRef}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {orders.map((order, index) => {
            const orderStatus = order.status || 'Pending';
            const orderDate = order.created_at
              ? new Date(order.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })
              : new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-2xl border border-default p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--color-border-hover)] transition-all duration-300 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-surface-secondary border border-default rounded-xl flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    {order.product_name ? order.product_name.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-primary text-sm sm:text-base">
                      {order.product_name}
                    </h3>
                    <p className="text-xs text-secondary">
                      Quantity: <span className="font-bold text-primary">{order.quantity}</span>
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Calendar size={12} />
                      Ordered: {orderDate}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-default">
                  <div className="text-left md:text-right">
                    <p className="text-[9px] text-muted uppercase tracking-widest font-bold">
                      Total Paid
                    </p>
                    <p className="text-base font-bold text-primary">
                      ₹{order.total_amount}
                    </p>
                  </div>
                  <StatusBadge status={orderStatus} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-24 bg-card border border-default p-8 space-y-6 rounded-2xl">
          <div className="w-16 h-16 bg-surface-secondary border border-default text-primary flex items-center justify-center mx-auto rounded-xl">
            <Package size={24} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-primary">
              No orders placed yet
            </h2>
            <p className="text-xs text-secondary max-w-xs mx-auto">
              Once you make a purchase, it will appear here.
            </p>
          </div>
          <AnimatedButton
            onClick={() => navigate('/')}
            className="inline-block bg-white hover:bg-zinc-200 text-black rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Explore Products
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};

export default Orders;
