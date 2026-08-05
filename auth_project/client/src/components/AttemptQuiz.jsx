import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuizQuestion from './QuizQuestion';

const AttemptQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [idx, setIdx] = useState(0)
    const [title, setTitle] = useState("")
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate()

    const { id: quizId } = useParams();
    const getQuizQuestions = async () => {
        try {
            const response = await axios.get(`/api/quiz/take/${quizId}`)
            setQuestions(response.data.data)
            setTitle(response.data.quizName)
        } catch (error) {
            console.log(error)
        }
    }
    const handleAnswer = (questionNo, answer) => {
        setAnswers((prev) => {
            const exists = prev.find((item) => item.questionNo === questionNo);

            if (exists) {
                return prev.map((item) =>
                    item.questionNo === questionNo
                        ? { ...item, answer }
                        : item
                );
            }

            return [...prev, { questionNo, answer }];
        });
    };

    console.log(answers)

    const handleSubmit = async () => {
        try {
            if (answers.length < questions.length) {
                alert("Must be enter all the answers..!")
                return;
            }
            const response = await axios.post(`/api/quiz/submit/${quizId}`, { answers });
            if (response.data.success) {
                alert('Quiz submitted successfully..! You can see you results on dashboard..!')
                navigate("/dashboard/student")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQuizQuestions();
    }, [quizId])
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">

                    {/* Left Side */}
                    <div className="lg:col-span-3 bg-white rounded-xl shadow">

                        {/* Header */}
                        <div className="border-b p-5 flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {title}
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Question {idx + 1} of {questions?.length}
                                </p>
                            </div>

                        </div>

                        {/* Question */}
                        <QuizQuestion question={questions[idx]} questionNo={idx + 1} answers={answers} onAnswer={handleAnswer} />
                        {/* Footer */}
                        <div className="border-t p-5 flex justify-between">

                            <button
                                className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                                onClick={() => {
                                    setIdx((prev) => prev - 1)
                                }}
                                disabled={idx === 0}
                            >
                                Previous
                            </button>

                            <button
                                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => {
                                    if (idx === questions.length - 1) {
                                        handleSubmit()
                                    } else {
                                        setIdx((prev) => prev + 1)
                                    }
                                }}
                            >
                                {idx === questions.length - 1 ? "Submit" : "Next"}
                            </button>

                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="bg-white rounded-xl shadow p-5 h-fit sticky top-5">

                        <h3 className="font-semibold text-lg mb-4">
                            Question Palette
                        </h3>

                        <div className="grid grid-cols-5 gap-3">

                            {questions.map((_, i) => (
                                <button
                                    key={i}
                                    className={` ${(i === idx) ? "bg-blue-600 text-white" : answers.some((ans) => {
                                        return ans.questionNo === i + 1
                                    }) ? "bg-green-500" : "bg-red-500"} h-10 rounded hover:bg-gray-300  : ""}`}
                                    onClick={() => setIdx(i)}
                                >   
                                    {i + 1}
                                </button>
                            ))}

                        </div>

                        <div className="mt-8 space-y-2 text-sm">

                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded"></div>
                                Answered
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                                Current
                            </div>

                        </div>

                        <button
                            className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                            onClick={handleSubmit}
                        >
                            Submit Quiz
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default AttemptQuiz