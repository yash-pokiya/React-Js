import React from 'react'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SideBar from './Layout/SideBar'
import NavBar from './Layout/NavBar'

const App = () => {
  return (
    <>
    <SideBar/>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element = {<Login />}/>
    </Routes>
    </>
  )
}

export default App