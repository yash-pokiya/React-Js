import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Quizzes from "../Quizzes";
const UserDashboard = () => {

    const user = useSelector((state) => state.user.user)
    const [attempts, setAttempts] = useState([])
    const [quizzes, setQuizzes] = useState([])
    useEffect(() => {
        const fetchAttempt = async () => {
            try {
                const response = await axios.get(`/api/user/attempts/student/${user.id}`)
                setAttempts(response.data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAttempt()
    }, [user])
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get('/api/quiz/all')
                setQuizzes(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchQuiz()
    }, [])

    const totalPercentage = attempts.reduce((sum, per) => sum + parseFloat(per.percentage || 0), 0);
    const avg = attempts.length > 0 ? (totalPercentage / attempts.length).toFixed(2) : 0;

    const recentAttempts = [...attempts]
        .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
        .slice(0, 3);


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user.firstName} 👋
                </h1>
                <p className="text-gray-500 mt-2">
                    Ready to test your knowledge today?
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center  ">

                <div className="bg-white rounded-xl shadow p-5 ">
                    <h3 className="text-gray-500">Total Quizzes</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2 text-center">
                        {quizzes.length}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">Attempts</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {attempts.length}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">Average Score</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                        {avg}
                    </p>
                </div>

            </div>

            {/* Recent Quizzes */}
            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-semibold mb-4">
                    Recent Quizzes
                </h2>

                {attempts.length > 0 ? <table className="w-full">

                    <thead className="border-b text-center">
                        <tr className="text-center text-gray-600">
                            <th className="py-3">Quiz</th>
                            <th>Require(%)</th>
                            <th>Score(%)</th>
                            <th>Date</th>
                            <th>Passed/Failed</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            recentAttempts.map((per, idx) => {
                                const date = new Date(per.submitted_at).toLocaleDateString("en-GB");
                                return (
                                    <Quizzes key={idx} date={date} per={per}/>
                                )
                            })
                        }
                    </tbody>

                </table> : 
                <p className="text-center text-gray-500">No Attempts Found</p>
                }

            </div>

        </div>
    );
};

export default UserDashboard;