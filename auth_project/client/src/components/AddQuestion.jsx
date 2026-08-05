import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddQuestion = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [actionType, setActionType] = useState("");
    const [question, setQuestion] = useState({
        question: "",
        optA: "",
        optB: "",
        optC: "",
        optD: "",
        optE: "",
        answer: "",
        marks: "",
        questionType: ""
    })

    const handleChange = (e) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/question/create` , {
                ...question,
                quizId : id
            })
            if(response.status === 201) {
                alert("Question added successfully.")
            }
            if (actionType === "another") {
                setQuestion({
                    question: "",
                    optA: "",
                    optB: "",
                    optC: "",
                    optD: "",
                    optE: "",
                    answer: "",
                    marks: "",
                    questionType: ""
                })  
            } else {
                navigate(`/quiz/edit/${id}`)
            }
        } catch (error) {
            console.log(error)
            alert("Failed to add question.")
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Add Question
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Create a new question for this quiz.
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

                <div className="bg-white rounded-xl shadow p-8">

                    <form className="space-y-8" onSubmit={handleSubmit}>

                        {/* Question */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Question
                            </label>

                            <textarea
                                rows="4"
                                placeholder="Enter your question..."
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                value={question.question}
                                name="question"
                                onChange={handleChange}
                                required
                            />

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
                                    value={question.optA}
                                    name="optA"
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
                                    value={question.optB}
                                    name="optB"
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
                                    value={question.optC}
                                    name="optC"
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
                                    value={question.optD}
                                    name="optD"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Option E (Optional)
                                </label>

                                <input
                                    type="text"
                                    placeholder="Option E"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={question.optE}
                                    name="optE"
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        {/* Bottom Row */}

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
                                    <option value="" disabled>Select Answer</option>
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
                                    value={question.marks}
                                    onChange={handleChange}
                                    name="marks"
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
                                    onChange={handleChange}
                                    name='questionType'
                                    required
                                >
                                    <option value="" disabled>Select Type</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
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
                                onClick={() => setActionType("save")}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save Question
                            </button>

                            <button
                                type="submit"
                                onClick={() => setActionType("another")}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Save & Add Another
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddQuestion;