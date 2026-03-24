import React from 'react'
import Home from './components/pages/Home'
import { Route, Routes } from 'react-router-dom'
import Product from './components/pages/Product'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product/:id' element={<Product/>}/>
    </Routes>
    </>
  )
}

export default App