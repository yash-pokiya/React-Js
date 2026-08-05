import React, { useState } from 'react'
import supabase from '../supabaseConfig'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import UploadImageButton from './UploadImageButton'

const AddSmoothies = () => {
    const [title, setTitle] = useState("")
    const [method, setMethod] = useState("")
    const [rating, setRating] = useState("")
    const [image, setImage] = useState("")
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const addSmoothies = async (e) => {
        e.preventDefault()
        if (!title || !method || !rating || !image) {
            alert("Please fill in all fields (including image upload)")
            return
        }

        setLoading(true)
        const { data, error } = await supabase
            .from("smoothies")
            .insert([{ title, method, rating: Number(rating), image_url: image }])
            .select()

        setLoading(false)

        if (error) {
            console.log(error)
            alert(error.message)
        }
        if (data) {
            navigate("/")
        }
    }

    const handleUpload = async (file) => {
        if (!file) return
        setUploading(true)
        const fileName = `${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage.from("MyBucket").upload(fileName, file)
        setUploading(false)

        if (error) {
            alert(error.message)
        } else {
            const { data: publicUrlData } = await supabase.storage.from("MyBucket").getPublicUrl(fileName)
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
                        <TextField
                            type="text"
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            multiline
                            rows="3"
                            fullWidth
                            label="Method"
                            variant="outlined"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex items-center gap-3">
                            <UploadImageButton 
                                onChange={(e) => handleUpload(e.target.files[0])} 
                                uploading={uploading}
                                uploaded={!!image}
                            />
                            {image && (
                                <img src={image} alt="Preview" className="w-10 h-10 object-cover rounded-md border border-gray-300" />
                            )}
                        </div>
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

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={loading || uploading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? "Adding..." : "Add"}
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default AddSmoothies