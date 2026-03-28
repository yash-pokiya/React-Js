import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import DealCard from "../ui/DealCard";

const DealBar = () => {
  const [deal, setDeal] = useState([]);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        let response = await axios.get(
          "https://dummyjson.com/products?limit=10&skip=5",
        );
        console.log(response.data.products);
        setDeal(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeal();
  }, []);

  return (
    <>
      <section className="px-10 w-[80%] mx-auto">
        <div className="flex flex-col  justify-between my-6">
          <h3 className="text-lg font-normal">Today Deals</h3>
          <div className="my-6 flex items-center justify-between">
            <h1 className="font-semibold text-3xl">Deals Of the Day</h1>
            <p className="text-md text-gray-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              

              dolor sit, amet consectetur adipisicing.
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 my-6">
          {deal.map((data) => {
            return (
              <Link to={`/product/${data.id}`} key={data.id}>
                <DealCard productData={data} />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default DealBar;
 