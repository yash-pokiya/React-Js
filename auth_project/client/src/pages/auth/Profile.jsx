import axios from "axios";
import React from "react";
import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/AuthSlice";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Profile = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await axios.get("/api/user/profile");
            setUser(response.data.user)
            setFirstName(response.data.user.firstName)
            setLastName(response.data.user.lastName)
            setUserName(response.data.user.userName)
            setEmail(response.data.user.email)
            setRole(response.data.user.role)
        }
        fetchProfile()
    }, [])

    const handleLogout = async () => {
        const response = await axios.post('/api/user/logout');
        dispatch(logout())
        if (response.status == 200) {
            navigate("/login")
        }
    }

    const updateProfile = async () => {
        const response = await axios.post("/api/user/update", {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email
        })
        if (response.status == 200) {
            alert("Profile updated successfully")
            setIsEdit(null)
        }
    }

    const [isEdit, setIsEdit] = useState(null);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [userName, setUserName] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 antialiased">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                <button className="bg-transparent text-neutral-900 border-none cursor-pointer" onClick={() => {
                    navigate("/dashboard/student")
                }}>
                    <IoArrowBackCircleOutline size={24} />
                </button>

                {/* Header / Avatar */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-24 h-24 rounded-full object-cover ring-2 ring-neutral-100 border-3 border-neutral-900"
                        />
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>

                    <h1 className="text-xl font-medium text-neutral-900 mt-4 tracking-tight">
                        {firstName + " " + lastName}
                    </h1>
                    <p className="text-sm text-neutral-600 mt-0.5 font-normal">
                        @{userName}
                    </p>
                    <p className="text-sm text-neutral-600 mt-0.5 font-normal">
                        {role}
                    </p>
                </div>

                {/* User Details List */}
                <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                        <span className="text-xs uppercase font-medium tracking-wider text-neutral-400">
                            First Name
                        </span>
                        {isEdit ? <input className="text-sm font-medium text-neutral-800 border  px-2 py-1 rounded-md" value={firstName} onChange={(e) => { setFirstName(e.target.value); }} type="text" /> : <span className="text-sm font-medium text-neutral-800">
                            {firstName}
                        </span>
                        }
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                        <span className="text-xs uppercase font-medium tracking-wider text-neutral-400">
                            Last Name
                        </span>
                        {isEdit ? <input className="text-sm font-medium text-neutral-800 border  px-2 py-1 rounded-md" value={lastName} onChange={(e) => { setLastName(e.target.value); }} type="text" /> : <span className="text-sm font-medium text-neutral-800">
                            {lastName}
                        </span>
                        }
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                        <span className="text-xs uppercase font-medium tracking-wider text-neutral-400">
                            Username
                        </span>
                        {isEdit ? <input className="text-sm font-medium text-neutral-800 border  px-2 py-1 rounded-md" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /> : <span className="text-sm font-medium text-neutral-800">
                            {userName}
                        </span>
                        }
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                        <span className="text-xs uppercase font-medium tracking-wider text-neutral-400">
                            Email
                        </span>
                        {isEdit ? <input className="text-sm font-medium text-neutral-800 border  px-2 py-1 rounded-md" type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> : <span className="text-sm font-medium text-neutral-800">
                            {email}
                        </span>
                        }
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3">
                    <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium py-3 rounded-xl transition duration-200"
                        onClick={() => {
                            setIsEdit((prev) => !prev)
                            if (isEdit) {
                                updateProfile();
                            }
                        }}>
                        {isEdit ? "Update Profile" : "Edit Profile"}
                    </button>

                    <button className="w-full bg-transparent hover:bg-rose-50 text-rose-600 text-sm font-medium py-3 rounded-xl transition duration-200"
                        onClick={() => handleLogout()}
                    >
                        Log out
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;