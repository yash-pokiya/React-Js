import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Spinner from '../components/Spinner';
import AnimatedButton from '../components/AnimatedButton';
import ProductImage from '../components/ProductImage';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tbodyRef] = useAutoAnimate();
  const [mobileListRef] = useAutoAnimate();

  const getLocalStorageQtyKey = (productId) => {
    return `cart_qty_${user?.id || 'guest'}_${productId}`;
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await api.get('/cart/view-cart');
      const items = response.data.cart || [];

      // Merge with localStorage quantities since backend SELECT query lacks quantity field
      const processedItems = items.map((item) => {
        const key = getLocalStorageQtyKey(item.productId);
        const localQty = localStorage.getItem(key);
        const quantity = localQty ? parseInt(localQty, 10) : (item.quantity || 1);

        if (!localQty) {
          localStorage.setItem(key, quantity);
        }

        return {
          ...item,
          quantity,
        };
      });

      // Filter out duplicate productIds if any are returned due to multiple row inserts
      const uniqueItems = [];
      const seen = new Set();
      for (const item of processedItems) {
        if (!seen.has(item.productId)) {
          seen.add(item.productId);
          uniqueItems.push(item);
        } else {
          // If duplicate product rows are found, combine their quantities
          const existing = uniqueItems.find((u) => u.productId === item.productId);
          if (existing) {
            existing.quantity += item.quantity;
            localStorage.setItem(getLocalStorageQtyKey(item.productId), existing.quantity);
          }
        }
      }

      setCartItems(uniqueItems);
    } catch (err) {
      if (err !== 'cart already clear..!') {
        toast.error(err || 'Failed to fetch cart');
      }
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleUpdateQty = async (productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    try {
      await api.put('/cart/update', { productId, quantity: newQty });
      localStorage.setItem(getLocalStorageQtyKey(productId), newQty);

      setCartItems((prev) =>
        prev.map((item) => (item.productId === productId ? { ...item, quantity: newQty } : item))
      );

      toast.success('Quantity updated');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      toast.error(err || 'Failed to update quantity');
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const response = await api.delete(`/cart/delete/${productId}`);
      localStorage.removeItem(getLocalStorageQtyKey(productId));

      setCartItems((prev) => prev.filter((item) => item.productId !== productId));

      toast.success(response.data.msg || 'Item removed from cart');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      toast.error(err || 'Failed to delete item');
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await api.delete('/cart/clear');

      cartItems.forEach((item) => {
        localStorage.removeItem(getLocalStorageQtyKey(item.productId));
      });

      setCartItems([]);
      toast.success(response.data.msg || 'Cart cleared successfully');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      toast.error(err || 'Failed to clear cart');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { checkoutItems: cartItems } });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return (
    <div className="py-32 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 min-h-screen text-primary bg-surface">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Shopping Cart
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1.5">
          Manage items you want to buy
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Table (Desktop) / Cards (Mobile) */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-default overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-default bg-surface-secondary text-muted text-[10px] font-bold uppercase tracking-widest">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6 text-right">Price</th>
                    <th className="py-4 px-6 text-center">Quantity</th>
                    <th className="py-4 px-6 text-right">Total</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody ref={tbodyRef} className="divide-y divide-[var(--color-border)] text-sm">
                  {cartItems.map((item) => (
                    <tr key={item.productId} className="hover:bg-[var(--color-hover-subtle)] transition-colors">
                      <td className="py-4 px-6">
                        <Link to={`/product/${item.productId}`} className="flex items-center gap-4 group">
                          <div className="w-12 h-12 bg-surface-secondary border border-default rounded-lg flex-shrink-0 relative overflow-hidden">
                            <ProductImage
                              imageUrl={item.imageUrl || item.image_url || item.image}
                              productName={item.product_name}
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-primary group-hover:text-[#F23F0C] transition-colors block">
                              {item.product_name}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-right font-medium text-primary">
                        ₹{item.price}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center border border-default rounded-lg bg-surface-secondary overflow-hidden">
                            <AnimatedButton
                              onClick={() => handleUpdateQty(item.productId, item.quantity, -1)}
                              className="p-1.5 text-secondary hover:text-primary transition-colors cursor-pointer bg-surface-secondary"
                            >
                              <Minus size={12} />
                            </AnimatedButton>
                            <span className="w-8 text-center text-xs font-bold text-primary">
                              {item.quantity}
                            </span>
                            <AnimatedButton
                              onClick={() => handleUpdateQty(item.productId, item.quantity, 1)}
                              className="p-1.5 text-secondary hover:text-primary transition-colors cursor-pointer bg-surface-secondary"
                            >
                              <Plus size={12} />
                            </AnimatedButton>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-primary">
                        ₹{item.price * item.quantity}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center">
                          <AnimatedButton
                            onClick={() => handleDeleteItem(item.productId)}
                            className="p-2 border border-default hover:border-red-500/30 hover:bg-red-500/10 text-secondary hover:text-red-400 rounded-lg transition-all duration-200 cursor-pointer bg-surface-secondary"
                          >
                            <Trash2 size={14} />
                          </AnimatedButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div ref={mobileListRef} className="sm:hidden divide-y divide-[var(--color-border)]">
              {cartItems.map((item) => (
                <div key={item.productId} className="p-4 flex gap-4">
                  <div className="w-16 h-16 bg-surface-secondary border border-default rounded-lg flex-shrink-0 relative overflow-hidden">
                    <ProductImage
                      imageUrl={item.imageUrl || item.image_url || item.image}
                      productName={item.product_name}
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <Link to={`/product/${item.productId}`} className="font-semibold text-primary hover:text-[#F23F0C] text-sm line-clamp-1">
                        {item.product_name}
                      </Link>
                      <AnimatedButton
                        onClick={() => handleDeleteItem(item.productId)}
                        className="text-muted hover:text-red-400 p-1 bg-transparent"
                      >
                        <Trash2 size={14} />
                      </AnimatedButton>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-secondary">₹{item.price} each</span>
                      <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-default rounded-lg bg-surface-secondary overflow-hidden">
                        <AnimatedButton
                          onClick={() => handleUpdateQty(item.productId, item.quantity, -1)}
                          className="p-1.5 text-secondary hover:text-primary cursor-pointer bg-surface-secondary"
                        >
                          <Minus size={10} />
                        </AnimatedButton>
                        <span className="w-6 text-center text-xs font-bold text-primary">
                          {item.quantity}
                        </span>
                        <AnimatedButton
                          onClick={() => handleUpdateQty(item.productId, item.quantity, 1)}
                          className="p-1.5 text-secondary hover:text-primary cursor-pointer bg-surface-secondary"
                        >
                          <Plus size={10} />
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart link */}
            <div className="p-4 bg-surface-secondary border-t border-default flex justify-end">
              <AnimatedButton
                onClick={handleClearCart}
                className="text-xs font-bold text-red-400 hover:text-red-300 hover:underline cursor-pointer bg-transparent"
              >
                Clear Cart
              </AnimatedButton>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-card rounded-2xl border border-default p-6 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Order Summary
            </h3>

            <div className="divide-y divide-[var(--color-border)] text-xs font-semibold text-secondary space-y-3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span className="text-primary font-bold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span className="text-primary font-bold">FREE</span>
              </div>
              <div className="flex justify-between py-3 text-sm font-bold text-primary">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <AnimatedButton
              onClick={handleCheckout}
              className="w-full bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl py-3.5 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-transparent shadow-lg shadow-orange-500/10"
            >
              Proceed to Checkout
              <ArrowRight size={14} />
            </AnimatedButton>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-card border border-default p-8 space-y-6 rounded-2xl">
          <div className="w-16 h-16 bg-surface-secondary border border-default text-primary flex items-center justify-center mx-auto rounded-xl">
            <ShoppingBag size={24} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-primary">
              Your cart is empty
            </h2>
            <p className="text-xs text-secondary max-w-xs mx-auto">
              Add items to your cart to start shopping.
            </p>
          </div>
          <AnimatedButton
            onClick={() => navigate('/')}
            className="inline-block bg-white hover:bg-zinc-200 text-black rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Browse Products
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};

export default Cart;
