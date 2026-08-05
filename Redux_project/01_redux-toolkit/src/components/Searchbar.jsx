import React, { useState } from 'react'

import { IoSearch } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setQuery, setActiveTab, clearResult, setError, setLoading, setResult } from '../redux/features/searchSlice';
import { useNavigate } from 'react-router-dom';


const Searchbar = () => {
    const [search, setSearch] = useState("")
    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return
        console.log(`form submitted..!`)
        dispatch(setQuery(search))
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <div className="relative h-24 w-full flex items-center justify-center bg-gray-950 px-4">
                <form onSubmit={handleSearch}>
                    <div className="w-[450px] h-12 bg-gray-900 flex items-center border border-gray-800 rounded-xl">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required
                            type="text"
                            placeholder="Search"
                            className="w-full h-full bg-transparent outline-none px-4 text-white"
                        />
                        <button
                            type="submit"
                            className="p-2 border-l border-gray-700"
                        >
                            <IoSearch className="w-7 h-7 text-gray-400" />
                        </button>
                    </div>
                </form>

                <button
                    className="absolute right-6 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition"
                    onClick={() => navigate('/collection')}
                >
                    Saved
                </button>
            </div>
        </>
    )
}

export default Searchbar