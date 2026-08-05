import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../../redux/features/AuthSlice';
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await axios.post("/api/user/login", { email, password });
            if (response.status === 200) {
                dispatch(login(response.data));
                if (response.data.user.role === "admin") {
                    navigate("/dashboard/admin");
                }
                else if (response.data.user.role === "teacher") {
                    navigate("/dashboard/teacher");
                }
                else if (response.data.user.role === "student") {
                    navigate("/dashboard/student");
                }
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "Invalid credentials");
            } else {
                console.log(error)
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl mb-8 font-bold text-center text-gray-800">
                    Welcome Back
                </h1>

                {errorMessage && (
                    <div className="mb-8 mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email or Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your email or username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default LoginPage