import { useState } from 'react'
import userContext from "./userContext"

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [password , setPassword] = useState(null);

  const funcHandler = (name) => {
    console.log(`hello ${name} from user context`)
  }

  const userSave = ({user , password}) => {
    localStorage.setItem("user" , user);
    localStorage.setItem("password" , password);
    console.log("user and password saved successfully")
  }

  const changeUser = (val) => {
    setUser(val)
  }
  return (
    <>
      <userContext.Provider value={{ user, setUser, changeUser, funcHandler , password , setPassword , userSave}}>
        {children}
      </userContext.Provider>
    </>
  )
}

export default UserContextProvider
