import React, { useState } from 'react'
import supabase from '../supabaseConfig'
import { useNavigate } from 'react-router-dom'

const AddSmoothies = () => {
    const [title, setTitle] = useState("")
    const [method, setMethod] = useState("")
    const [rating, setRating] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    const addSmoothies = async (e) => {
        e.preventDefault()
        if (!title || !method || !rating || !image) {
            alert("Please fill in all fields")
            return
        }

        const { data, error } = await supabase
            .from("smoothies")
            .insert([{ title, method, rating: Number(rating), image_url: image }])
            .select()

        if (error) {
            console.log(error)
            alert(error.message)
        }
        if (data) {
            navigate("/")
        }
    }

    const handleUpload = async (file) => {
        const fileName = `${Date.now()}-${file.name}`
        const {data , error} = await supabase.storage.from("MyBucket").upload(fileName , file)
        if(error){
            alert(error.message)
        }else{
            const {data: publicUrlData} = await supabase.storage.from("MyBucket").getPublicUrl(fileName)
            setImage(publicUrlData.publicUrl)
            console.log(publicUrlData.publicUrl)
        }
    }

    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6 flex justify-center items-start pt-12">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Smoothie</h2>
                <form onSubmit={addSmoothies} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                        <textarea
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            placeholder="Method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Image"
                            type='file'
                            onChange={(e) => handleUpload(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <input
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            max={5}
                            min={1}
                            placeholder="Rating (1-5)"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>

                    <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition mt-2">
                        Add
                    </button>
                </form>
            </div>
        </main>
    )
}

export default AddSmoothies