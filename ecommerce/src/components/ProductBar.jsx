import React, { useEffect, useState } from "react";
import ProductCard from "./ui/ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { Key } from "lucide-react";
const ProductBar = () => {
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get(
          "https://dummyjson.com/products?limit=4",
        );
        setProduct(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <section className="p-6 px-24 flex flex-col justify-center">
        <div className="w-full md:my-8 my-4">
          <h3 className="text-xl md:text-lg text-gray-400 font-semibold">Our Products</h3>
          <div className="max-md:flex-col flex items-center justify-between">
            <h1 className="text-2xl  md:text-5xl  md:py-2 text-nowrap  max-md:pb-4 max-md:text-center font-bold">Our top seller products </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="px-3 py-1 me-1   text-white bg-[#583101] font-medium text-md inline-block ">All </div>
              <div className="px-3 py-1 border border-[#583101] font-medium text-md inline-block ">Women</div>
              <div className="px-3 py-1 border border-[#583101] font-medium text-md inline-block ">Men</div>
              <div className="px-3 py-1 border border-[#583101] font-medium text-md inline-block ">Accessories</div>
            </div>
          </div>
        </div>
        {/* product cards  */}
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {Product.map((data) => {
            console.log(data);
            return (
              <Link to={`/product/${data.id}`} key={data.id}>
                <ProductCard product_data={data} />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ProductBar;
