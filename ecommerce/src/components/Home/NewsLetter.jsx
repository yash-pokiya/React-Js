import { Mail } from "lucide-react";
import React from "react";

const Newsletter = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center text-center px-8 py-16">
        <p className="text-lg py-4">Our Newsletter</p>
        <h1 className="text-4xl font-medium py-4 leading-normal">
          Subscribe to Our Newsletter to Get
          

          Updates to Our Latest Collection
        </h1>
        <p className="text-gray-500 py-4">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>

        {/* input bar for email */}
        <div className="flex items-center justify-center gap-2 py-10">
          <div className="flex items-center  gap-x-4 border border-gray-200 p-1.5 w-150">
            <div className="bg-orange-400 p-1.5 rounded-xl">
              <Mail className="text-white w-10 h-10" />
            </div>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full outline-none text-lg"
            />
          </div>

          <button className="bg-[#582f0e] text-white px-8 py-5 font-medium text-xl">
            Subscribe
          </button>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
 