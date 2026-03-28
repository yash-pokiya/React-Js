import { ArrowRight } from 'lucide-react'
import React from 'react'

const Offer = () => {
  return (
    <>
    <section className='w-full grid grid-cols-1 md:grid-cols-2 bg-gray-100'>
        {/* images */}
        <div >
        <img src="/images/home1.png" alt="" />
        </div>
        {/* contant */}
        <div className='flex flex-col justify-center gap-6 px-6 py-2'>
            <p className='text-md font-normal py-5'>Limited Time Offer</p>
            <h1 className='text-3xl font-bold leading-normal py-5 '>25% Off All fashion 
                <br />
            Favourites - Limited Time !
            </h1>
            <p className='pt-10 text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing <br /> elit. Hic aut voluptate eius cupiditate perferendis.</p>
            <button className='flex items-center justify-center text-white px-6 py-3 my-4 gap-x-4 active:scale-95 active:rounded-md bg-[#6f4518] hover:bg-[#6f4518]/90 w-max transition-all duration-300'>
              Shop Now  <ArrowRight  />
            </button>
        </div>
    </section>
    </>
  )
}

export default Offer