import React, { useState } from "react";

// Inline SVGs for the contact cards
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5s
  };

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-gray-100 to-transparent rounded-full blur-3xl -z-10 opacity-70" />
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl">
          We're here to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500">
            help you.
          </span>
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-500 leading-relaxed">
          Have a question about an order, a product, or our return policy? Drop us a line and our team will get back to you as soon as possible.
        </p>
      </section>

      {/* MAIN CONTENT: GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12 mb-20">
        <div className="grid lg:grid-cols-5 gap-16">
          
          {/* LEFT: CONTACT INFO (Bento Box Style) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Get in touch</h2>
            
            {/* Call Us */}
            <div className="p-6 border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300 flex items-start gap-5">
              <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-900">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Call Us</h3>
                <p className="text-gray-600 mb-2">For urgent order inquiries.</p>
                <a href="tel:+18001234567" className="text-lg font-semibold hover:text-gray-500 transition-colors">
                  +1 (800) 123-4567
                </a>
              </div>
            </div>

            {/* Email Us */}
            <div className="p-6 border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300 flex items-start gap-5">
              <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-900">
                <EnvelopeIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Email Support</h3>
                <p className="text-gray-600 mb-2">We aim to reply within 24 hours.</p>
                <a href="mailto:support@yourstore.com" className="text-lg font-semibold hover:text-gray-500 transition-colors">
                  support@yourstore.com
                </a>
              </div>
            </div>

            {/* Returns / HQ */}
            <div className="p-6 border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300 flex items-start gap-5">
              <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-900">
                <MapPinIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Headquarters & Returns</h3>
                <p className="text-gray-600 leading-relaxed">
                  123 Commerce Avenue,<br />
                  Suite 400<br />
                  New York, NY 10012
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="p-6 border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300 flex items-start gap-5">
              <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-900">
                <ClockIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Support Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9AM - 6PM (EST)</p>
                <p className="text-gray-600">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100/50">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Send us a message</h2>
            
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-500">Thanks for reaching out. Our support team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      placeholder="Jane Doe"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      placeholder="jane@example.com"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject</label>
                    <select 
                      id="subject" 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all appearance-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="order">Where is my order?</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="product">Product Information</option>
                    </select>
                  </div>

                  {/* Order Number (Optional but crucial for E-commerce) */}
                  <div className="space-y-2">
                    <label htmlFor="orderId" className="text-sm font-semibold text-gray-700">Order Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      id="orderId" 
                      placeholder="#123456789"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    required
                    placeholder="How can we help you today?"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;