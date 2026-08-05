import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './redux/features/counterSlice';

const App = () => {
 const dispatch = useDispatch();
 const count = useSelector((state) => state.counter)
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-900 font-sans antialiased">
        <div className="flex flex-col items-center justify-center bg-slate-800 text-white p-8 rounded-2xl shadow-2xl border border-slate-700 min-w-[320px]">

          <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6">
            Current Count
          </span>

          <div className="flex items-center justify-between w-full bg-slate-950 p-3 rounded-xl border border-slate-800">

            <button className="flex items-center justify-center w-12 h-12 text-2xl font-bold bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
            onClick={() => dispatch(decrement())}
            >
              &minus;
            </button>

            <h1 className="text-4xl font-extrabold mx-6 tabular-nums tracking-tight selection:bg-transparent">
              {count}
            </h1>

            <button className="flex items-center justify-center w-12 h-12 text-2xl font-bold bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
            onClick={()=>{dispatch(increment())}}
            >
              &#43;
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default App  