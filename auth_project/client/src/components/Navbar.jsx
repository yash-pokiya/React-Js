import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        if (response.status == 401) {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    }
    getProfile()
  }, [])

  const user = useSelector((state) => state.user.user)

  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl text-blue-600"
        >
          🎓 QuizMaster
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <NavLink

            to={!user ? "/login" : user.role === "admin" ? "/dashboard/admin" : user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Dashboard
          </NavLink>
            {user?.role === "student" ? <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Quizzes
          </NavLink> : ""}
          
          {user?.role === "teacher" || user?.role === "admin" ? <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Students
          </NavLink> : ""}


          <NavLink
            to="/results"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Results
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? <Link to="/profile">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
          </Link> : <div className="flex items-center gap-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }
            >
              Register
            </NavLink>
          </div>}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;