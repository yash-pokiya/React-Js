import React, { useState } from "react";

const App = () => {
  const [num , setNum] = useState(0)
  const icreaseVal = () => {
    setNum( num + 1)
  }
  const decreseVal = () => {
    if(num <= 0) return;
    setNum( num - 1)
  }
  return (
    <>  
      <div className="flex flex-col justify-center items-center h-100">
        <h1>COUNTER</h1>
        <div className=" px-5 py-1 mt-3 rounded-xl bg-amber-200">{num}</div>
        <button className=" px-5 py-1 mt-3 rounded-xl bg-amber-200" onClick={icreaseVal}>ADD</button>
        <button className=" px-5 py-1 mt-3 rounded-xl bg-amber-200" onClick={decreseVal}>
          REMOVE
        </button>
      </div>
    </>
  );
};

export default App;
