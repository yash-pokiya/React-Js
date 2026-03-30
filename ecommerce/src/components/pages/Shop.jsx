import { SearchIcon } from "lucide-react";
import Product from "./Product";
import ProductCard from "../ui/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const Shop = () => {
  const [products, setProducts] = useState([]);
const params = useParams()

  useEffect(() => {
    const FetchAllProducts = async () => {
    if (params.collection) {
        try {
        let responce = await axios.get(`https://dummyjson.com/products/category/${params.collection}`);
        console.log(responce.data.products);
        setProducts(responce.data.products);
      } catch (error) {
        console.log(error);
      }
    } else {
        try {
        let responce = await axios.get(`https://dummyjson.com/products`);
        console.log(responce.data.products);
        setProducts(responce.data.products);
      } catch (error) {
        console.log(error);
      }
    }
    };
    FetchAllProducts();
  }, []);

  return (
    <>
      <section>
        {/* title bar */}
        <div className="bg-gray-100 w-full py-10 text-center">
          <h1 className="text-5xl font-semibold py-4">Shop</h1>
          <p className="text-lg font-medium text-gray-500">Home / Shop</p>
        </div>

        {/* filter and products */}
        <div className="py-10 ">
          {/* filter and search */}
          <div className="flex items-center justify-center gap-4">
            {/* search bar */}
            <div className="w-3/4 flex items-center border border-red-950 px-2 py-4 gap-4 rounded-full">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search Products..."
                className="outline-none text-md w-full"
              />
            </div>
            {/* filter */}
            <div className="1/4 bg-red-950  text-white px-6 py-4 rounded-full ml-4">
              <select className="bg-red-950 text-white w-full outline-none">
                <option value="" className="bg-red-950 text-white mt-3 w-full rounded-full " >Default</option>
                <option value="" className="bg-red-950 text-white mt-3 w-full rounded-full" >A to Z</option>
                <option value="" className="bg-red-950 text-white mt-3 w-full rounded-full" >Z to A</option>
              </select>
            </div>
          </div>

          {/* product div */}
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
              {products.map((data) => {
                return (
                  <Link to={`products/${data.id}`} key={data.id}>
                    <ProductCard product_data={data} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
