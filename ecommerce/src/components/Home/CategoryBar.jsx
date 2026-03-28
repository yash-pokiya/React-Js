import React from "react";

const CategorySection = () => {
  return (
    <div className="max-w-[90%] md:max-w-[80%] min-h-screen flex items-center justify-center bg-white mx-auto p-6">
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full min-h-[83vh]">

        {/* Women's Section */}
        <div className="relative bg-[#f7f3ef] p-6 flex flex-col justify-between overflow-hidden">
          <div>
            <p className="text-md text-white bg-[#774936] px-4 py-2 inline-block rounded-full backdrop-blur-sm">2500+ Items</p>
            <h2 className="text-4xl font-semibold my-5">For Women’s</h2>
            <p className="text-gray-500 text-md my-4">
              Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do
            </p>

            <ul className="my-4 space-y-5 text-md text-gray-700">
              <li>Blazers</li>
              <li>T-Shirts and Blouses</li>
              <li>Dresses</li>
              <li>Jackets & Coats</li>
              <li>Jeans</li>
              <li>Knit</li>
              <li>Skirts</li>
            </ul>
          </div>

          <img
            src="/category/women.png"
            alt="women"
            className="absolute bottom-0 -right-30 w-[90%] rotate-y-180 object-contain"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">

          {/* Men's Section */}
          <div className="relative bg-[#f7f3ef] p-6 overflow-hidden">
            <p className="text-md text-white bg-[#774936] px-4 py-2 inline-block rounded-full backdrop-blur-sm my-2">1500+ Items</p>
            <h2 className="text-3xl font-semibold mt-1">For Men’s</h2>

            <ul className="mt-4 space-y-6 text-sm text-gray-700">
              <li>T-Shirts and Shirts</li>
              <li>Jackets & Coats</li>
              <li>Jeans</li>
              <li>Blazzers</li>
            </ul>

            <img
              src="/category/men.png"
              alt="men"
              className="absolute -right-20 bottom-0 w-[90%] object-contain rotate-y-180"
            />
          </div>

          {/* Accessories Section */}
          <div className="relative bg-[#f7f3ef] p-6 overflow-hidden">
            <p className="text-md text-white bg-[#774936] px-4 py-2 inline-block rounded-full backdrop-blur-sm my-4">800+ Items</p>
            <h2 className="text-3xl font-semibold mt-1">Accessories</h2>

            <ul className="mt-4 space-y-5 text-sm text-gray-700">
              <li>Handbags</li>
              <li>Watches</li>
              <li>Sunglasses</li>
              <li>Hats</li>
            </ul>

            <img
              src="/category/acc.png"
              alt="accessories"
              className="absolute -right-30 top-0 w-[80%] object-contain rotate-y-180"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategorySection;
 