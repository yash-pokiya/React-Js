const connection = require("../db/db");

const createQuiz = async (req, res) => {
    try {
        const { title, description, duration, passingPercentage , status } = req.body;
        const createdBy = req.user?.id;
        if (!title || !description || !duration || !passingPercentage || !status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            });
        }

        const [isExist] = await connection.execute(
            `
            SELECT id from quiz
            WHERE title = ? AND created_by = ?
            `,
            [title, createdBy]
        );

        if (isExist.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Quiz with same title already exist..!!"
            })
        }

        const [createdQuiz] = await connection.execute(
            `
            INSERT INTO quiz(title , description , duration , total_marks , passing_percentage , created_by , status)
            VALUES(? , ? , ? , ? , ? , ? , ?)
            `,
            [title, description, duration, 0, passingPercentage ?? 33.33, createdBy , status ?? "draft"]
        );

        return res.status(200).json({
            success: true,
            message: "Quiz created successfully..!!",
            data: createdQuiz
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const readQuiz = async (req, res) => {
    try {
        const quizId = req.params?.id;
        const [quiz] = await connection.execute(
            `
            SELECT * FROM quiz 
            WHERE id = ?
            `,
            [quizId]
        )
        if (quiz.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found..!!"
            })
        }
        if (quiz[0].status == "draft" && req.user?.id !== quiz[0].created_by) {
            return res.status(403).json({
                success: false,
                message: "You can not access this quiz..!!"
            })
        }

        const [questions] = await connection.execute(
            `
            SELECT 
                id,
                quiz_id ,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                option_e,
                mark,
                answer,
                question_type
                FROM questions
            WHERE quiz_id = ?
            `,
            [quizId]
        )
        if (questions.length === 0) {
            return res.status(200).json({
                data : {
                    quiz: quiz[0],
                },
                success: false,
                message: "Questions not found in this quiz..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Questions fetched successfully..!!",
            data: {
                quiz: quiz[0],
                questions: questions
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateQuiz = async (req, res) => {
    try {
        const quizId = req.params?.id;
        const { title, description, duration, totalMarks, passingPercentage , status} = req.body;
        if (!title && !description && !duration && !totalMarks && !passingPercentage) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update..!!"
            })
        }

        const [isExist] = await connection.execute(
            `
            SELECT id FROM quiz
            WHERE id = ?
            `,
            [quizId]
        )
        if (isExist.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found...!"
            })
        }

        const [updatedQuiz] = await connection.execute(
            `
            UPDATE quiz
            SET 
            title = COALESCE(? , title),
            description = COALESCE(? , description),
            duration = COALESCE(? , duration),
            total_marks = COALESCE(? , total_marks),
            passing_percentage = COALESCE(? , passing_percentage),
            status = COALESCE(? , status)
            WHERE id = ?
            `,
            [title || null, description || null, duration || null, totalMarks || null, passingPercentage || null, status , quizId]
        )

        return res.status(200).json({
            success: true,
            message: "Quiz updated successfully..!!",
            data: updatedQuiz
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteQuiz = async (req, res) => {
    try {
        const quizId = req.params?.id;
        const [quiz] = await connection.execute(
            `
            SELECT * FROM quiz
            WHERE id = ?
            `,
            [quizId]
        )
        if (quiz.length === 0) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Quiz not found..!"
                });
        }
        const [question] = await connection.execute(
            `
            DELETE FROM quiz
            WHERE id = ?
            `,
            [quizId]
        )
        return res.status(200)
            .json({
                success: true,
                message: "Quiz deleted successfully..!!",
                quiz: quiz[0]
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateStatus = async (req, res) => {
    const quizId = req.params?.id;
    const { status } = req.body;
    if (status !== "draft" && status !== "published") {
        return res.status(400).json({
            success: false,
            message: "Status must be draft or published"
        })
    }
    const [quiz] = await connection.execute(
        `
        SELECT title , description , status
        FROM quiz
        WHERE id = ?
        `,
        [quizId]
    )
    if (quiz.length === 0) {
        return res.status(404)
            .json({
                success: false,
                message: "Quiz not found..!"
            })
    }
    if (quiz[0].status === status) {
        return res.status(400).json({
            success: false,
            message: "Status is already updated..!!"
        })
    }
    const changeStatus = await connection.execute(
        `
        UPDATE quiz 
        set status = ?
        WHERE id = ?
        `, [status, quizId]
    )
    return res.status(200).json({
        success: true,
        message: "Status updated successfully..!!"
    })
}

const readAll = async (req, res) => {
    try {
        const [allFetch] = await connection.execute(
            `
            SELECT q.*, COUNT(qa.id) AS totalAttempts, u.firstName AS teacherName
            FROM quiz q
            LEFT JOIN quiz_attempts qa ON q.id = qa.quiz_id
            LEFT JOIN users u ON q.created_by = u.id
            GROUP BY q.id, u.id
            `
        )
        if (allFetch.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No quiz found..!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "All quizzes fetched successfully..!!",
            data: allFetch
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const takeQuiz = async (req, res) => {
    const quizId = req.params?.id;
    const role = req?.user?.role;
    if (role !== "student") {
        return res.status(403).json({
            success: false,
            message: "Only students can submit the quiz..!!"
        })
    }
    const [isPublished] = await connection.execute(
        `
        SELECT status, title
        FROM quiz
        WHERE id = ?
        `,
        [quizId]
    )
    if (isPublished.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Quiz not found..!!"
        })
    }
    console.log(isPublished[0].status)
    if (isPublished[0].status !== "published") {
        return res.status(400).json({
            success: false,
            message: "Quiz is not published yet..!!"
        })
    }
    const [quiz] = await connection.execute(
        `
        SELECT 
            q.quiz_id,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.option_e
        FROM questions q
        WHERE q.quiz_id = ?
        `,
        [quizId]
    )
    if (quiz.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Questions not found in this quiz..!!"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Questions fetched successfully..!!",
        quizName: isPublished[0].title,
        data: quiz
    })
}

const submitQuiz = async (req, res) => {
    try {
        const userId = req.user?.id;
        const quizId = req.params?.id;
        const role = req?.user?.role;
        const { answers } = req.body;

        if (role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Only students can submit the quiz..!!"
            })
        }

        if (!answers || answers.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No answers submitted..!!"
            })
        }

        const [quiz] = await connection.execute(
            `
                SELECT * FROM quiz
                WHERE id = ?
                `,
            [quizId]
        )
        if (quiz.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found..!!"
            })
        }
        if (quiz[0].status !== "published") {
            return res.status(400).json({
                success: false,
                message: "Quiz is not published yet..!!"
            })
        }

        const [questions] = await connection.execute(
            `
                SELECT * FROM questions
                WHERE quiz_id = ?
                `,
            [quizId]
        )
        if (answers.length < questions.length) {
            return res.status(400).json({
                success: false,
                message: "Please answer all the questions..!!"
            })
        }
        if (answers.length > questions.length) {
            return res.status(400).json({
                success: false,
                message: "You have submitted more than required answers..!!"
            })
        }
        const counts = {
            score: 0,
            totalMarks: 0
        }
        questions.map((que, idx) => {
            const ansObj = answers.find(a => a.questionNo === idx + 1);
            counts.totalMarks += que.mark;
            if (ansObj && que.answer === ansObj.answer.toUpperCase()) {
                counts.score += que.mark
            }
        })

        let isPass;
        const percentage = (counts.score * 100) / counts.totalMarks;
        if (percentage >= quiz[0].passing_percentage) {
            isPass = true;
        } else {
            isPass = false;
        }

        const [attempt] = await connection.execute(
            `
            SELECT attempt_no
            FROM quiz_attempts
            WHERE quiz_id = ? AND user_id = ?
            ORDER BY attempt_no DESC
            LIMIT 1
            `,
            [quizId, userId]
        )
        let attempts = 0;
        if (attempt.length > 0) {
            attempts = attempt[0].attempt_no + 1;
        } else if (attempt.length === 0) {
            attempts = 1;
        }
        const [finalQuizInsert] = await connection.execute(
            `
            INSERT INTO quiz_attempts(quiz_id , user_id , attempt_no , score , total_marks , percentage , is_pass)
            VALUES(? , ? , ? , ? , ? , ? , ?)
            `,
            [quizId, userId, attempts, counts.score, counts.totalMarks, percentage, isPass]
        )

        const [quizResult] = await connection.execute(
            `
           SELECT
                qa.id,
                q.title,
                qa.attempt_no,
                qa.score,
                qa.total_marks,
                qa.percentage,
                q.passing_percentage,
                qa.is_pass,
                qa.submitted_at
                FROM quiz_attempts qa
                JOIN quiz q
                ON qa.quiz_id = q.id
                WHERE qa.quiz_id = ?
                AND qa.user_id = ?
                ORDER BY qa.attempt_no DESC
                LIMIT 1
            `,
            [quizId, userId]
        )
        return res.status(200).json({
            success: true,
            message: "Quiz submitted successfully..!!",
            data: quizResult
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createQuiz,
    readQuiz,
    updateQuiz,
    deleteQuiz,
    updateStatus,
    takeQuiz,
    submitQuiz,
    readAll
}