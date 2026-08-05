import React from 'react'
import RegistrationPage from './pages/auth/RegistrationPage'
import LoginPage from './pages/auth/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './pages/auth/Profile'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AdminDashboard from './components/dashboard/AdminDashboard'
import TeacherDashboard from './components/dashboard/TeacherDashboard'
import UserDashboard from './components/dashboard/userDashboard'

// Navu ProtectedRoute component import karyu jena thi router secure thase.
import ProtectedRoute from './components/ProtectedRoute'
import Quizzes from './components/Quizzes'
import Students from './pages/Students'
import StudentAddForm from './components/StudentAddForm'
import EditStudent from './components/EditStudent'
import CreateQuiz from './components/CreateQuiz'
import ViewQuiz from './components/ViewQuiz'
import EditQuiz from './components/EditQuiz'
import AddQuestion from './components/AddQuestion'
import EditQuestion from './components/EditQuestion'
import StudentInfoPage from './components/StudentInfoPage'
import Results from './components/Results'
import QuizPage from './pages/QuizPage'
import AttemptQuiz from './components/AttemptQuiz'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/admin' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/teacher' element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/student' element={
            <ProtectedRoute allowedRoles={['student']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path='/quizzes' element={
            <ProtectedRoute allowedRoles={['student']}>
              <QuizPage />
            </ProtectedRoute>
          }
          />
          <Route path='/students' element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <Students />
            </ProtectedRoute>
          } />
          <Route path='/student/add' element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <StudentAddForm />
            </ProtectedRoute>
          } />
          <Route path='/student/edit/:id' element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <EditStudent />
            </ProtectedRoute>
          } />
          <Route path='/dashboard/create-quiz' element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateQuiz />
            </ProtectedRoute>
          } />
          <Route path='/quiz/view/:id' element={
            <ProtectedRoute allowedRoles={["teacher", "admin", "student"]}>
              <ViewQuiz />
            </ProtectedRoute>
          } />
          <Route path="/quiz/edit/:id" element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <EditQuiz />
            </ProtectedRoute>
          } />
          <Route path='/question/add/:id' element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <AddQuestion />
            </ProtectedRoute>
          } />
          <Route path='/question/edit/:id' element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <EditQuestion />
            </ProtectedRoute>
          } />
          <Route path='/student/view/:id' element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <StudentInfoPage />
            </ProtectedRoute>}
          />
          <Route path='/results' element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Results />
            </ProtectedRoute>}
          />
          <Route path='/attempt-quiz/:id' element={
            <ProtectedRoute allowedRoles={["student"]}>
              <AttemptQuiz />
            </ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App