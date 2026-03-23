import React from "react";
import Navbar from "./Layouts/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Collection from "./Pages/Collection";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Footer from "./Layouts/Footer";
import NotFound from "./Pages/NotFound";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/collection" element={<Collection/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
