import React, { useEffect, useState } from 'react'
import Quizzes from './Quizzes'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Results = () => {
    const user = useSelector((state) => state.user.user)
    const [attempts, setAttempts] = useState([])
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
    return (
        <>
            <div className='mt-10 flex flex-col gap-10'>
                <h1 className='text-3xl font-bold ms-10 text-blue-600'>Result Of Your Attended Quizzes</h1>
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
                            attempts.map((per, idx) => {
                                const date = new Date(per.submitted_at).toLocaleDateString("en-GB");
                                return (
                                    <Quizzes key={idx} date={date} per={per} />
                                )
                            })
                        }
                    </tbody>

                </table> :
                    <p className="text-center text-gray-500">No Result Found</p>
                }
            </div>
        </>
    )
}

export default Results