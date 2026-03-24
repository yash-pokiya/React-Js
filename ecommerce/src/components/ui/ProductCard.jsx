import { ArrowUpRight } from "lucide-react";

const ProductCard = ({productData}) => {
  return (
    <>
      <div className="card bg-[#b08968] mx-2 my-2 rounded-4xl p-2 w-full max-w-sm overflow-hidden shadow-2xl relative">
        <img
          src={productData.images[0]}
          alt="producat image"
          className="w-full h-84 object-cover bg-white/70 rounded-3xl"
        />

        <div className="content px-4 py-3">
          <p className="font-bold text-lg text-[#7f5539] mb-2">
            {productData.category}
          </p>
          <h1 className="font-semibold text-lg text-white">
            {productData.title}
          </h1>
          <p className="text-white/70 font-medium mb-2 text-sm h-26">
           {productData.description}
          </p>

          <div className="price flex items-center justify-between py-2">
            <h1 className="rounded-full bg-gray-200 px-3 py-1 font-bold">
              ${productData.price}
            </h1>
            <div className="flex items-center justify-between bg-[#ede0d4] text-[#7f5539] font-bold rounded-full p-1 gap-2">
              <button className="ml-2">Buy Now </button>
              <ArrowUpRight className="p-0.5 bg-[#7f5539] text-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
 