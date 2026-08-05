import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Students() {
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("");
    const fetchAllstudent = async () => {
        const response = await axios.get("/api/teacher/attempts/all");
        const uniqueStudents = [
            ...new Map(
                response.data.data.map(student => [student.userName, student])
            ).values()
        ];
        setStudents(uniqueStudents);
    }
z
    useEffect(() => {
        fetchAllstudent()
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleBlock = async ({ id, status }) => {
        try {
            const response = await axios.patch(`/api/teacher/student/status/update/${id}`, {
                "status": status === "block" ? "active" : "block"
            });
            fetchAllstudent()
        } catch (error) {
            console.log(error);
        }
    }

    const filteredStudents = students.filter((student) => {
        const query = search.toLowerCase();
        return (
            student.email.toLowerCase().includes(query) ||
            student.userName.toLowerCase().includes(query)
        );
    });

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Students
                    </h1>
                    <p className="text-gray-500">
                        Manage all registered students
                    </p>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg" onClick={() => {
                    navigate("/student/add")
                }}>
                    + Add Student
                </button>
            </div>

            {/* Search */}
            <div className="bg-white shadow rounded-xl p-4 mb-5 flex justify-between items-center">

                <input
                    type="text"
                    placeholder="Search student..."
                    className="border rounded-lg px-4 py-2 w-80 outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => handleSearch(e)}
                />

                <span className="font-semibold text-gray-600">
                    Total Students : {filteredStudents.length}
                </span>

            </div>

            {/* Table */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-50">
                        <tr className="text-left text-gray-600">
                            <th className="p-4 text-center">Student</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Attempted Quizzes</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredStudents.map((student) => (

                            <tr
                                key={student.userName}
                                className="border-t text-center hover:bg-gray-50 transition"
                            >

                                <td className="p-4 flex items-center gap-3 justify-center w-full">

                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center font-semibold">
                                        {student.userName.charAt(0)}
                                    </div>

                                    <span className="text-center">{student.userName}</span>

                                </td>

                                <td className="text-center">{student.email}</td>

                                <td className="text-center">{student.quizzes}</td>


                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                    ${student.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {student.status}
                                    </span>
                                </td>

                                <td>

                                    <div className="flex justify-center gap-3">
                                        <button className="text-blue-600 hover:text-blue-700" onClick={() => navigate(`/student/edit/${student.id}`)}>
                                            ✏
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-700" onClick={() => navigate(`/student/view/${student.id}`)}>
                                            👁
                                        </button>

                                        {student.status === "active" ? (
                                            <button className="text-red-600 hover:text-red-700" onClick={() => handleBlock({
                                                id: student?.id,
                                                status: student.status
                                            })}>
                                                🚫
                                            </button>
                                        ) : (
                                            <button className="text-red-600 hover:text-red-700" onClick={() => handleBlock({
                                                id: student?.id,
                                                status: student.status
                                            })}>
                                                🔓
                                            </button>
                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}