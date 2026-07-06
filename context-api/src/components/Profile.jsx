import React, { useContext } from 'react'

import UserContext from '../context/UserContext'

const Profile = () => {
  const {user , setUser} = useContext(UserContext)

  if (!user) {
    return <div>Please Login</div>
  }
  return (
    <>
      <div className="text-2xl font-semibold mb-4">Profile</div>
      <div className="text-xl">Welcome, {user.username}</div>
      <button
        onClick={() => setUser(null)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
      >
        Logout
      </button>
    </>
  )
}


export default Profile