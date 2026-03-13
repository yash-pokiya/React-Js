import React from 'react'
import { Bookmark } from 'lucide-react';

const CompanyCard = ({data}) => {
  return (
    <>
        <div className="card w-110 m-5 rounded-2xl shadow-2xl p-4">
                <div className="top flex flex-wrap  items-center justify-between">
                    <img src={data.img}className='h-15 object-cover shadow-2xl shadow-gray-500 w-auto rounded-full' alt="" />
                    <button className='h-8 px-4 border justify-center items-center flex rounded-md bg-white text-gray-950/50 font-bold text-md '  id='saveBtn' >Save <span className='mb-2 w-3.5 h-3.5 ms-1 stroke-5'><Bookmark/></span></button>
                </div>

                <div className="middle p-3 mt-8 gap-5 flex flex-wrap justify-baseline  items-center">
                    <p className='font-bold text-xl'>{data.company}</p>
                    <p className='text-md font-bold text-gray-400 mt-1'>{data.posted}</p>
                    <h1 className='text-4xl font-bold' >{data.postFor} </h1>
                    <div className="buttons flex flex-wrap justify-center items-center gap-2 ">
                        <button className='h-8 w-auto px-3  rounded-md bg-gray-100 text-black font-bold text-md '>{data.jobType}</button>
                        <button className='h-8 w-auto px-3 rounded-md bg-gray-100 text-black font-bold text-md '>{data.level}</button>
                    </div>
                </div>
                    <div className='h-0.5px border mt-30 border-gray-300'></div>

                <div className="bottom mt-5 flex flex-wrap justify-between items-center ">
                        <div className="left">
                            <h1 className='text-2xl font-bold'>{data.salary}</h1>
                        <p className='text-md font-bold text-gray-400 mt-1' >{data.place}</p>
                        </div>
                        <div className="right">
                            <button className='h-8 w-auto px-2  rounded-md bg-black text-white font-bold text-md ' >Apply Now</button>
                        </div>
                </div>
        </div>
    </>
  )
}

export default CompanyCard