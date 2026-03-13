import React, { useState } from 'react'

const increase = () => {
     const [Number, setNumber] = useState(0);
  // Number (first variable) ==> Read Only value (you can't this variable value )
  // setNumber (second variable ) ==> write only value(if you want to change number variable''s value use setNumber)
  function IncreaseNum() {
    setNumber(Number + 1);
  }
  function decreaseNum() {
    if (Number <= 0) {
      return;
    }
    setNumber(Number - 1);
  }
  function jump5() {
    setNumber(Number + 5);
  }
  function decrese5() {
    if (Number <= 5) {
      setNumber(0);
      return;
    }
    setNumber(Number - 5);
  }
  function reset() {
    setNumber(0);
  }
  return (
    <>
              <section className="">
        {/* <h1 className='text-center text-3xl font-bold'>UseState : Change Data (Variable ne define karva and value Change karva mate)</h1> */}
        <p className="text-center text-2xl mt-10 font-bold text-[#4C5C2D]">
          Increase And Decrease Number
        </p>
        <div className="text-center text-9xl mt-10 font-bold mb-5 h-75 flex justify-center mx-auto items-center rounded-2xl w-75 text-[#FBF6F6] bg-[#6A7E3F]">
          {Number}
        </div>
        <div className="buttons text-center text-xl">
          <button
            className="h-10 mx-10 w-auto bg-[#6A7E3F] px-4 text-center text-[#FBF6F6] rounded-xl active:scale-95 active:bg-[#4C5C2D]"
            onClick={IncreaseNum}
          >
            Increase
          </button>
          <button
            className="h-10 mx-10 w-auto bg-[#6A7E3F] px-4 text-center  text-[#FBF6F6] rounded-xl active:scale-95 active:bg-[#4C5C2D]"
            onClick={decreaseNum}
          >
            Decrease
          </button>
        </div>
        <div className="buttons text-center text-xl mt-5 ">
          <button
            className="h-10 mx-10 w-auto bg-[#6A7E3F] px-4 text-center  text-[#FBF6F6] rounded-xl active:scale-95 active:bg-[#4C5C2D]"
            onClick={jump5}
          >
            Jump +5
          </button>
          <button
            className="h-10 mx-10 w-auto bg-[#6A7E3F] px-4 text-center  text-[#FBF6F6] rounded-xl active:scale-95 active:bg-[#4C5C2D]"
            onClick={decrese5}
          >
            decrese -5
          </button>
          <button
            className="h-10 mx-10 w-auto bg-[#6A7E3F] px-4 text-center  text-[#FBF6F6] rounded-xl active:scale-95 active:bg-[#4C5C2D]"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </section>
    </>
  )
}

export default increase