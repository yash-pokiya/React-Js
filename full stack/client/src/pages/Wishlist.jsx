import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import AnimatedButton from '../components/AnimatedButton';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
};

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistRef] = useAutoAnimate();

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await api.get('/wishlist/see');
      setWishlistItems(response.data.wishlist || []);
    } catch (err) {
      if (err !== 'wishlist is empty') {
        toast.error(err || 'Failed to fetch wishlist');
      }
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await api.delete(`/wishlist/remove/${productId}`);
      toast.success(response.data.msg || 'Item removed from wishlist');
      setWishlistItems((prev) => prev.filter((item) => item.product_id !== productId));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (err) {
      toast.error(err || 'Failed to remove item');
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      // 1. Add to cart
      await api.post('/cart/add', { productId, quantity: 1 });

      // 2. Remove from wishlist
      await api.delete(`/wishlist/remove/${productId}`);

      // 3. Update state
      setWishlistItems((prev) => prev.filter((item) => item.product_id !== productId));

      toast.success('Moved to cart successfully');
      window.dispatchEvent(new Event('cart-updated'));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (err) {
      toast.error(err || 'Failed to move item to cart');
    }
  };

  if (loading) return (
    <div className="py-32 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-surface min-h-screen text-primary">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          My Wishlist
        </h1>
        <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1.5">
          Your saved items
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <motion.div
          ref={wishlistRef}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-transparent"
        >
          {wishlistItems.map((item) => (
            <motion.div key={item.product_id} variants={cardVariants}>
              <ProductCard
                product={item}
                isWishlistItem={true}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onMoveToCart={handleMoveToCart}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-24 bg-card border border-default p-8 space-y-6 rounded-2xl">
          <div className="w-16 h-16 bg-surface-secondary border border-default text-primary flex items-center justify-center mx-auto rounded-xl">
            <Heart size={24} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-primary">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-secondary max-w-xs mx-auto">
              Save items here to watch them or buy later.
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

export default Wishlist;
