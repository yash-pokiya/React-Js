import React, { useState } from "react";
import axios from "axios"

const ApiFetch = () => {
    const [Data1, setData1] = useState([])
    const [Data2, setData2] = useState([])
    const [Data3, setData3] = useState([])


  // METHOD - 1
  function Method1() {
    const apiData1 = fetch("https://jsonplaceholder.typicode.com/users")
    .then((raw) => {
        console.log(raw)
        return raw.json();
    })
    .then((data) => {
        console.log(data)
        return setData1(data)
    }) 
    .catch((e) => {
      console.log("err" + e.message)
    })
  }

  // METHOD - 2
async  function Method2(){
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  setData2(data);
  }
  // METHOD - 3
  async function Method3() {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(res.data)
        setData3(res.data)
      } catch (error) {
        console.log(error.message)
      }
  }

  return (
    < >
      {/* Method 1 */}
      <section className=" w-full h-screen rounded-2xl flex flex-col items-center justify-center gap-y-4 p-6  bg-green-300 text-xl text-center">
        <h1 className="text-center text-3xl mb-2">
          Method 1 : fetch - then - then
        </h1>
        <div className="bg-black p-4 w-full rounded-md gap-3  flex flex-wrap justify-start items-center flex-col overflow-auto h-150  ">
          {Data1.map((a) => {
            return (
              <div className="h-auto rounded-2xl p-2 bg-green-200">
            <h1 className="bg-green-800 h-10 w-100 text-white rounded-2xl text-2xl" key={a.id}>Name : {a.name}</h1>
          <h1 className="bg-green-800 h-10 w-100 text-white mt-2 rounded-2xl text-2xl">Username : {a.username}</h1>
          </div>
            )
          })}
        </div>
        <button
          className="w-36 px-4 py-2 text-center text-white bg-green-900 rounded-md mt-2 active:bg-green-500  active:text-green-950 active:scale-105 transition-all"
          onClick={Method1}
        >
          Get Data 1
        </button>
      </section>
      {/* Method 2 */}
      <section className="w-full h-screen flex flex-col items-center justify-center gap-y-4 p-6  text-center bg-blue-300 text-xl">
        <h1 className="text-center text-3xl mb-2">
          Method 2 : Async - Await - fetch
        </h1>

        <div className="bg-black p-4 w-full rounded-md gap-3  flex flex-wrap justify-start items-center flex-col overflow-auto h-150">
          {Data2.map((a) => {
            return (
              <div className="h-auto rounded-2xl p-2 bg-blue-200">
            <h1 className="bg-blue-800 h-10 w-100 text-white rounded-2xl text-2xl" key={a.id}>Email : {a.email}</h1>
          <h1 className="bg-blue-800 h-10 w-100 text-white mt-2 rounded-2xl text-2xl">City : {a.address.city}</h1>
          </div>
            )
          })}
        </div>
        <button onClick={Method2} className="w-36 px-4 py-2 text-center text-white bg-blue-900 rounded-md mt-2 active:bg-blue-500  active:text-blue-950 active:scale-105 transition-all">
          Get Data 2
        </button>
      </section>
      {/* Method 3 */}
      <section className="w-full h-screen flex flex-col items-center justify-center gap-y-4 p-6 text-center bg-orange-300  text-xl">
        <h1 className="text-center text-3xl mb-2">
          Method 3 : Async - Await - Axios
        </h1>

        <div className="bg-black p-4 w-full rounded-md gap-3  flex flex-wrap justify-start items-center flex-col overflow-auto h-150  ">
          {Data3.map((a) => {
            return (
              <div className="h-auto rounded-2xl p-2 bg-orange-200">
            <h1 className="bg-orange-800 h-10 w-100 text-white rounded-2xl text-2xl" key={a.id}>Name : {a.name}</h1>
          <h1 className="bg-orange-800 h-10 w-100 text-white mt-2 rounded-2xl text-2xl">Username : {a.username}</h1>
          </div>
            )
          })}
        </div>
        <button onClick={Method3} className="w-36 px-4 py-2 text-center text-white bg-orange-700 rounded-md mt-2 active:bg-orange-500  active:text-orange-950 active:scale-105 transition-all">
          Get Data 3
        </button>
      </section>
    </>
  );
};

export default ApiFetch;
