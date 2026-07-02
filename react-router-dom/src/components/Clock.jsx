import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [colour , setColour] = useState("sky")
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        })
    })

    const handleColour = (e) => {
        setColour(e.target.value);
    }

    return (
        <>
            <div className='h-full w-full flex justify-center items-center'>
                <h1 className={`flex justify-center items-center px-10 py-2 mb-25 mt-25 rounded-md bg-${colour}-500 text-white w-fit text-4xl`}>{time}</h1>
                <select name="" id="" className='ml-10 rounded-md shadow-2xl border px-5 py-2' onChange={handleColour}>
                    <option value="orange">orange</option>
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                    <option value="gray">gray</option>
                </select>
            </div>
        </>
    );
};

export default Clock;



