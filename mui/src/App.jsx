import React from 'react'
import Buttons from './components/Buttons'
import DeleteButton from './components/DeleteButton'

const App = () => {
  return (
    <>
      <div className='flex gap-5 justify-center items-center mt-20'>
        <Buttons />
        <DeleteButton />
      </div>
    </>
  )
}

export default App