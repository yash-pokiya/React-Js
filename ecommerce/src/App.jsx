import React from 'react'
import Home from './components/pages/Home'
import { Route, Routes } from 'react-router-dom'
import Product from './components/pages/Product'
import Footer from './components/Home/Footer'
import Navbar from './layouts/NavBar'
import Shop from './components/pages/Shop'
import Collection from './components/pages/Collection'
import AboutUs from './components/pages/AboutUs'
import ContactUs from './components/pages/ContactUs'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/shop/:collection' element={<Shop/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/about' element={<AboutUs/>}/> 
      <Route path='/contact' element={<ContactUs/>}/> 

    </Routes>
    <Footer />
    </>
  )
}

export default App