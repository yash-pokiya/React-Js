import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart, ShoppingBag, Plus, Minus, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import StarRating from '../components/StarRating';
import Spinner from '../components/Spinner';
import ProductImage from '../components/ProductImage';
import AnimatedButton from '../components/AnimatedButton';
import { motion } from 'framer-motion';

const detailsVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [wishlistIds, setWishlistIds] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Fetch product info
        const prodRes = await api.get(`/product/get/${id}`);
        const prodData = Array.isArray(prodRes.data.products)
          ? prodRes.data.products[0]
          : prodRes.data.products;

        if (!prodData) {
          toast.error('Product not found');
          navigate('/');
          return;
        }
        setProduct(prodData);

        // Fetch reviews
        try {
          const reviewsRes = await api.get(`/review/product/all/${id}`);
          const reviewList = reviewsRes.data.reviews || [];
          setReviews(reviewList);

          if (reviewList.length > 0) {
            setAvgRating(reviewList[0].average_rating || 0);
          }
        } catch (e) {
          setReviews([]);
          setAvgRating(0);
        }

        // Fetch wishlist status
        if (isLoggedIn) {
          try {
            const wishlistRes = await api.get('/wishlist/see');
            const wishlistItems = wishlistRes.data.wishlist || [];
            setWishlistIds(wishlistItems.map((item) => item.product_id));
          } catch (e) {
            setWishlistIds([]);
          }
        }
      } catch (err) {
        toast.error(err || 'Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, isLoggedIn, navigate]);

  const handleQtyChange = (val) => {
    const newQty = quantity + val;
    if (newQty >= 1 && newQty <= (product?.stock || 99)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to add to cart');
      navigate('/login');
      return;
    }
    try {
      const response = await api.post('/cart/add', { productId: product.id, quantity });
      toast.success(response.data.msg || 'Added to cart successfully');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      toast.error(err || 'Failed to add to cart');
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      toast.error('Please login to buy');
      navigate('/login');
      return;
    }
    navigate('/checkout', {
      state: {
        checkoutItems: [
          {
            productId: product.id,
            product_name: product.product_name,
            price: product.price,
            quantity: quantity,
          },
        ],
      },
    });
  };

  const handleToggleWishlist = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to wishlist');
      navigate('/login');
      return;
    }
    const isWishlisted = wishlistIds.includes(product.id);

    try {
      if (isWishlisted) {
        const response = await api.delete(`/wishlist/remove/${product.id}`);
        toast.success(response.data.msg || 'Removed from wishlist');
        setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      } else {
        const response = await api.post(`/wishlist/add/${product.id}`);
        toast.success(response.data.msg || 'Added to wishlist');
        setWishlistIds((prev) => [...prev, product.id]);
      }
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (err) {
      toast.error(err || 'Failed to update wishlist');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Please login to submit reviews');
      navigate('/login');
      return;
    }
    if (!rating) {
      toast.error('Please choose a star rating');
      return;
    }
    setSubmittingReview(true);
    try {
      const response = await api.post(`/review/product/${product.id}`, {
        rating,
        review: reviewText.trim() || null,
      });

      toast.success(response.data.msg || 'Review submitted successfully!');
      setReviewText('');

      const reviewsRes = await api.get(`/review/product/all/${product.id}`);
      const reviewList = reviewsRes.data.reviews || [];
      setReviews(reviewList);
      if (reviewList.length > 0) {
        setAvgRating(reviewList[0].average_rating || 0);
      }
    } catch (err) {
      toast.error(err || 'Failed to submit review. You can only submit one review per product.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return (
    <div className="py-32 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
  if (!product) return null;

  const isProductWishlisted = wishlistIds.includes(product.id);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-black min-h-screen text-white">
      {/* Product Detail Top */}
      <motion.div
        variants={detailsVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-zinc-950 rounded-2xl border border-neutral-900 p-6 sm:p-10"
      >
        {/* Left Side: Product Image Component */}
        <div className="w-full md:h-[480px] aspect-square md:aspect-auto overflow-hidden bg-neutral-900 border border-neutral-850 rounded-xl relative">
          <ProductImage
            imageUrl={product.imageUrl || product.image_url || product.image}
            productName={product.product_name}
            isDetail={true}
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-between py-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                {product.category || product.category_name || 'Category'}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${product.stock > 0
                  ? 'bg-neutral-900 border-neutral-850 text-white'
                  : 'bg-red-950/40 border-red-900/50 text-red-400'
                }`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {product.product_name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2">
              <StarRating rating={avgRating} size={16} />
              {reviews.length > 0 ? (
                <span className="text-xs font-semibold text-zinc-500">
                  ({avgRating} / 5 out of {reviews.length} reviews)
                </span>
              ) : (
                <span className="text-xs font-semibold text-zinc-500">
                  No reviews yet
                </span>
              )}
            </div>

            <p className="text-2xl font-bold text-white">
              ₹{product.price}
            </p>

            <div className="border-t border-neutral-900 pt-6 mt-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Description
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {product.description || 'No description available for this product.'}
              </p>
            </div>
          </div>

          <div className="space-y-6 border-t border-neutral-900 pt-6">
            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Quantity
                </span>
                <div className="flex items-center border border-neutral-800 rounded-xl bg-neutral-900 overflow-hidden">
                  <AnimatedButton
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer bg-neutral-900"
                  >
                    <Minus size={14} />
                  </AnimatedButton>
                  <span className="w-10 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <AnimatedButton
                    onClick={() => handleQtyChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer bg-neutral-900"
                  >
                    <Plus size={14} />
                  </AnimatedButton>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <AnimatedButton
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-grow flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all cursor-pointer border rounded-xl ${product.stock === 0
                    ? 'bg-neutral-950 border-neutral-900 text-zinc-650 cursor-not-allowed'
                    : 'bg-neutral-900 border-neutral-800 text-zinc-300 hover:text-white hover:border-neutral-700'
                  }`}
              >
                <ShoppingBag size={14} />
                Add to Cart
              </AnimatedButton>
              <AnimatedButton
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`flex-grow py-3.5 px-6 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer rounded-xl ${product.stock === 0
                    ? 'bg-neutral-950 border-neutral-900 text-zinc-650 cursor-not-allowed'
                    : 'bg-[#F23F0C] text-white hover:bg-orange-600 shadow-lg shadow-orange-500/10'
                  }`}
              >
                Buy Now
              </AnimatedButton>
            </div>

            {/* Wishlist Link */}
            <AnimatedButton
              onClick={handleToggleWishlist}
              className="flex items-center justify-center gap-2 w-full text-xs font-bold text-zinc-400 hover:text-white transition-all py-3 border border-neutral-850 hover:border-neutral-750 rounded-xl cursor-pointer bg-neutral-900/60"
            >
              <Heart size={14} className={isProductWishlisted ? 'fill-[#F23F0C] text-[#F23F0C]' : ''} />
              {isProductWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </AnimatedButton>
          </div>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <div className="bg-zinc-950 rounded-2xl border border-neutral-900 p-6 sm:p-10 space-y-8">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white mb-1">
            Customer Reviews
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            See what others say or leave your review
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review input form */}
          <div className="lg:col-span-1 border-r border-neutral-900 pr-0 lg:pr-8 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
              Write a Review
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-555 mb-2">
                  Rating
                </label>
                <StarRating rating={rating} onChange={setRating} size={24} />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-555 mb-2">
                  Review Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your thoughts about this product..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-sm focus:outline-none focus:border-[#F23F0C] focus:ring-1 focus:ring-[#F23F0C]/20 transition-all resize-none placeholder:text-zinc-650"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              <AnimatedButton
                type="submit"
                disabled={submittingReview}
                className="w-full bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl py-3.5 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send size={12} />
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </AnimatedButton>
            </form>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              All Reviews ({reviews.length})
            </h3>

            {reviews.length > 0 ? (
              <div className="space-y-4 divide-y divide-neutral-900 max-h-[400px] overflow-y-auto pr-2">
                {reviews.map((rev, idx) => (
                  <div key={idx} className={`${idx > 0 ? 'pt-4' : ''} space-y-2`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">
                        {rev.username || 'Anonymous'}
                      </span>
                      <StarRating rating={rev.rating} size={12} />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {rev.review || 'No review message provided.'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 bg-neutral-900/30 border border-dashed border-neutral-850 rounded-xl">
                <p className="text-xs text-zinc-555 font-semibold">
                  Be the first to review this product!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
