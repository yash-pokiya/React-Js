import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentInfoPage = () => {
    const [studentData, setStudentData] = useState({})
    const [studentQuizData, setStudentQuizData] = useState([])
    const { id } = useParams()
    const fetchStudentData = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/student/profile/${id}`)
            if (response.data.success) {
                setStudentData(response.data.data[0])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchStudentQuizData = async (id) => {
        try {
            const response = await axios.get(`/api/teacher/attempts/student/${id}`)
            if (response.data.success) {
                setStudentQuizData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchStudentData(id)
        fetchStudentQuizData(id)
    }, [id])
    let totalPercent = 0;
    let passedQuiz = 0;
    let failedQuiz = 0;

    studentQuizData.map((data) => {
        totalPercent += parseFloat(data.percentage);
        if(data.is_pass === 1){
            passedQuiz += 1;
        }else{
            failedQuiz += 1;
        }
    })
    const avgScore = (totalPercent / studentQuizData.length).toFixed(2)


    return (

        <div className="min-h-screen bg-gray-100 py-8 px-5">

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center">

                        <div className="flex items-center gap-5">

                            <img
                                src={`https://ui-avatars.com/api/?name=${studentData.firstName}+${studentData.lastname}&background=2563eb&color=fff&size=128`}
                                alt="Student"
                                className="w-24 h-24 rounded-full border"
                            />

                            <div>
                                <h1 className="text-3xl font-bold">
                                    {studentData.firstName}
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    {studentData.userName}
                                </p>

                                <p className="text-gray-500">
                                    {studentData.email}
                                </p>

                            </div>

                        </div>
                        {studentData.status === "active" ? <span className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                            {studentData.status}
                        </span> : <span className="px-5 py-2 rounded-full bg-red-100 text-red-700 font-semibold">
                            {studentData.status}
                        </span>}


                    </div>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500 ">
                            Total Quizzes
                        </p>

                        <h2 className="text-3xl font-bold mt-2 ">
                            {studentQuizData.length}
                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">
                            Passed
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-green-600">
                            {passedQuiz}
                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">
                            Failed
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-red-600">
                            {failedQuiz}
                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">
                            Average Score
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {avgScore}%
                        </h2>

                    </div>

                </div>

                {/* Personal Details */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Student Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 text-left">

                        <div>

                            <p className="text-gray-500">
                                First Name
                            </p>

                            <h3 className="font-semibold mt-1">
                                {studentData.firstName}
                            </h3>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Last Name
                            </p>

                            <h3 className="font-semibold mt-1">
                                {studentData.lastname}
                            </h3>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Username
                            </p>

                            <h3 className="font-semibold mt-1">
                                {studentData.userName}
                            </h3>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Email
                            </p>

                            <h3 className="font-semibold mt-1">
                                {studentData.email}
                            </h3>

                        </div>

                    </div>

                </div>

                {/* Quiz Attempts */}

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-xl font-bold">
                            Recent Quiz Attempts
                        </h2>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b text-center">

                                    <th className="py-3 text-center">
                                        Quiz
                                    </th>

                                    <th className="py-3 text-center">
                                        Score
                                    </th>

                                    <th className="py-3 text-center">
                                        Passing Percentage
                                    </th>

                                    <th className="py-3 text-center">
                                        Percentage
                                    </th>

                                    <th className="py-3 text-center">
                                        Result
                                    </th>

                                    <th className="py-3 text-center">
                                        Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {studentQuizData.length > 0 ?
                                    studentQuizData.map((item, idx) => {
                                        const rawPer = (item.score * 100) / item.total_marks
                                        const per = rawPer.toFixed(2)
                                        const date = item.submitted_at
                                        const formattedDate = new Date(date).toLocaleDateString("en-GB");
                                        return (
                                            <tr key={idx} className="border-b hover:bg-gray-50 text-center">

                                                <td className="py-4">
                                                    {item.title}
                                                </td>

                                                <td>
                                                    {item.score} / {item.total_marks}
                                                </td>
                                                <td>
                                                    {item.passing_percentage} %
                                                </td>
                                                <td>
                                                    {per} %
                                                </td>

                                                <td>

                                                    {item.is_pass ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                        Passed
                                                    </span> : <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                                        Failed
                                                    </span>}

                                                </td>

                                                <td>
                                                    {formattedDate}
                                                </td>

                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className="border-b hover:bg-gray-50">
                                        <td className="py-4">
                                            No Data Available
                                        </td>
                                    </tr>}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default StudentInfoPage;