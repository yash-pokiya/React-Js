import React, { useState } from 'react';

const ChatGpt = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="w-full relative z-50" aria-label="Main Navigation">
      {/* Main Navbar bar — pill shape, exactly like photo */}
      <div className="border border-gray-200 bg-gray-100 rounded-full shadow-sm px-4 py-3">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Brand / Logo with music icon - exact match to photo */}
          <div className="flex items-center px-3 py-2 justify-center rounded-full shadow-md bg-gray-200/90 gap-1.5 shrink-0 cursor-pointer select-none hover:bg-gray-300 transition">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-black text-white shrink-0">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 13V3h2l4 7V3h2v10h-2L4 6v7H2z" fill="white" />
                <path d="M11 3h3M12.5 3v3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-black text-base tracking-tight text-gray-900">nitec.</span>
          </div>

          {/* Search Bar — inline pill, matches photo exactly */}
          <div className="hidden md:flex flex-1 max-w-sm">
            <div className="flex items-center bg-white rounded-full py-2 pl-5 pr-1.5 gap-1 w-full ring-1 ring-gray-200/70 focus-within:ring-gray-300 transition">
              <label htmlFor="desktop-search" className="sr-only">Search products</label>
              <input
                id="desktop-search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400 py-0.5"
              />
              <button
                type="button"
                aria-label="Submit Search"
                className="bg-black hover:bg-gray-800 active:scale-95 h-8 w-8 flex justify-center items-center text-white rounded-full transition-all shrink-0 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden md:block" />

          {/* Right-side action icons — exactly as photo */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Shopping Bag / Cart — outline circle */}
            <button
              aria-label="Shopping Cart"
              className="w-9 h-9 border border-gray-300 bg-white hover:bg-gray-50 transition-colors rounded-full flex items-center justify-center focus:outline-none shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>

            {/* Heart / Wishlist — filled red heart exactly like photo */}
            <button
              aria-label="Wishlist"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-red-500 fill-red-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            {/* User Pill — Ryman Alex with avatar */}
            <button
              aria-label="User Menu"
              className="flex items-center gap-2 bg-white hover:bg-gray-100 transition-all pl-3 pr-1 py-1 rounded-full border border-gray-200 shadow-sm focus:outline-none"
            >
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">Suzuki Hayatox</span>
              <img
                src="https://i.pinimg.com/736x/e7/89/5d/e7895d10b7982fc2141f9b83788fc6d1.jpg"
                alt="Ryman Alex"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
              />
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white/98 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl px-5 py-5 flex flex-col gap-5 transition-all duration-200">
          {/* Mobile Search Bar */}
          <div className="flex items-center w-full bg-gray-100 rounded-full py-2 pl-5 pr-1.5 gap-2 ring-1 ring-gray-200">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-500"
            />
            <button aria-label="Search" className="bg-black text-white p-2 rounded-full shrink-0 w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex items-center justify-around gap-4 border-b border-gray-100 pb-3">
            <button className="flex items-center gap-3 text-gray-800 text-sm font-medium">
              <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span>Cart</span>
            </button>
            <button className="flex items-center gap-3 text-gray-800 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 fill-red-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Saved</span>
            </button>
          </div>

          {/* Mobile User Profile */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-3 rounded-xl">
            <img
              src="https://i.pinimg.com/736x/e7/89/5d/e7895d10b7982fc2141f9b83788fc6d1.jpg"
              alt="Ryman Alex"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm font-bold text-gray-900">Ryman Alex</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ChatGpt;