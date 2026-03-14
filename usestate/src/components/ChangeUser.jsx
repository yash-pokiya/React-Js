import React, { useState } from "react";

const ChangeUser = () => {

  const [user, setUser] = useState({
    userName: "Test_User",
    role: "Tester",
    photo:
      "https://i.pinimg.com/736x/b0/a7/21/b0a721f5598d36794d6f98ef5fd7be50.jpg",
  });

  const changeUser = () => {
    setUser((prev) =>
      prev.userName === "Test_User"
        ? {
            userName: "Dev_User",
            role: "Developer",
            photo:
              "https://i.pinimg.com/736x/03/ab/ec/03abecebd5b1e6a30cec46662d853744.jpg",
          }
        : {
            userName: "Test_User",
            role: "Tester",
            photo:
              "https://i.pinimg.com/736x/b0/a7/21/b0a721f5598d36794d6f98ef5fd7be50.jpg",
          }
    );
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-900">

      <div className="bg-gray-800 text-white w-full max-w-sm p-6 rounded-2xl shadow-xl text-center transition hover:scale-105">

        <img
          src={user.photo}
          alt="profile"
          className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-orange-500 shadow-lg"
        />

        <h2 className="mt-4 text-2xl font-bold">{user.userName}</h2>

        <p className="text-gray-400 mt-1">{user.role}</p>

        <button
          onClick={changeUser}
          className="mt-6 w-full bg-orange-500 py-2 rounded-xl font-semibold hover:bg-orange-400 transition"
        >
          Switch User
        </button>

      </div>
    </div>

    
    </>
  );
};

export default ChangeUser;