import { Star } from "lucide-react"; // Optional: Use any star icon library

const ProductCard = ({ product_data }) => {
  let discountPrice =
    product_data.price -
    (product_data.price * product_data.discountPercentage) / 100;

  return (
    <div className="max-w-75 bg-white group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#f3f3f3]">
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 shadow-sm">
          <span className="text-[#4db195] text-xs font-bold">
            {product_data.discountPercentage}% off
          </span>   
        </div>

        <img
          src={product_data.images?.[0]}
          alt="Classy Light Coat"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="pt-4 pb-2">
        <div className="flex justify-between items-center text-gray-400 text-sm">
          <span>{product_data.category}</span>
          <div className="flex items-center gap-1 text-black font-medium">
            <Star size={14} fill="#ffc107" stroke="none" />
            <span>{product_data.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mt-1">
          {product_data.title}
        </h3>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">
            ${discountPrice.toFixed(2)}
          </span>
          <span className="text-gray-400 line-through text-md">$ {product_data.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
 