import React, { useState } from "react";

const Login = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

        function submitForm (){
           if(Email ==="" || Password === "") {
                alert("Must Enter Email and Password..!") 
                return;
              }
          console.log("Data send to bakend :" , {"email" : Email , "password" : Password})
        }

  return (
    <>
      <section className="flex h-screen justify-center items-center bg-white">
      <div className="form bg-gray-200 text-center shadow-2xl p-1.5 mt-4 rounded-2xl">
            <form className="bg-gray-100 text-black flex justify-center items-center flex-col  rounded-2xl px-6 py-3" onSubmit={((e) => {
              e.preventDefault();
              submitForm();
            })}>
                <img src="https://i.pinimg.com/1200x/38/47/9c/38479c637a4ef9c5ced95ca66ffa2f41.jpg" className="h-10 rounded-xl mt-4" alt="" />
          <h1 className="mt-10 text-2xl font-bold text-gray-700">Sign in to continue</h1>
          <p className="text-md font-bold text-gray-500">please sign in to start your rental application</p>
          <input type="email" placeholder="Enter Email" value={Email} onChange={(e) => {
            setEmail(e.target.value)
          }} className="h-10 bg-gray-200 w-full px-4 rounded-2xl mt-5"/ >
          <input type="password" placeholder="Enter password" value={Password} onChange={(e)=> setPassword(e.target.value)} className="h-10 bg-gray-200 w-full px-4 rounded-2xl mt-2.5"/ >
          <input type="submit" value="Sign In" className="w-full mt-5 h-10 bg-black text-white rounded-2xl mb-2 " />
        </form>  
          <p className="text-gray-500 py-2 font-bold">Don't have an account? <a href="#"  className="text-gray-800">Sign Up</a></p>

      </div>

      </section>
    </>
  );
};

export default Login;
