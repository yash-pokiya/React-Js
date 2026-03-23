import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <section className="flex items-center justify-center h-screen w-full flex-col gap-y-4 ">
        <h1 className="text-9xl font-bold">Product</h1>
        <Link to="/product/collection">
            <button className="bg-black text-white px-4 py-2 text-center rounded-full">Go To Collection</button>
        </Link>
      </section>
    </>
  );
};

export default Product;
