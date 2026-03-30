import React from "react";
import { Link } from "react-router-dom";

// Simple inline SVGs for the feature section
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.536a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col justify-center items-center text-center px-6 pt-32 pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-gray-100 to-transparent rounded-full blur-3xl -z-10 opacity-70" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-600 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          Now live and shipping globally
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl">
          Redefining the way you <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500">
            shop online.
          </span>
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-500 leading-relaxed">
          Experience next-generation eCommerce with a seamless UI, premium curated products, and lightning-fast performance.
        </p>

        <Link to="/collection">
          <button className="mt-10 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black hover:scale-105 hover:shadow-xl transition-all duration-300">
            Explore The Store
          </button>
        </Link>
      </section>

      {/* SPLIT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div className="order-2 md:order-1 space-y-6 md:pr-10">
            <h2 className="text-4xl font-bold tracking-tight">Crafted for the modern consumer.</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are a modern eCommerce platform built with the MERN stack, meticulously focused on delivering a fast, smooth, and beautiful shopping experience from homepage to checkout.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is simple: cut through the noise. We connect users with premium products through a minimal and intuitive interface, making shopping feel less like a chore and more like a discovery.
            </p>
          </div>

          {/* IMAGE */}
          <div className="order-1 md:order-2 h-100 md:h-125 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&q=80"
              alt="Premium shopping bags"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* STATS SECTION - Dark Mode Container */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto bg-gray-900 text-white rounded-[2.5rem] py-16 px-10 grid md:grid-cols-3 gap-12 text-center shadow-lg">
          <div className="space-y-2">
            <h3 className="text-5xl font-bold">10K+</h3>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Happy Customers</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-5xl font-bold">500+</h3>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Curated Products</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-5xl font-bold">99%</h3>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* FEATURES - Bento Grid Style */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why shop with us?</h2>
            <p className="mt-4 text-gray-500">Everything you need, nothing you don't.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-gray-900">
                <ZapIcon />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Built on React & Node.js, our platform guarantees an incredibly responsive experience, so you never wait to check out.
              </p>
            </div>

            <div className="p-8 border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-gray-900">
                <ShieldIcon />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Checkout</h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level encryption ensures your payment data is completely isolated, safe, and secure with every transaction.
              </p>
            </div>

            <div className="p-8 border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-gray-900">
                <StarIcon />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                We don't sell everything. We only sell the best. Every product is vetted for quality, durability, and aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to upgrade your lifestyle?</h2>
          <p className="text-xl text-gray-500 mb-10">
            Join thousands of others discovering the future of online shopping today.
          </p>

          <Link to="/shop">
            <button className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              Start Shopping Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;