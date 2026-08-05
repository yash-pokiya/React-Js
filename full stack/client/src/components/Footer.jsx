import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-default mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & Desc */}
          <div className="space-y-4">
            <Link to="/" className="text-lg font-bold tracking-tight text-primary flex items-center gap-2">
              <div className="bg-[#F23F0C] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
                S
              </div>
              <span className="tracking-widest">SHOPVIBE</span>
            </Link>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              India's trendiest D2C e-commerce platform delivering high-quality products directly to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-muted hover:text-primary transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted hover:text-primary transition-colors duration-150">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted hover:text-primary transition-colors duration-150">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-muted">Email: support@shopvibe.com</span>
              </li>
              <li>
                <span className="text-muted">Phone: +91 98765 43210</span>
              </li>
              <li>
                <span className="text-muted">Hours: 9 AM - 6 PM (IST)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Notice */}
          <div>
            <h4 className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
              Secure Shopping
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Enjoy 100% secure payments, easy returns, and reliable support for a smooth e-commerce experience.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-default mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-muted font-medium">
          <p>© 2026 ShopVibe. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span className="hover:text-secondary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-secondary transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
