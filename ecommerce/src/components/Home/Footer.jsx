import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#2E180D] text-[#B09783] font-sans pt-16 pb-8 px-6 md:px-12 lg:px-24">
        {/* Top Grid Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Description (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 pr-0 lg:pr-10">
            {/* Logo */}
            <div className="flex items-center gap-x-4 mb-4">
              <img src="/logo.png" alt="logo" className="w-10 object-cover" />
              <h1 className="font-bold text-xl">Shopping.</h1>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                // Facebook Icon Path
                "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                // Blogger/Hash Alternate Icon Path
                "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
                // YouTube Icon Path
                "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2C1 8.16 1 12 1 12s0 3.84.46 5.58a2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 001.94-2C23 15.84 23 12 23 12s0-3.84-.46-5.58zM9.5 15.5v-7l6.5 3.5-6.5 3.5z",
                // Twitter Icon Path
                "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                // Instagram Icon Path
              ].map((path, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#4A2D1A] flex items-center justify-center hover:bg-[#E5B96F] hover:text-[#2E180D] transition-colors duration-300 text-white"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={path}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-medium mb-6">Company</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Our Information Links */}
          <div>
            <h3 className="text-white font-medium mb-6">Our Information</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  User Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-6">Contact Info</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>+0123-456-789</li>
              <li>example@gmail.com</li>
              <li className="leading-relaxed">
                8502 Preston Rd.
                

                Inglewood, Maine
                

                98380
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider & Copyright Section */}
        <div className="max-w-7xl mx-auto border-t border-[#4A2D1A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>Copyright © 2024 Shopping Website Design. All Rights Reserved.</p>

          {/* Language & Currency Selectors */}
          <div className="flex gap-6 items-center">
            <button className="flex items-center gap-2 hover:text-white transition">
              English
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <span className="text-[#4A2D1A]">|</span>
            <button className="flex items-center gap-2 hover:text-white transition">
              USD
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
 