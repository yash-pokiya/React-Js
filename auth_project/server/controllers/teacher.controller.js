const connection = require("../db/db");

const getAllAttempts = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const [quizes] = await connection.execute(
            `
            SELECT * FROM 
            quiz_attempts
            WHERE quiz_id = ?
            `,
            [quizId]
        )

        const [data] = await connection.execute(
            `
            SELECT u.userName,
                    u.email,
                    u.firstName,
                    q.title,
                    q.total_marks,
                    q.passing_percentage,
                    a.attempt_no,
                    a.score,
                    a.percentage,
                    a.is_pass,
                    a.submitted_at
            FROM users u
            JOIN quiz_attempts a ON u.id = a.user_id
            JOIN quiz q ON a.quiz_id = q.id
            WHERE q.id = ?
            `,
            [quizId]
        )
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No attempts found for this quiz..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Data fetched successfully..!!",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAttemptOfStudent = async (req, res) => {
    try {
        const userId = req.params.id || req.params.userId;
        const [getData] = await connection.execute(
            `
            SELECT u.userName,
                u.email,
                u.firstName,
                q.title,
                q.total_marks,
                q.passing_percentage,
                a.attempt_no,
                a.score,
                a.percentage,
                a.is_pass,
                a.submitted_at
            FROM users u
            JOIN quiz_attempts a ON u.id = a.user_id
            JOIN quiz q ON a.quiz_id = q.id
            WHERE u.id = ?
            `,
            [userId]
        )
        if (getData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No attempts found for this student..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Data fetched successfully..!!",
            data: getData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllQuizAndAttempts = async (req, res) => {
    try {
        const [getData] = await connection.execute(
            `
            SELECT u.userName,
                u.email,
                u.firstName,
                q.title AS quizTitle,
                q.description AS quizDescription,
                q.total_marks,
                q.passing_percentage,
                a.attempt_no,
                a.score,
                a.percentage,
                a.is_pass,
                a.submitted_at
            FROM users u
            JOIN quiz_attempts a ON u.id = a.user_id
            JOIN quiz q ON a.quiz_id = q.id
            `,
        )
        if (getData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No attempts found..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Data fetched successfully..!!",
            totalAttempts: getData.length,
            data: getData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllStudent = async (req, res) => {
    try {
        const [getData] = await connection.execute(
            `
            SELECT u.id, u.userName, u.email, u.firstName, u.status, u.role,
            COUNT(DISTINCT qa.quiz_id) AS quizzes
            FROM users u
            LEFT JOIN quiz_attempts qa ON u.id = qa.user_id
            WHERE u.role = "student"
            GROUP BY u.id
            `
        )
        return res.status(200)
            .json({
                success: true,
                message: "User fetched success...!",
                data: getData
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateStudentStatus = async (req, res) => {
    if (!req.body) {
        return res.status(400)
            .json({
                success: false,
                message: "body is required..!!"
            })
    }
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400)
            .json({
                success: false,
                message: "Status is required..!!"
            })
    }
    try {
        const [changeStatus] = await connection.execute(
            `
            UPDATE users
            set status = ?
            WHERE id = ?
            `,
            [status, id]
        )
        return res.status(200).json({
            success: true,
            message: "Status changed successfully..!!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getStudentData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Id is required..!!"
                })
        }
        const [getData] = await connection.execute(
            `
            SELECT u.id, u.userName, u.email, u.firstName, u.lastname,  u.status, u.role,
            COUNT(DISTINCT qa.quiz_id) AS quizzes
            FROM users u
            LEFT JOIN quiz_attempts qa ON u.id = qa.user_id
            WHERE u.role = "student" AND u.id = ?
            GROUP BY u.id
            `,
            [id]
        )
        if (getData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Student data fetched successfully..!!",
            data: getData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateStudent = async (req , res) => {
    try {
        const id = req.params.id;
        const {firstName , lastName , email , userName} = req.body;
        const [updateUser] = await connection.execute(
            `
            UPDATE users
            set firstName = ? , lastName = ? , email = ? , userName = ?
            WHERE id = ?
            `,
            [firstName , lastName , email , userName , id]
        )
        return res.status(200)
        .json({
            success : true,
            message : "Student updated successfully..!!"
        })
    } catch (error) {
        return res.status(500)
        .json({
            success : false,
            message : error.message
        })
    }
}

const getOwnQuizes = async (req, res) => {
    try {
        const teacherId = req.user?.id;
        const [getData] = await connection.execute(
            `
            SELECT q.*, COUNT(qa.id) AS totalAttempts
            FROM quiz q
            LEFT JOIN quiz_attempts qa ON q.id = qa.quiz_id
            WHERE q.created_by = ?
            GROUP BY q.id
            `,
            [teacherId]
        )
        if (getData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No quizzes found..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Quizzes fetched successfully..!!",
            data: getData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAttemptsOnOwnQuiz = async (req, res) => {
    try {
        const teacherId = req.user?.id;

        const [getData] = await connection.execute(
            `
            SELECT 
            u.id,
            u.userName,
                u.email,
                u.firstName,
                q.title AS quizTitle,
                q.description AS quizDescription,
                q.total_marks,
                q.passing_percentage,
                a.attempt_no,
                a.score,
                a.percentage,
                a.is_pass,
                a.submitted_at
            FROM users u
            JOIN quiz_attempts a ON u.id = a.user_id
            JOIN quiz q ON a.quiz_id = q.id
            WHERE q.created_by = ?
            `,
            [teacherId]
        )
        if (getData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No attempts found..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Data fetched successfully..!!",
            totalAttempts: getData.length,
            data: getData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    getAllAttempts,
    getAttemptOfStudent,
    getAllQuizAndAttempts,
    getAllStudent,
    updateStudentStatus,
    getStudentData,
    updateStudent,
    getOwnQuizes,
    getAttemptsOnOwnQuiz
}