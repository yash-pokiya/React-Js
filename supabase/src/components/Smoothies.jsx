import React, { useEffect, useState } from 'react'
import supabase from '../supabaseConfig'
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import { useAuth } from '../context/AuthContext';

const Smoothies = () => {
    const { isAdmin } = useAuth()
    const [smoothies, setSmoothies] = useState(null)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(null)
    const [edit, setEdit] = useState(false)
    const [editedTitle, setEditedTitle] = useState("")
    const [editedMethod, setEditedMethod] = useState("")
    const [editedRating, setEditedRating] = useState("")
    const [editedId, setEditedId] = useState(null)

    const getSmoothies = async () => {
        const { data, error } = await supabase
            .from("smoothies")
            .select("*")

        if (error) {
            setFetchError("Could not fetch smoothies")
            setSmoothies(null)
        } else {
            setSmoothies(data)
            setFetchError(null)
        }
        setLoading(false)
    }

    const deleteSmoothies = async (id) => {
        const { error } = await supabase
            .from("smoothies")
            .delete()
            .eq("id", id)

        if (error) {
            console.log(error)
            setFetchError("Could not delete smoothie")
        } else {
            getSmoothies()
        }
    }

    const startEdit = (smoothie) => {
        setEdit(true)
        setEditedId(smoothie.id)
        setEditedTitle(smoothie.title || "")
        setEditedMethod(smoothie.method || "")
        setEditedRating(smoothie.rating || "")
    }

    const saveEdit = async (id) => {
        const { error } = await supabase
            .from("smoothies")
            .update({
                title: editedTitle,
                method: editedMethod,
                rating: Number(editedRating)
            })
            .eq("id", id)

        if (error) {
            console.log(error)
            setFetchError("Could not edit smoothie")
        } else {
            setEdit(false)
            setEditedId(null)
            getSmoothies()
        }
    }

    useEffect(() => {
        getSmoothies()

        // const channel = supabase
        //     .channel('realtime_smoothies')
        //     .on(
        //         'postgres_changes',
        //         { event: '*', schema: 'public', table: 'smoothies' },
        //         () => {
        //             getSmoothies()
        //         }
        //     )
        //     .subscribe()

        // return () => {
        //     supabase.removeChannel(channel)
        // }
    }, [])

    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Smoothies
                    </h2>
                </div>

                {fetchError && (
                    <p className="text-red-500 mb-4">{fetchError}</p>
                )}

                {loading && (
                    <p className="text-gray-500">Loading smoothies...</p>
                )}

                {!loading && smoothies && smoothies.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
                        No smoothies found.
                    </div>
                )}

                {!loading && smoothies && smoothies.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {smoothies.map((smoothie) => (
                            <div
                                key={smoothie.id}
                                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
                            >
                                {edit && editedId === smoothie.id ? (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-2 items-center">
                                            <input 
                                                type="text" 
                                                className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                                value={editedTitle} 
                                                onChange={(e) => setEditedTitle(e.target.value)} 
                                                placeholder="Title"
                                            />
                                            <input
                                                className="w-24 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="number"
                                                max={5}
                                                min={1}
                                                placeholder="Rating"
                                                value={editedRating}
                                                onChange={(e) => setEditedRating(e.target.value)}
                                            />
                                        </div>
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            value={editedMethod} 
                                            onChange={(e) => setEditedMethod(e.target.value)} 
                                            placeholder="Method"
                                        />
                                        <div className="flex justify-end mt-1">
                                            <button 
                                                onClick={() => saveEdit(smoothie.id)} 
                                                className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition flex items-center justify-center"
                                            >
                                                <IoMdDoneAll className="text-lg" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    {smoothie.title}
                                                </h3>
                                                {smoothie.rating && (
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
                                                        ★ {smoothie.rating}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {smoothie.method}
                                            </p>
                                        </div>
                                        <img className='object-cover h-40 w-40 my-2' src={smoothie.image_url} alt="" />
                                        {isAdmin && (
                                            <div className="flex items-center gap-2 mt-4">
                                                <button 
                                                    onClick={() => deleteSmoothies(smoothie.id)} 
                                                    className="bg-red-500 text-white px-2.5 py-1.5 rounded hover:bg-red-600 transition flex items-center justify-center"
                                                >
                                                    <MdDeleteForever className="text-lg" />
                                                </button>
                                                <button 
                                                    onClick={() => startEdit(smoothie)} 
                                                    className="bg-blue-500 text-white px-2.5 py-1.5 rounded hover:bg-blue-600 transition flex items-center justify-center"
                                                >
                                                    <CiEdit className="text-lg" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Smoothies