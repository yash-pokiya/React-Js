import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, Calendar, ChevronDown } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import api from '../../api/axios';
import Spinner from '../../components/Spinner';
import AnimatedButton from '../../components/AnimatedButton';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState({});
  const [tbodyRef] = useAutoAnimate();

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/order/check-all');
      const rawOrders = response.data.orders || [];

      const processedOrders = rawOrders.map((order, idx) => {
        const assumedId = order.id || (idx + 1);
        return {
          ...order,
          id: assumedId,
          status: (order.status || 'pending').toLowerCase(),
          quantity: order.quantity || 1,
        };
      });

      setOrders(processedOrders);
    } catch (err) {
      toast.error(err || 'Failed to fetch all orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleSaveStatus = async (orderId, currentStatus) => {
    setUpdatingIds((prev) => ({ ...prev, [orderId]: true }));
    try {
      const response = await api.put(`/order/status/${orderId}`, {
        status: currentStatus,
      });

      toast.success(response.data.msg || `Status updated for Order #${orderId}`);
    } catch (err) {
      toast.error(err || `Failed to update status for Order #${orderId}`);
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  if (loading) return (
    <div className="py-32 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-black min-h-screen text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Manage Orders
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1.5">
          Review purchases and dispatch statuses
        </p>
      </div>

      <div className="bg-zinc-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {orders.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900 bg-neutral-900/30 text-zinc-500 font-bold uppercase tracking-widest">
                  <th className="p-4 text-center">ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Date</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody ref={tbodyRef} className="divide-y divide-neutral-900 font-semibold text-zinc-400">
                {orders.map((order, idx) => {
                  const dateStr = order.created_at
                    ? new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                    : new Date().toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    });

                  return (
                    <tr key={order.id || idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-center text-zinc-650">#{order.id}</td>
                      <td className="p-4">
                        <p className="font-bold text-white">{order.fullname || 'Anonymous'}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{order.email}</p>
                      </td>
                      <td className="p-4 text-white font-bold">{order.product_name}</td>
                      <td className="p-4 text-right font-bold text-white">₹{order.amount}</td>
                      <td className="p-4 text-center text-zinc-500">
                        <div className="flex items-center justify-center gap-1">
                          <Calendar size={12} />
                          {dateStr}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <div className="relative w-32">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="w-full appearance-none bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:border-[#F23F0C] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-xl cursor-pointer focus:outline-none transition-colors pr-8"
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-zinc-500">
                              <ChevronDown size={14} strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <AnimatedButton
                          onClick={() => handleSaveStatus(order.id, order.status)}
                          disabled={updatingIds[order.id]}
                          className="inline-flex items-center gap-1 bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl px-3.5 py-2 text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer disabled:opacity-50 border border-transparent shadow-lg shadow-orange-500/10"
                        >
                          <Save size={10} />
                          {updatingIds[order.id] ? 'Saving...' : 'Save'}
                        </AnimatedButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-zinc-500 font-bold">No orders recorded in the system</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
