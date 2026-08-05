import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductImage from './ProductImage';
import AnimatedButton from './AnimatedButton';

const ProductCard = ({
  product,
  isWishlistItem = false,
  onAddToCart = null,
  onRemoveFromWishlist = null,
  onMoveToCart = null,
  isWishlisted = false,
  onToggleWishlist = null,
}) => {
  const id = product.id || product.product_id;
  const name = product.product_name || product.productName;
  const price = product.price;
  const categoryName = product.category_name || product.category || 'Category';

  return (
    <div className="group relative bg-card border border-default flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-border-hover)] shadow-xl rounded-2xl h-full overflow-hidden">
      <Link to={`/product/${id}`} className="flex flex-col flex-grow p-4">
        {/* Image Area wrapped in Framer Motion fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="aspect-square overflow-hidden bg-surface-secondary mb-4 relative rounded-xl"
        >
          <ProductImage
            imageUrl={product.imageUrl || product.image_url || product.image}
            productName={name}
          />
        </motion.div>

        {/* Product Details */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-muted mb-1">
              {categoryName}
            </span>
            <h3 className="font-semibold text-primary text-sm mb-2 line-clamp-2 leading-snug group-hover:text-[#F23F0C] transition-colors">
              {name}
            </h3>
          </div>
          <span className="text-base font-bold text-primary">
            ₹{price}
          </span>
        </div>
      </Link>

      {/* Actions */}
      {isWishlistItem ? (
        <div className="p-4 pt-0 flex flex-col gap-2">
          <AnimatedButton
            onClick={(e) => {
              e.preventDefault();
              onMoveToCart && onMoveToCart(id);
            }}
            className="w-full bg-[#F23F0C] hover:bg-orange-600 text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer"
          >
            Move to Cart
          </AnimatedButton>
          <AnimatedButton
            onClick={(e) => {
              e.preventDefault();
              onRemoveFromWishlist && onRemoveFromWishlist(id);
            }}
            className="w-full text-muted hover:text-red-400 text-center transition-colors duration-150 text-xs font-semibold py-1.5 cursor-pointer"
          >
            Remove
          </AnimatedButton>
        </div>
      ) : (
        <div className="flex gap-2 p-4 pt-0">
          <AnimatedButton
            onClick={(e) => {
              e.preventDefault();
              onAddToCart && onAddToCart(id);
            }}
            className="flex-1 py-2.5 bg-surface-secondary hover:bg-[#F23F0C] text-secondary hover:text-white flex justify-center items-center rounded-xl transition-all duration-300 cursor-pointer border border-default hover:border-transparent"
            title="Add to Cart"
          >
            <ShoppingBag size={16} strokeWidth={2} />
          </AnimatedButton>
          <AnimatedButton
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist && onToggleWishlist(id);
            }}
            className="flex-1 py-2.5 bg-surface-secondary hover:bg-[var(--color-border)] text-secondary hover:text-[#F23F0C] flex justify-center items-center rounded-xl transition-all duration-300 cursor-pointer border border-default"
            title="Add to Wishlist"
          >
            <Heart
              size={16}
              strokeWidth={2}
              className={isWishlisted ? 'fill-[#F23F0C] text-[#F23F0C]' : ''}
            />
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
