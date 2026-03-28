import React from "react";

const DeatilsBar = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-20 py-10 ">
        {/* icon 1 */}
        <div className="flex items-center justify-center gap-4">
          {/* svg */}
          <div className="w-24 overflow-hidden p-3">
            <img
              src="/icons/01.png"
              alt="cart"
              className="w-full h-full object-cover"
            />
          </div>
          {/* info */}
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold text-xl">Free Shipping</h3>
            <p className="text-gray-400 font-medium">
              Free shipping for order above $180
            </p>
          </div>
        </div>

        {/* icon 2 */}
        <div className="flex items-center justify-center gap-4">
          {/* svg */}
          <div className="w-24 overflow-hidden p-3">
            <img
              src="/icons/02.png"
              alt="cart"
              className="w-full h-full object-cover"
            />
          </div>
          {/* info */}
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold text-xl">Flexible Payment</h3>
            <p className="text-gray-400 font-medium">Multiple secure payment options</p>
          </div>
        </div>

        {/* icon 3 */}
        <div className="flex items-center justify-center gap-4">
          {/* svg */}
          <div className="w-24 overflow-hidden p-3">
            <img
              src="/icons/03.png"
              alt="cart"
              className="w-full h-full object-cover"
            />
          </div>
          {/* info */}
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold text-xl">24x7 Support</h3>
            <p className="text-gray-400 font-medium">
              We support online all days
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeatilsBar;
 