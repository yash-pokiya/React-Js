import { useContext } from "react"
import userContext from "../context/userContext"

const Profile = () => {

  const { user, setUser, changeUser, funcHandler , userSave , password , setPassword } = useContext(userContext)
  return (
    <>
      <div className="flex flex-col gap-5 p-6 max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100">
  {/* Header Section */}
  <div className="space-y-1">
    {user && user.length > 2? (
      <h1 className="text-xl font-semibold text-gray-800">
        Welcome back, <span className="text-blue-600">{user}</span>!
      </h1>
    ) : (
      <h1 className="text-xl font-semibold text-gray-800">Get Started</h1>
    )}
    <p className="text-sm text-gray-500">Please enter your details below.</p>
  </div>

  {/* Input Fields */}
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">Username</label>
      <input 
        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
        type="text" 
        placeholder="e.g., alex_doe" 
        onChange={(e) => changeUser(e.target.value)} 
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">Password</label>
      <input 
        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
        type="password" 
        name="password" 
        id="password" 
        placeholder="••••••••" 
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  </div>

  {/* Action Buttons */}
  <div className="grid grid-cols-2 gap-3 pt-2">
    <button 
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm p-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
      onClick={() => funcHandler(user)}
    >
      Verify User
    </button>
    <button 
      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm p-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
      onClick={() => userSave({ user , password })}
    >
      Save Changes
    </button>
  </div>
</div>
    </>
  )
}

export default Profile
