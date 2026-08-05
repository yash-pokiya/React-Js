import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../redux/features/noteSlice'

const FilterData = () => {

    const dispatch = useDispatch()
    return (
        <>
            <div className='mb-6'>
                <input type="text" placeholder='Filter by title' 
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full md:w-[25%] bg-black placeholder:text-white border border-white rounded-lg px-4 py-3.5 text-base focus:outline-none" />
            </div>
        </>
    )
}

export default FilterData