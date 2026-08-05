import React from 'react'
import ProgressCard from './ProgressCard'
import { LuPartyPopper } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdPeople , MdOutlineWbSunny  } from "react-icons/md";

const Progress = () => {
    return (
        <>
            {/* top div */}
            <div className='h-50 w-full mt-25 flex flex-col justify-start items-center'>
                <h1 className='text-5xl font-bold font-sans'>My Work Process</h1>
                <p className='text-[22px] text-wrap w-1/2 text-center mx-auto mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nostrum quos reiciendis corporis ducimus id numquam, nobis cum necessitatibus labore? Eveniet tempora facilis rem cum, culpa harum officia perferendis atque?</p>
            </div>
            {/* bottom div */}
            <div className='w-full h-full flex justify-center items-center gap-5'>
                <ProgressCard icon={<LuPartyPopper className='h-18 w-18 text-neutral-400' />} num="01" heading="Introduction" />
                <ProgressCard margin={`mt-18`} icon={<FaRegUserCircle className='h-18 w-18 text-neutral-400' />} num="02" heading="UX Design" />
                <ProgressCard icon={<MdPeople className='h-18 w-18 text-neutral-400' />} num="03" heading="UI Design" />
                <ProgressCard margin={`mt-18`} icon={<MdOutlineWbSunny className='h-18 w-18 text-neutral-400' />} num="04" heading="Web design" />
            </div>
        </>
    )
}

export default Progress