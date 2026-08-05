import React from 'react'
import { LuFileText } from "react-icons/lu";
import { MdPeople  } from "react-icons/md";
import { HiComputerDesktop } from "react-icons/hi2";
import ReadMoreButton from './ReadMoreButton';
const MyServices = () => {
    return (
        <>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='font-bold text-5xl text-start mt-15'>My Services</h1>
                <p className='text-gray-800 text-[18px] text-center text-wrap w-1/2  mt-9'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus dolore accusamus exercitationem nulla culpa nesciunt excepturi, illo quibusdam, autem earum, ipsam dolorum fugiat in beatae mollitia! Quas quo dicta, explicabo tempore molestiae laborum laudantium accusantium similique cupiditate quos porro esse?</p>
            </div>

            <div className='w-full h-full mt-30 px-50 flex justify-center items-center gap-2'>
                <div className='w-1/3 h-100 px-20'>
                    <LuFileText className='h-25 w-25' />
                    <h1 className='text-3xl font-bold font-sans mt-7'>Product Design</h1>
                    <p className='text-gray-800 text-[18px] text-wrap mt-5 mb-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, quasi harum a ratione incidunt quibusdam! </p>
                    <ReadMoreButton/>
                </div>
                <div className='w-1/3 h-100 px-20'>
                    <MdPeople className='h-25 w-25'/>
                    <h1 className='text-3xl font-bold font-sans mt-7 '>User Experience Design</h1>
                    <p className='text-gray-800 text-[18px] text-wrap mt-5 mb-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, quasi harum a ratione incidunt quibusdam! </p>
                    <ReadMoreButton/>
                </div>
                <div className='w-1/3 h-100 px-20'>
                    <HiComputerDesktop className='h-25 w-25'/>
                    <h1 className='text-3xl font-bold font-sans mt-7 '>User interface Design</h1>
                    <p className='text-gray-800 text-[18px] text-wrap mt-5 mb-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, quasi harum a ratione incidunt quibusdam! </p>
                    <ReadMoreButton />
                </div>
            </div>
        </>
    )
}

export default MyServices