import React from 'react'
import Header from './components/Header/Header'
import Github from './components/Github/Github';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Home from './Pages/Home';
import CheckBox from './components/CheckBox';
import Clock from './components/Clock';

const App = () => {
  return (
    <BrowserRouter>
      <Header/> 
      {/* <CheckBox/> */}
      <Routes>
        <Route path='/github' element={<Github/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/clock' element={<Clock/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App