import React from 'react'
import WorkProfileCenterPanel from './WorkProfileCenterPanel'
import WorkProfileLeftPanel from './WorkProfileLeftPanel'
import WorkProfileRightPanel from './WorkProfileRightPanel'
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { FaRegSmile } from "react-icons/fa";
import { FaAward } from "react-icons/fa";

const WorkProfile = () => {
    return (
        <>
            <div className='h-200 w-full flex justify-center items-center mb-10'>
                {/* left panel */}
                <WorkProfileLeftPanel />
                {/* center  */}
                <WorkProfileCenterPanel />
                {/* right panel */}
                <div className='flex flex-col w-1/3 h-full mt-16'>
                    <WorkProfileRightPanel num="90+" title="COMPLETED PROJECTS" icon={<PiSuitcaseSimpleLight className="text-gray-500 text-4xl" />} />
                    <WorkProfileRightPanel num="500+" title="COMPLETED PROJECTS" icon={<PiSuitcaseSimpleLight className="text-gray-500 text-4xl" />} />
                    <WorkProfileRightPanel num="400+" title="HAPPY CLIENT" icon={<FaRegSmile className="text-black text-4xl" />} />
                    <WorkProfileRightPanel num="50+" title="AWARD WINNER" icon={<FaAward className="text-black text-4xl" />} />
                </div>
            </div>
        </>
    )
}

export default WorkProfile

