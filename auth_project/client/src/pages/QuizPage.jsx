import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [quizzes, setquizzes] = useState([])
    const [search, setSearch] = useState("");
    const fetchQuizzes = async () => {
        const response = await axios.get("/api/quiz/all")
        setquizzes(response.data.data)
    }
    useEffect(() => {
        fetchQuizzes()
    }, [])
    const navigate = useNavigate()
    useEffect(() => {
        if (search) {
            const filtered = quizzes.filter((quiz) => {
                return quiz.title.toLowerCase().includes(search.toLowerCase())
            })
            setquizzes(filtered)
        } else {
            fetchQuizzes()
        }
    }, [search])
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-5">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Available Quizzes
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Choose a quiz and test your knowledge.
                        </p>

                    </div>

                    <input
                        type="text"
                        placeholder="Search Quiz..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-72 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Quiz Cards */}

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

                    {/* Quiz Card */}

                    {quizzes.map((quiz) => {
                        return (
                            <div key={quiz?.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">

                                <div className="p-6">

                                    <div className="flex justify-between items-center">

                                        <h2 className="text-xl font-bold">
                                            {quiz?.title}
                                        </h2>

                                        {quiz?.status === "published" ? <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                                            Available
                                        </span> : <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                                            Not Available
                                        </span>}

                                    </div>

                                    <p className="text-gray-500 mt-3">
                                        {quiz?.description}
                                    </p>

                                    {/* Stats */}

                                    <div className="grid grid-cols-2 gap-4 mt-6">

                                        <div className="bg-gray-100 rounded-lg p-3">

                                            <p className="text-sm text-gray-500">
                                                Duration
                                            </p>

                                            <h4 className="font-semibold mt-1">
                                                {quiz?.duration} Min
                                            </h4>

                                        </div>

                                        <div className="bg-gray-100 rounded-lg p-3">

                                            <p className="text-sm text-gray-500">
                                                Questions
                                            </p>

                                            <h4 className="font-semibold mt-1">
                                                {quiz?.total_questions}
                                            </h4>

                                        </div>

                                        <div className="bg-gray-100 rounded-lg p-3">

                                            <p className="text-sm text-gray-500">
                                                Total Marks
                                            </p>

                                            <h4 className="font-semibold mt-1">
                                                {quiz?.total_marks}
                                            </h4>

                                        </div>

                                        <div className="bg-gray-100 rounded-lg p-3">

                                            <p className="text-sm text-gray-500">
                                                Passing percentage
                                            </p>

                                            <h4 className="font-semibold mt-1">
                                                {quiz?.passing_percentage} %
                                            </h4>

                                        </div>

                                    </div>

                                    {/* Footer */}

                                    <div className="flex justify-between items-center mt-8">

                                        <span className="text-sm text-gray-500">
                                            Created by {quiz?.teacherName}
                                        </span>

                                        <button
                                            className={quiz?.status === "published" ? "bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg" : "bg-red-600 block hover:bg-red-700 text-white px-5 py-2 rounded-lg cursor-not-allowed"}
                                            onClick={() => {
                                                if (quiz?.status !== "published") {
                                                    return;
                                                }
                                                navigate(`/quiz/view/${quiz?.id}`)
                                            }}
                                        >
                                            Start Quiz
                                        </button>

                                    </div>

                                </div>

                            </div>
                        )
                    })}

                </div>

            </div>

        </div>
    );
};

export default QuizPage;