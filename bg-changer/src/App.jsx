import { useState } from "react"


const App = () => {
  const colours = ["white" , "red" , "green" , "blue" , "yellow" , "teal" , "indigo" , "black"]
  const [color, setColor] = useState('white')

  return (
    <>
      <div className={`w-screen h-screen flex justify-center items-start text-base font-medium bg-${color}`}>
        <div className='h-auto px-4 py-2 rounded-full bg-transparent shadow-xl shadow-stone-500 mt-5 flex justify-center  items-center gap-3'>
          <button className='px-4 py-2 rounded-full bg-white text-black scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("white")}>White</button>
          <button className='px-4 py-2 rounded-full bg-red-500 text-white scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("red-500")}>Red</button>
          <button className='px-4 py-2 rounded-full bg-green-500 text-white scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("green-500")}>Green</button>
          <button className='px-4 py-2 rounded-full bg-blue-500 text-white scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("blue-500")}>Blue</button>
          <button className='px-4 py-2 rounded-full bg-yellow-500 text-white scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("yellow-500")}>Yellow</button>
          <button className='px-4 py-2 rounded-full bg-teal-500 text-white scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("teal-500")}>Teal</button>
          <button className='px-4 py-2 rounded-full bg-indigo-500 text-white scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("indigo-500")}>Indigo</button>
          <button className='px-4 py-2 rounded-full bg-black text-white scale-100 transition-transform duration-200 hover:scale-110' onClick={() => setColor("black")}>Black</button>
        </div>  
      </div>
    </>
  )
}

export default App