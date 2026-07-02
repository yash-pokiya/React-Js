import React from 'react'
import Login from './components/Login'
import UserContextProvider from './context/UserContextProvider'

const App = () => {
  return (
    <>
    <UserContextProvider>
      <Login/>
    </UserContextProvider>
    </>
  )
}

export default App