import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const TeacherDashboard = () => {
  const user = useSelector((state) => state.user.user)
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate()

  const fetchQuiz = async () => {
    const response = await axios.get("/api/teacher/own/quiz");
    setQuizzes(response.data.data)
  }
  const fetchStudentAndAttempt = async () => {
    const response = await axios.get("/api/teacher/attempts/all");
    const data = response.data.data;
    const totalStudent = new Set(data.map(student => student.userName))
    setStudents(totalStudent.size)
    setAttempts(response.data.data.length)
  }

  const handleDelete = async(id) => {
    const response = await axios.delete(`/api/quiz/delete/${id}`)
    if(response.data.success){
      alert(response.data.message)
      fetchQuiz()
    }else{
      alert(response.data.message)
    }
  }


  useEffect(() => {
    try {
      fetchQuiz()
      fetchStudentAndAttempt()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const published = quizzes.filter((quiz) => quiz.status === "published").length;
  const draft = quizzes.filter((quiz) => quiz.status !== "published").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Teacher Dashboard 👨‍🏫
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Manage your quizzes and students.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold" onClick={() => {
          navigate("/dashboard/create-quiz")
        }}>
          + Create Quiz
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Quizzes</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {quizzes.length > 0 ? quizzes.length : 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Published</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {published}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Draft</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {draft}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Students</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {students ? students : 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Attempts</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            {attempts}
          </p>
        </div>

      </div>

      {/* Recent Quizzes */}
      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Recent Quizzes
          </h2>

          <button className="text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <table className="w-full">

          <thead className="border-b">
            <tr className=" text-gray-600 text-center">
              <th className="py-3">Quiz Name</th>
              <th>Questions</th>
              <th>Attempts</th>
              <th>Marks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {quizzes.map((quiz) => {
              return (
                <tr key={quiz.id} className="border-b text-center hover:bg-gray-50">
                  <td className="py-4">{quiz.title}</td>
                  <td>{quiz.total_questions}</td>
                  <td>{quiz.totalAttempts}</td>
                  <td>{quiz.total_marks}</td>
                  <td>
                    {quiz.status === "published" ? (<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Published
                    </span>) :(<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Draft
                    </span>) }
                  </td>
                  <td className="flex gap-3 justify-center items-center mt-4">
                    <button className="text-blue-600 hover:underline" onClick={() => {
                      navigate(`/quiz/view/${quiz.id}`)
                    }}>
                      View
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => {
                      if(window.confirm(`Are you sure you want to delete ${quiz.title} ?`)){
                        handleDelete(quiz.id)
                      }
                    }}>
                      Delete
                    </button><button className="text-green-600 hover:underline" onClick={() => {
                      navigate(`/quiz/edit/${quiz.id}`)
                    }}>
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}


          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TeacherDashboard;