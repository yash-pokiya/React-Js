import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Search, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import AnimatedButton from "../components/AnimatedButton";
import BorderBeam from "../components/BorderBeam";
import SlidingLogoMarquee from "../components/SlidingLogoMarquee";
import CursorImageTrail from "../components/CursorImageTrail";
import { EncryptedText } from "../components/ui/encrypted-text";
import SplitText from "../components/SplitText";
import TextType from "../components/TextType";
const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesRes = await api.get("/category/categories");
        setCategories(categoriesRes.data.categories || []);

        const productsRes = await api.get("/product/all");
        setProducts(
          productsRes.data.product || productsRes.data.products || [],
        );

        if (isLoggedIn) {
          try {
            const wishlistRes = await api.get("/wishlist/see");
            const wishlistItems = wishlistRes.data.wishlist || [];
            setWishlistIds(wishlistItems.map((item) => item.product_id));
          } catch (e) {
            setWishlistIds([]);
          }
        }
      } catch (err) {
        toast.error(err || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  // Filter products by category
  const filteredProducts = activeCategory
    ? products.filter(
        (prod) =>
          String(prod.category_id) === String(activeCategory) ||
          (prod.category && String(prod.category) === String(activeCategory)),
      )
    : products;

  const handleCategorySelect = (categoryId) => {
    if (categoryId === "") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      toast.error("Please login first to add products to cart");
      navigate("/login");
      return;
    }
    try {
      const response = await api.post("/cart/add", { productId, quantity: 1 });
      toast.success(response.data.msg || "Added to cart successfully");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    }
  };

  const handleToggleWishlist = async (productId) => {
    if (!isLoggedIn) {
      toast.error("Please login first to wishlist products");
      navigate("/login");
      return;
    }
    const isAlreadyWishlisted = wishlistIds.includes(productId);

    try {
      if (isAlreadyWishlisted) {
        const response = await api.delete(`/wishlist/remove/${productId}`);
        toast.success(response.data.msg || "Removed from wishlist");
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
      } else {
        const response = await api.post(`/wishlist/add/${productId}`);
        toast.success(response.data.msg || "Added to wishlist");
        setWishlistIds((prev) => [...prev, productId]);
      }
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      toast.error(err || "Failed to update wishlist");
    }
  };

  const logoItems = [
    {
      id: "logo-1",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      id: "logo-2",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      ),
    },
    {
      id: "logo-3",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      id: "logo-4",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
          <path d="M12 15v5" />
          <path d="M9 18h6" />
        </svg>
      ),
    },
    {
      id: "logo-5",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      id: "logo-6",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      ),
    },
    {
      id: "logo-7",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      id: "logo-8",
      content: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-white"
        >
          <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
          <path d="M12 15v5" />
          <path d="M9 18h6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full bg-surface min-h-screen text-primary pb-20">
      {/* Immersive Rounded Hero Box (Adapted from Hero02) */}
      <div
        ref={heroRef}
        className="relative w-full max-w-7xl min-h-[85vh] overflow-hidden bg-black text-white rounded-[32px] p-6 md:p-10 flex flex-col justify-between mx-auto mt-4 cursor-default"
      >
        <CursorImageTrail targetRef={heroRef} />

        {/* Background video + dark tint */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-[32px]"
          >
            <source
              src="https://res.cloudinary.com/deewkavph/video/upload/v1782453380/From_Klickpin.com-_Inspired_hidden_country_gems_with_simple_charm_and_useful_ideas_for_busy_days_for_travel_lovers-pin-id-826762444094684493_ds8tva.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60 rounded-[32px] backdrop-blur-[1px]" />
        </div>

        {/* Floating Top Spacing for Navbar overlay compatibility */}
        <div className="h-16 relative z-10" />

        {/* Hero Central Content */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="show"
          className="relative flex flex-col justify-center items-center text-center flex-grow px-4 mt-8 md:mt-16 z-10"
        >
          <motion.span
            variants={heroItem}
            className="text-[10px] font-bold uppercase tracking-widest text-[#F23F0C] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
          >
            Exclusively Curated Style
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl tracking-tight text-white"
          >
            <SplitText
              text=" Modern Living for"
              className="text-4xl font-semibold text-center"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              showCallback
            />
            <br />
            <SplitText
              text=" Minimalist Lovers "
              className="text-5xl font-semibold text-center"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              showCallback
            />
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 text-sm md:text-base text-zinc-300 max-w-md leading-relaxed"
          >
            <TextType
              text={`Experience ultimate aesthetics with our collection of serene and
            tranquil spaces. No clutter. Minimal prices.`}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="▎"
              deletingSpeed={55}
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.3}
            />
          </motion.p>

          <motion.div variants={heroItem} className="mt-4">
            <p className="mx-auto max-w-lg pt-4 pb-2 text-center text-xl font-medium tracking-wide">
              <EncryptedText
                text="Welcome to the shop."
                encryptedClassName="text-neutral-500"
                revealedClassName="text-white"
                revealDelayMs={50}
              />
            </p>
          </motion.div>

          <motion.div variants={heroItem} className="mt-6">
            <AnimatedButton
              onClick={() =>
                document
                  .getElementById("products-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-2xl hover:scale-[1.03] cursor-pointer"
            >
              Explore Collection
              <ArrowUpRight className="w-4 h-4" />
            </AnimatedButton>
          </motion.div>

          {/* Sliding Logo Marquee */}
          <motion.div variants={heroItem} className="mt-16 w-full max-w-5xl">
            <SlidingLogoMarquee
              items={logoItems}
              speed={30}
              height="80px"
              blurIntensity={0.5}
              showControls={false}
              enableBlur={true}
              backgroundColor="transparent"
              className="text-white"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Main product filtering and listing area */}
      <div
        id="products-section"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 space-y-16"
      >
        <hr className="border-t border-neutral-900" />

        {/* Category filter pills */}
        <div className="space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <AnimatedButton
              onClick={() => handleCategorySelect("")}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
                activeCategory === ""
                  ? "bg-[#F23F0C] text-white border-[#F23F0C] shadow-lg"
                  : "bg-card border-default text-secondary hover:text-primary hover:border-[var(--color-border-hover)]"
              }`}
            >
              All Products
            </AnimatedButton>
            {categories.map((cat) => (
              <AnimatedButton
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
                  String(activeCategory) === String(cat.id)
                    ? "bg-[#F23F0C] text-white border-[#F23F0C] shadow-lg"
                    : "bg-card border-default text-secondary hover:text-primary hover:border-[var(--color-border-hover)]"
                }`}
              >
                {cat.category_name}
              </AnimatedButton>
            ))}
          </div>
        </div>

        {/* Product list grid */}
        {loading ? (
          <div className="py-20">
            <Spinner />
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            key={activeCategory} // Force animation re-trigger on category select
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-transparent"
          >
            {filteredProducts.map((prod) => (
              <motion.div key={prod.id} variants={cardVariants}>
                <ProductCard
                  product={prod}
                  isWishlisted={wishlistIds.includes(prod.id)}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="max-w-xs mx-auto py-20 text-center">
            <Search size={40} strokeWidth={1} className="text-muted mx-auto" />
            <h3 className="text-base font-semibold text-primary mt-4">
              No products found
            </h3>
            <p className="text-sm text-secondary mt-1">
              There are no products available in this category.
            </p>
            <AnimatedButton
              onClick={() => handleCategorySelect("")}
              className="mt-6 bg-[#F23F0C] hover:bg-orange-600 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer"
            >
              Clear Filters
            </AnimatedButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
