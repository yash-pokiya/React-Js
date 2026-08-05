import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    authService.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleLogout = () => {
    authService.logout()
      .then(() => {
        dispatch(logout());
      });
  };

  const checkUser = async () => {
    const getUser = await authService.getUser();
    if(getUser){
      dispatch()
    }
  }

  if (loading) {
    return (
     <Loader/>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <button onClick={handleLogout}>login</button>
      <Footer />
    </div>
  );
}