import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ViewQuiz = () => {
    const [quizData, setQuizData] = useState({})
    const [questions, setQuestions] = useState([])
    const [search , setSearch] = useState("");
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate();
    const { id } = useParams()
    useEffect(() => {
        try {
            fetchQuizData()
        } catch (error) {
            console.log(error)
        }
    }, [])
    const fetchQuizData = async () => {
        const response = await axios.get(`/api/quiz/read/${id}`)
        setQuizData(response.data?.data?.quiz)
        setQuestions(response.data?.data?.questions)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-5">

            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-start">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                {quizData?.title}
                            </h1>

                            <p className="text-gray-500 mt-2">
                                {quizData?.description}
                            </p>

                        </div>
                        {quizData?.status === "published" ? <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
                            {quizData?.status}
                        </span> : <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium">
                            {quizData?.status}
                        </span>}


                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

                        <div className="bg-blue-50 rounded-lg p-4 text-center">

                            <p className="text-gray-500 text-sm">
                                Duration
                            </p>

                            <h3 className="text-2xl font-bold mt-1">
                                {quizData?.duration ?? "-"}
                            </h3>

                        </div>

                        <div className="bg-green-50 rounded-lg p-4 text-center">

                            <p className="text-gray-500 text-sm">
                                Total Questions
                            </p>

                            <h3 className="text-2xl font-bold mt-1">
                                {questions?.length}
                            </h3>

                        </div>

                        <div className="bg-yellow-50 rounded-lg p-4 text-center">

                            <p className="text-gray-500 text-sm">
                                Total Marks
                            </p>

                            <h3 className="text-2xl font-bold mt-1">
                                {quizData?.total_marks ?? "-"}
                            </h3>

                        </div>

                        <div className="bg-red-50 rounded-lg p-4 text-center">

                            <p className="text-gray-500 text-sm">
                                Passing Marks
                            </p>

                            <h3 className="text-2xl font-bold mt-1">
                                {
                                    (quizData?.total_marks * quizData?.passing_percentage) / 100 || "-"
                                }
                            </h3>

                        </div>

                    </div>

                </div>

                {/* Instructions */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Instructions
                    </h2>

                    <ul className="list-disc ml-5 space-y-2 text-gray-600">

                        <li>Read every question carefully.</li>

                        <li>Each question carries equal marks unless specified.</li>

                        <li>No negative marking.</li>

                        <li>Do not refresh the page during the quiz.</li>

                    </ul>

                </div>

                {/* Questions */}
                {user?.role === "student" ?
                    <button className="w-full bg-blue-500 px-2 py-4 cursor-pointer text-white rounded-lg "
                    onClick={() => {
                        navigate(`/attempt-quiz/${quizData?.id}`)
                    }}
                    >Start Quiz</button> : <div className="bg-white rounded-xl shadow p-6">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-xl font-semibold">
                                Questions
                            </h2>

                            <span className="text-gray-500">
                                {questions?.length}
                            </span>

                        </div>

                        {/* Question Card */}

                        {!questions || questions.length === 0 ? <h1 className="text-3xl text-red-600">No Questions in this quiz</h1>
                            :
                            questions.map((question, idx) => {
                                return (
                                    <div key={idx} className="border rounded-lg p-5 mb-5">

                                        <div className="flex justify-between items-center">

                                            <h3 className="font-semibold text-lg">
                                                Q{idx + 1}. {question?.question}
                                            </h3>

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {question?.mark} Marks
                                            </span>

                                        </div>

                                        <div className="mt-5 space-y-3">

                                            <div className="border rounded-lg px-4 py-3">
                                                A. {question?.option_a}
                                            </div>

                                            <div className="border rounded-lg px-4 py-3">
                                                B. {question?.option_b}
                                            </div>

                                            <div className="border rounded-lg px-4 py-3">
                                                C. {question?.option_c}
                                            </div>

                                            <div className="border rounded-lg px-4 py-3">
                                                D. {question?.option_d}
                                            </div>

                                        </div>

                                        <div className="mt-5 flex gap-3">

                                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                                                Correct Answer: {question?.answer}
                                            </span>


                                        </div>

                                    </div>
                                )
                            })}

                    </div>
                }

            </div>

        </div>
    );
};

export default ViewQuiz;