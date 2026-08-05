import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditQuestion = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [question, setQuestion] = useState({
        question: "",
        optA: "",
        optB: "",
        optC: "",
        optD: "",
        optE: "",
        answer: "",
        mark: 0,
        questionType: ""
    })
    const getQuestion = async () => {
        try {
            const response = await axios(`/api/question/read/${id}`)
            if (response.data.success) {
                setQuestion(response.data.data[0])
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(question)

    useEffect(() => {
        getQuestion()
    }, [])

    const handleChange = (e) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`/api/question/update/${id}` , {
                question: question.question,
                optA: question.option_a,
                optB: question.option_b,
                optC: question.option_c,
                optD: question.option_d,
                optE: question.option_e || null,
                answer: question.answer,
                marks: question.mark,
                questionType: question.questionType
            });
            if(response.data.success){
                alert(response.data.message)
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Edit Question
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Update question details.
                        </p>

                    </div>

                    <button
                        className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Back
                    </button>

                </div>

                {/* Form */}

                <div className="bg-white rounded-xl shadow-md p-8">

                    <form className="space-y-8" onSubmit={handleSubmit}>

                        {/* Question */}

                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Question
                            </label>

                            <textarea
                                rows="4"
                                placeholder="Enter question..."
                                className="w-full border rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                                value={question.question}
                                name="question"
                                onChange={handleChange}
                                required
                            ></textarea>

                        </div>

                        {/* Options */}

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="block mb-2 font-medium">
                                    Option A
                                </label>

                                <input
                                    type="text"
                                    placeholder="Option A"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.option_a}
                                    name="option_a"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Option B
                                </label>

                                <input
                                    type="text"
                                    placeholder="Option B"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.option_b}
                                    name="option_b"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Option C
                                </label>

                                <input
                                    type="text"
                                    placeholder="Option C"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.option_c}
                                    name="option_c"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Option D
                                </label>

                                <input
                                    type="text"
                                    placeholder="Option D"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.option_d}
                                    name="option_d"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="md:col-span-2">

                                <label className="block mb-2 font-medium">
                                    Option E (Optional)
                                </label>

                                <input
                                    type="text"
                                    placeholder="Option E"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.option_e}
                                    name="option_e"
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        {/* Bottom Section */}

                        <div className="grid md:grid-cols-3 gap-6">

                            <div>

                                <label className="block mb-2 font-medium">
                                    Correct Answer
                                </label>

                                <select
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.answer}
                                    name="answer"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Answer</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                </select>

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Marks
                                </label>

                                <input
                                    type="number"
                                    placeholder="2"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.mark}
                                    name="mark"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Question Type
                                </label>

                                <select
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.questionType}
                                    name="questionType"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="easy">
                                        Easy
                                    </option>

                                    <option value="medium">
                                        Medium
                                    </option>

                                    <option value="hard">
                                        Hard
                                    </option>
                                </select>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="border-t pt-6 flex justify-end gap-4">

                            <button
                                type="button"
                                className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                                Update Question
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditQuestion;