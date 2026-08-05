import React, { createContext, useContext, useState } from 'react'
import ChildC from './components/ChildC'
import ChildA from './components/ChildA';
export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState("yash")
  const [age, setAge] = useState(18);
  const [theme, setTheme] = useState("beige")
  return (
    <>
      <userContext.Provider value={{ user, age, theme, setTheme }}>
        <div className="flex flex-col justify-center items-center w-full h-screen ">
          <ChildA />
          <ChildC />
        </div>
      </userContext.Provider>
    </>
  )
}

export default App;