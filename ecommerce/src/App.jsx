import React from 'react'
import Home from './components/pages/Home'
import { Route, Routes } from 'react-router-dom'
import Product from './components/pages/Product'
import Footer from './components/Home/Footer'
import Navbar from './layouts/NavBar'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product/:id' element={<Product/>}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App