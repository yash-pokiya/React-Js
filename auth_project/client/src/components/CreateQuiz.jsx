import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState({
        title: "",
        description: "",
        duration: null,
        passingPercentage: null,
        status: "draft"
    })

    const handleChange = (e) => {
        setQuizData({
            ...quizData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/quiz/create", quizData);
            alert("Quiz created successfully.");
            navigate("/dashboard/teacher");
        } catch (error) {
            console.log(error);
            alert("Failed to create quiz.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create New Quiz
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill in the quiz details before adding questions.
                    </p>
                </div>

                {/* Form Card */}

                <div className="bg-white rounded-xl shadow-md p-8">

                    <form className="space-y-8" onSubmit={handleSubmit}>

                        {/* Quiz Title */}

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Quiz Title <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter quiz title"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                value={quizData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                rows={5}
                                name="description"
                                placeholder="Write a short description..."
                                className="w-full border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                                value={quizData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* Duration & Total Marks */}

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Duration (Minutes)
                                </label>

                                <input
                                    type="number"
                                    name="duration"
                                    placeholder="60"
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={quizData.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Passing Percentage
                                </label>

                                <input
                                    min={33}
                                    max={100}
                                    type="number"
                                    name="passingPercentage"
                                    placeholder="33"
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={quizData.passingPercentage}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        {/* Status */}

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Quiz Status
                            </label>

                            <select
                                name="status"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                value={quizData.status}
                                required
                            >
                                <option value={"draft"}>Draft</option>
                                <option value={"published"}>Published</option>
                            </select>
                        </div>

                        {/* Footer */}

                        <div className="border-t pt-6 flex justify-end gap-4">

                            <button
                                type="button"
                                className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Create Quiz
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateQuiz;