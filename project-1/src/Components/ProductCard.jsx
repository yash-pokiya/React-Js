import React from 'react'
import {ArrowUpRight} from "lucide-react"

const ProductCard = ({data}) => {
  return (
    <>
    <div className="card overflow-hidden m-5 w-100 h-auto flex flex-wrap justify-center items-center p-3  rounded-3xl bg-white shadow-2xl">

            {/* <div className='absolute z-10 top-2 left-6'>
                <div className=" flex items-center justify-between gap-40 ">
                <div className='bg-white/20 rounded-full px-3 py-1 text-sm font'>Best Seller</div>
                <img src="https://i.pinimg.com/736x/00/97/d8/0097d8b8a5c62b2939e5fb6ee6143883.jpg" alt=""  className='rounded-full w-10 bg-white '/>
            </div>
            </div> */}
            <img className='object-cover h-95 w-100  shadow-2xl shadow-gray-200  rounded-2xl' src={data.image} alt="" />
        
        <div className="detail  h-auto w-100 px-2.5 mt-2">
        <h1 className='text-2xl font-bold '>{data.title}</h1>
        <p className='font-bold text-md text-start text-gray-900/50 '>{data.tagline}</p>
        <p className='font-bold text-md text-start text-gray-900/50 mt-1.5'>{data.description}</p>
        </div>
        <div className="price w-full mt-5 flex items-center p-1.5 justify-between ">
            <button className='rounded-2xl h-8 w-18  shadow text-xl shadow-gray-300 font-bold bg-gray-100'>${data.price}</button>
            <button className='rounded-2xl bg-black text-white h-8 gap-1 w-35 justify-center flex  shadow text-xl shadow-gray-300 font-bold'>Buy Now <span className='mt-0.5 w-3.5 h-3.5 ms-1 stroke-5'><ArrowUpRight  className='  bg-white text-black rounded-full p-1'/></span></button>
        </div>
    </div>
    </>
  )
}

export default ProductCard