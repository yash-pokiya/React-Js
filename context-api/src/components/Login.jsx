import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import Profile from './Profile'
const Login = () => {
    const { user, setUser } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({ username, password })
    }
    return (
        <>
        {user? <Profile/> : (
            <div className='flex flex-col  justify-center items-center h-screen w-screen'>
                <h1 className='text-2xl font-bold mb-4'>Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-sky-300 p-4 rounded-md'>
                    <input className='outline-none p-2 rounded-md border border-white' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className='outline-none p-2 rounded-md border border-white' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-sky-600 text-white p-2 rounded-md hover:bg-sky-700 cursor-pointer' type="submit">Login</button>
                    <div className='text-center mt-4'>
                        <h1 className='text-lg font-semibold'>
                            {user ? `Welcome ${user.username}` : "Not Logged In"}
                        </h1>
                    </div>
                </form>
            </div>
        )}
        </>

    )
}

export default Login