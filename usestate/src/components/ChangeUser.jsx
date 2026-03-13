import React, { useState } from 'react'

const ChangeUser = () => {
    const [Data, setData] = useState({userName : "Test_User" , role : "Tester" , photo: "https://i.pinimg.com/736x/b0/a7/21/b0a721f5598d36794d6f98ef5fd7be50.jpg"});

    function Change(){
    if(Data.userName === "Test_User"){
    let newObj = {...Data};
    newObj.userName = "devUser";
    newObj.role = "Developer";
    newObj.photo = "https://i.pinimg.com/736x/03/ab/ec/03abecebd5b1e6a30cec46662d853744.jpg"
    setData(newObj)
    }else{
    let newObj = {...Data};
    newObj.userName = "Test_User";
    newObj.role = "Tester";
    newObj.photo = "https://i.pinimg.com/736x/b0/a7/21/b0a721f5598d36794d6f98ef5fd7be50.jpg"
    setData(newObj)
    }
}

  return (
    <>
        <div className=' flex-col text-white font-bold text-2xl mx-auto text-center mt-10 px-4 py-2 bg-[#222] rounded-xl w-full max-w-sm h-auto'>
            <img className='w-36 h-36 object-cover rounded-full my-4 mx-auto' src={Data.photo} alt="" />
            <h1 className='bg-[#555] w-full rounded-xl px-4 py-2 active:bg-orange-500 mb-2'>{Data.userName}</h1>
            <h3  className='bg-[#555] w-full rounded-xl px-4 py-2 active:bg-orange-500 mb-2'>{Data.role}</h3>
            <button className='w-full bg-orange-500 px-4 py-2 my-2 rounded-xl hover:bg-orange-100 hover:text-orange-500 transition hover:scale-95 select-none' onClick={Change}>Switch User</button>
        </div>
    </>
  )
}

export default ChangeUser