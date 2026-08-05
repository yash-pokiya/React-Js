import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide cursor-pointer" onClick={() => navigate("/")}>
          Store Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")} 
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition"
          >
            View
          </button>

          {isAdmin && (
            <button 
              onClick={() => navigate("/addsmoothies")} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Add
            </button>
          )}

          {user ? (
            <button 
              onClick={logout} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;                 