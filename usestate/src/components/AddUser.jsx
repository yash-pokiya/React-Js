import React, { useState } from "react";

const AddUser = () => {
  const [Data, setData] = useState([
    { name: "Aarav Patel", email: "aaravpatel@gmail.com", color: "bg-red-400" },
    {
      name: "Riya Sharma",
      email: "riyasharma@gmail.com",
      color: "bg-purple-400",
    },
    {
      name: "Piyush Pandit",
      email: "piyushpandit@gmail.com",
      color: "bg-teal-400",
    },
  ]);

  function Add() {
    let arr = [...Data]; //copy array

    if (Data.length === 6) {
            alert("All user rendered..!");
      return;
    }
    if(Data[3]?.name ==="Ananya" || Data[5]?.name === "Ananya"){
        alert("All user rendered for this button..!")
        return;
    }
    arr.push({
      name: "Ananya",
      email: "annanyagupta@gmail.com",
      color: "bg-pink-400",
    });
    setData(arr);
  }

   function Add2() {
    let arr = [...Data]; //copy array

      if (Data.length === 6) {
            alert("All user rendered..!");
      return;
    }
        if((Data[3]?.name ==="viral" && Data[4]?.name ==="Rahul") || (Data[4]?.name ==="viral" && Data[5]?.name ==="Rahul")){
        alert("All user rendered for this button..!")
        return;
    }
    let arr2 = [{
      name: "viral",
      email: "viral@gmail.com",
      color: "bg-yellow-400",
    } , {
        name : "Rahul",
        email : "rahul@gmail.com",
        color: "bg-blue-400",
    }]
    arr.push(...arr2);
    setData(arr);
  }
  return (
    <>
      <section className="flex flex-wrap justify-center items-center gap-6 my-10">
        {Data.map((user) => {
          return (
            <div className={`card w-full h-auto max-w-sm rounded-xl p-6 text-center font-bold  text-white text-2xl ${user.color} flex justify-center items-center flex-col gap-2 `}>
              <h1 className="bg-[#222] rounded-xl w-full px-4 py-2">
                {user.name}
              </h1>
              <h2 className="bg-[#222] rounded-xl w-full px-4 py-2">
                {user.email}
              </h2> 
            </div>
          );
        })}
      </section>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={Add}
          className="bg-orange-600 active:bg-orange-100 text-white text-center px-6 py-4 active:scale-95 active:text-orange-600 text-2xl font-bold rounded-xl transition-all"
        >
            
          Add One More User
        </button>
        <button
          onClick={Add2}
          className="bg-orange-600 active:bg-orange-100 text-white text-center px-6 py-4 active:scale-95 active:text-orange-600 text-2xl font-bold rounded-xl transition-all"
        >
            
          Add Two More User
        </button>
      </div>
    </>
  );
};

export default AddUser;
