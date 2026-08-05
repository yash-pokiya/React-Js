import React from 'react'
import { TbArrowNarrowRightDashed } from "react-icons/tb";
const ReadMoreButton = () => {
  return (
    <>
        <div className='flex justify-start items-center mt-4 gap-2'>
            <h1 className='font-bold font-sans text-lg'>READ MORE </h1>
            <TbArrowNarrowRightDashed className='h-8 w-8'/>
        </div>
    </>
  )
}

export default ReadMoreButton