import React, { useContext } from 'react'
import { userContext } from '../App'

const ChildC = () => {
    const {user , age , theme} = useContext(userContext)
    document.body.style.backgroundColor = theme;
    return (
        <>
            <div className={` ${theme === "black" ? "text-white" : "text-black"} h-auto w-25 `} >
                <h1 >name : {user}</h1>
                <h2>age : {age}</h2>

            </div>
        </>
    )
}

export default ChildC


