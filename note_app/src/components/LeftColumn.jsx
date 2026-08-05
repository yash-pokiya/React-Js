import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/features/noteSlice';

const LeftColumn = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
            if(!formData.title || !formData.content){
                alert("Please fill all the fields")
            }
            else {
                const data = JSON.parse(localStorage.getItem("notes")) || [];
                dispatch(addNote({
                    id :  data.length+1,
                    ...formData
                }))
                setFormData({title : "" , content : ""})
            }
    }
    return (
        <>
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-start">
                <h2 className="text-4xl font-bold mb-8 tracking-tight">Add Notes</h2>
                <div className="space-y-6 w-full max-w-xl">
                    <input
                        name='title'
                        type="text"
                        value={formData.title}
                        placeholder="Enter Notes Heading"
                        className="w-full bg-black border placeholder:text-white border-white rounded-lg px-4 py-3.5 text-base focus:outline-none "
                        onChange={handleChange}
                    />
                    <textarea
                        name='content'
                        placeholder="Write Details"
                        value={formData.content}
                        className="w-full h-52 bg-black placeholder:text-white border border-white rounded-lg px-4 py-3.5 text-base focus:outline-none  resize-none"
                        onChange={handleChange}
                    />
                    <button 
                        type='submit'
                        onClick={handleSubmit}
                        className="w-full bg-white text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-stone-200 transition-colors"
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </>
    )
}

export default LeftColumn