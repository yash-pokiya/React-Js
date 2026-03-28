import React from "react";
import ProductBar from "../ProductBar";
import Hero from "../Home/Hero";
import DeatilsBar from "../Home/DetailBar";
import CategorySection from "../Home/CategoryBar";
import Offer from "../Home/Offer";
import DealBar from "../Home/DealBar";
import DiscontBar from "../Home/DiscountBar";
import Newsletter from "../Home/NewsLetter";
const Home = () => {
  return (
    <>
      <section>
        <div className="">
          <Hero/>
          <DeatilsBar />
          <CategorySection />
          <ProductBar />
          <Offer />
          <DealBar />
          <DiscontBar />
          <Newsletter />
        </div>
      </section>
    </>
  );
};

export default Home;
