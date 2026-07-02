import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += "0123456789";
    if (charAllowed) string += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      const passGenerate = Math.floor(Math.random() * string.length);
      pass += string.charAt(passGenerate)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef?.current?.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed])


  return (
    <>
      <div className='h-screen w-screen bg-slate-900 flex justify-center items-center'>
        <div className='bg-slate-800 w-120 h-40 absolute top-10 flex-col rounded-lg flex justify-center items-center '>
          <div className='flex justify-center items-center mb-4'>
            <input type="text" readOnly placeholder='Password' value={password} ref={passwordRef} className='outline-none border me-3  rounded-lg w-64 text-center h-8 text-white font-medium' />
            <button className='bg-slate-700 p-1.5 h-auto my-1 rounded-md font-medium hover:cursor-pointer text-white' onClick={copyToClipBoard}>copy</button>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input type="range" min="8" max="32" value={length} onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer' />
            <span className='text-white font-medium mx-2'>length({length})</span>
            <input type="checkbox" name="number" onChange={() => { setNumberAllowed((prev) => !prev) }} id="number" />
            <label htmlFor="number" className='text-white'>Numbers</label>
            <input type="checkbox" name="character" id="character" onChange={() => { setCharAllowed((prev) => !prev) }} />
            <label htmlFor="character" className='text-white'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App