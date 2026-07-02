import React, { useEffect, useState } from 'react';

const Card = () => {


    const [userArr, setUserArr] = useState([]);
   
useEffect(()=>{
 const apifetch = async() => {
     try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const res = await data.json();
        setUserArr(res);
     } catch (error) {
        console.log(error)
     }
 }   
apifetch();
},[])
   

    return (
        <div className="flex justify-center gap-6 flex-wrap">
            {userArr.map((user, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center gap-2 m-2.5 p-2.5 bg-white border border-gray-200 rounded-lg
                    shadow-sm w-64 max-w-full
                    ring-0 outline-0 hover:border-gray-400 hover:shadow-[0_0_0_3px_#50a7ff1a]
                    transition-[border-color_shadow] duration-240 ease-linear"
                >
                    <img
                        className="rounded-md"
                        src="https://i.pinimg.com/736x/ea/d2/0d/ead20dbe31a874e9f3dbe10a70f4012d.jpg"
                        alt={user.name}
                    />

                    <p className="text-center text-[25px]">{user.name}</p>

                    <p className="text-center text-[18px]">{user.company.catchPhrase}</p>

                    <button className="text-[20px] mt-2 px-8 py-1 rounded-lg bg-slate-500 text-white">
                        Profile
                    </button>

                    <button className="text-[20px] px-6 py-1 rounded-lg bg-slate-500 text-white">
                        Message
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Card;