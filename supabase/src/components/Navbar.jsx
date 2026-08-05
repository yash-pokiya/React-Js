import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";

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
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition"
          >
            View
          </Button >

          {isAdmin && (
            <Button
            variant="contained"
              onClick={() => navigate("/addsmoothies")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Add
            </Button>
          )}

          {user ? (
            <Button
              variant="contained"
              color="error"
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;                 