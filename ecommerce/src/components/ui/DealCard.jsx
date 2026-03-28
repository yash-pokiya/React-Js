import React from "react";
import { Heart } from "lucide-react";

const DealCard = ({ productData }) => {
  let discountPrice =
    productData.price -
    (productData.price * productData.discountPercentage) / 100;

  return (
    <div className="w-lg bg-white rounded-xl shadow-md p-4 flex gap-4 hover:shadow-lg transition duration-300 border border-gray-200">
      {/* Image Section */}
      <div className="relative bg-gray-100">
        <img
          src={productData.images?.[0]}
          alt="Dress"
          className="w-60 h-72 object-cover rounded-lg"
        />

        {/* Discount Badge */}
        <span className="absolute top-2 left-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-md font-semibold">
          {Math.floor(productData.discountPercentage)}% off
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1">
        {/* Top */}
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-sm text-gray-500">{productData.category}</h3>
            <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500" />
          </div>

          <h2 className="text-lg font-semibold mt-1">
            {productData.title.length > 16
              ? productData.title.slice(0, 16) + "..."
              : productData.title}
          </h2>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold">
              $ {discountPrice.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-sm">
              $ {productData.price}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="font-medium">{productData.rating}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-2">
            {productData.description.length > 50
              ? productData.description.slice(0, 50) + "..."
              : productData.description}
          </p>
        </div>

        {/* Button */}
        <button className="bottom-15 relative text-left text-[#582f0e] font-semibold">
          Shop Now →
        </button>
      </div>
    </div>
  );
};

export default DealCard;
 