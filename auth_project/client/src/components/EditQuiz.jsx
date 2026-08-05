import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditQuiz = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [editQuizData, setEditQuizData] = useState({
        title: "",
        description: "",
        duration: 0,
        passingPercentage: 0,
        status: "draft"
    })
    const [questions, setQuestions] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditQuizData((prevData) => ({ ...prevData, [name]: value }))
        console.log(editQuizData)
    }
    const handleQueDelete = async(id) => {
        try {
            const response = await axios.delete(`/api/question/delete/${id}`)
            if(response.data.success){
                alert(response.data.message)
                fetchQuiz()
            }
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`/api/quiz/read/${id}`)
            const { title, description, duration, passing_percentage, status } = response.data.data.quiz
            setEditQuizData({
                title,
                description,
                duration,
                passingPercentage: passing_percentage,
                status
            })
            setQuestions(response.data.data.questions)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchQuiz()
    }, [id])

    const updateData = async () => {
        try {
            const response = await axios.patch(`/api/quiz/update/${id}`, editQuizData)
            if (response.data.success) {
                alert(response.data.message)
                fetchQuiz()
            }
        } catch (error) {
            console.log(error)
            alert("Error " + error.message)
        }
    }


    return (
        <>
            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-7xl mx-auto">

                    {/* Quiz Card */}

                    <div className="bg-white rounded-xl shadow p-8 mb-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Edit Quiz
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="font-medium">
                                    Quiz Title
                                </label>

                                <input
                                    className="w-full mt-2 border rounded-lg p-3"
                                    value={editQuizData?.title}
                                    name='title'
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div>

                                <label className="font-medium" >
                                    Duration
                                </label>

                                <input
                                    className="w-full mt-2 border rounded-lg p-3"
                                    type='number'
                                    value={editQuizData?.duration}
                                    name='duration'
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div>

                                <label className="font-medium">
                                    Passing percentage
                                </label>

                                <input
                                    className="w-full mt-2 border rounded-lg p-3"
                                    type='number'
                                    min={33}
                                    max={100}
                                    value={editQuizData?.passingPercentage}
                                    name='passingPercentage'
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div>

                                <label className="font-medium">
                                    Status
                                </label>

                                <select
                                    className="w-full mt-2 border rounded-lg p-3"
                                    value={editQuizData?.status}
                                    name='status'
                                    onChange={handleInputChange}
                                >
                                    <option value='draft'>Draft</option>
                                    <option value='published'>Published</option>
                                </select>

                            </div>

                        </div>

                        <div className="mt-6">

                            <label className="font-medium">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                className="w-full mt-2 border rounded-lg p-3"
                                value={editQuizData?.description}
                                name='description'
                                onChange={handleInputChange}
                            />

                        </div>

                        <div className="flex justify-end mt-6">

                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                                onClick={() => {
                                    updateData();
                                }}
                            >
                                Save Quiz
                            </button>

                        </div>

                    </div>

                    {/* Question List */}

                    <div className="bg-white rounded-xl shadow p-8">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold">
                                Questions ({questions?.length ?? 0})
                            </h2>

                            <button
                                className="bg-green-600 text-white px-5 py-3 rounded-lg"
                                onClick={() => {
                                    navigate(`/question/add/${id}`)
                                }}
                            >
                                + Add Question
                            </button>

                        </div>

                        {/* Question Card */}

                        {questions && questions.length > 0 ?questions.map((que , idx) => {
                            return (
                                <div key={que.id} className="border rounded-xl p-6 mb-5">

                                    <div className="flex justify-between">

                                        <div>

                                            <h3 className="font-semibold text-lg">
                                                Q{idx+1}. {que?.question}
                                            </h3>

                                            <div className="flex gap-3 mt-2">

                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                    {que?.mark} marks
                                                </span>

                                                <span className="bg-gray-400 px-3 py-1 rounded-full text-sm">
                                                    {que?.question_type}
                                                </span>

                                            </div>

                                        </div>

                                        <div className="flex gap-2">


                                            <button className="px-4 py-2 bg-yellow-400 rounded-lg" 
                                            onClick={() => {
                                                navigate(`/question/edit/${que.id}`)
                                            }}
                                            >
                                                Edit
                                            </button>

                                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg" 
                                                onClick={() => {
                                                    handleQueDelete(que.id)
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                    <div className="mt-6 space-y-3">

                                        <div className="border rounded-lg p-3">
                                            A. {que?.option_a}
                                        </div>

                                        <div className="border rounded-lg p-3">
                                            B. {que?.option_b}
                                        </div>

                                        <div className="border rounded-lg p-3">
                                            C. {que?.option_c}
                                        </div>

                                        <div className="border rounded-lg p-3">
                                            D. {que?.option_d} 
                                        </div>

                                    </div>

                                    <div className="mt-5">

                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                                            Correct Answer : {que?.answer}
                                        </span>

                                    </div>

                                </div>
                            )
                        })
                    :<h1 className="text-center text-gray-400">There is no any questions...</h1>}


                    </div>

                </div>

            </div>
        </>
    )
}

export default EditQuiz