import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const decodeToken = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      // Check if user has a token cookie
      const token = getCookie('token');
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          // Verify with server and fetch latest profile details
          const response = await api.get('/user/profile');
          const profileUser = Array.isArray(response.data.user) ? response.data.user[0] : response.data.user;
          setUser({
            id: decoded.id,
            email: profileUser?.email || decoded.email,
            isAdmin: profileUser?.isAdmin ?? decoded.isAdmin,
            username: profileUser?.username || decoded.username || decoded.email.split('@')[0],
            fullname: profileUser?.fullname || '',
          });
          setLoading(false);
          return;
        }
      }
      setUser(null);
    } catch (error) {
      console.error('Auth verification failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    try {
      const payload = {};
      if (usernameOrEmail.includes('@')) {
        payload.email = usernameOrEmail;
      } else {
        payload.username = usernameOrEmail;
      }
      payload.password = password;

      const response = await api.post('/user/login', payload);
      
      // Since backend writes token cookie, we can read it to get full payload including isAdmin
      const token = getCookie('token');
      const decoded = decodeToken(token);

      const loggedInUser = {
        id: response.data.loginuser?.id || decoded?.id,
        email: response.data.loginuser?.email || decoded?.email,
        username: response.data.loginuser?.username || decoded?.username,
        isAdmin: decoded?.isAdmin || 0,
      };
      
      setUser(loggedInUser);
      return response.data;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...updatedData
      };
    });
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin === 1;

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, isAdmin, login, logout, checkAuth, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
