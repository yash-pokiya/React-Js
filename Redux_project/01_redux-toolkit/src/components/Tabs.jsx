import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice';

const Tabs = () => {
    const btns = ["Photos", "Videos"]
    const dispatch = useDispatch();
    const activeTab = useSelector((state) => state.search.activeTab);
    return (
        <>
            <div className=' h-14 w-28  outline-none border-none flex gap-10 items-center justify-center border border-gray-800 rounded-xl'>
                {
                    btns.map((elem, index) => {
                        return (
                            <button
                                key={index}
                                className={`${activeTab === elem.toLowerCase() ? "bg-blue-950" : "bg-gray-900"} transition-all duration-200 ease-in-out h-10 w-28 px-6 py-4 flex justify-center items-center rounded-md hover:bg-gray-700 active:bg-gray-800 cursor-pointer`}
                                onClick={() => dispatch(setActiveTab(elem.toLowerCase()))}
                            >
                                {elem}
                            </button>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Tabs