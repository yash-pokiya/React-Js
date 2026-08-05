import React, { useContext, useState } from 'react'
import { userContext } from '../App'

const ChildA = () => {
    const { theme, setTheme } = useContext(userContext);
    return (
        <>
            <div className=''>
                <input type="radio" name="theme" id="light"

                    onChange={() => setTheme("beige")} />
                <label htmlFor="light"
                    style={{
                        backgroundColor: theme === "black" ? "black" : "beige",
                        color: theme === "black" ? "white" : "black",
                    }}
                >light</label>
            </div>
            <div className=''>
                <input type="radio" name="theme" id="dark"

                    onChange={() => setTheme("black")} />
                <label htmlFor="dark"
                    style={{
                        backgroundColor: theme === "black" ? "black" : "beige",
                        color: theme === "black" ? "white" : "black",
                    }}>dark</label>
            </div>
        </>
    )
}

export default ChildA