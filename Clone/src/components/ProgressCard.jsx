import React from 'react'

const   ProgressCard = ({icon , num , heading , margin }) => {
  return (
    <>
        <div className={`w-80 h-95 flex flex-col relative ${margin}`}>
            {icon}
            <h1 className='absolute top-7 right-4  font-sans font-bold text-neutral-400 text-6xl'>{num}</h1>
            <h1 className='text-3xl font-semibold font-serif mt-10'>{heading}</h1>
            <p className='mt-10 text-wrap w-2/3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis eligendi impedit atque non autem perspiciatis?</p>
        </div>
    </>
  )
}

export default ProgressCard