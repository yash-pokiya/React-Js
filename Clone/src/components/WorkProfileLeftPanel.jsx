import React from 'react'

const WorkProfileLeftPanel = () => {
    return (
        <>
            <div className='h-200 w-1/3 flex flex-col '>
                {/* biography  */}
                <div className='w-full h-full mt-30 flex flex-col justify-center items-center'>
                    <h1 className='font-semibold text-2xl '>Biography</h1>
                    <p className='text-wrap flex w-1/2 justify-end me-10 text-start ms-61 mt-5'>Lorem ipsum dolor. Voluptate commodi ipsa ex aliquid repudiandae libero doloremque optio incidunt obcaecati facere ullam reprehenderit quidem ducimus modi maxime, sapiente nam, iure labore.</p>
                </div>
                {/* services */}
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='font-semibold text-2xl me-5'>My Services</h1>
                    <ul className='list-disc list-inside ms-22 mt-5'>
                        <li>User Experience Design</li>
                        <li>User Interface Design</li>
                        <li>Usability Testing</li>
                    </ul>
                </div>
                {/* location */}
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='font-semibold text-2xl me-5'>My Locations</h1>
                    <ul className='list-disc list-inside ms-35 mt-5'>
                        <li className='text-wrap w-1/2'>Yogichowk, nana varcahha, surat</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default WorkProfileLeftPanel