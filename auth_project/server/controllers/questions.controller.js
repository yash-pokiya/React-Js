const connection = require("../db/db");

const createQuestion = async (req, res) => {
    try {
        const { quizId, question, optA, optB, optC, optD, optE, answer, questionType, marks } = req.body;
        if (!quizId || !question || !optA || !optB || !optC || !optD || !answer) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            });
        }
        const [isExist] = await connection.execute(
            `
            SELECT id
            FROM questions
            WHERE quiz_id = ? AND question = ?
            `,
            [quizId, question]
        );
        if (isExist.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Question already exist in same quiz..!!"
            })
        }
        const [addQuestion] = await connection.execute(
            `
            INSERT INTO questions (quiz_id , question , option_a , option_b , option_c , option_d , option_e , answer , mark , question_type)
            VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ?)
            `,
            [quizId, question, optA, optB, optC, optD, optE ?? null, answer ?? null, marks ?? 1, questionType ?? "easy"]
        )
        const [addMarkToQuiz] = await connection.execute(
            `
            UPDATE quiz
            SET total_marks = total_marks + ? ,
            total_questions = total_questions + 1
            WHERE id = ?
            `,
            [marks, quizId]
        )
        return res.status(201).json({
            success: true,
            message: "Question added successfully..!!",
            data: addQuestion
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const readQuestion = async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide queId"
            })
        }

        const [question] = await connection.execute(
            `
            SELECT question , option_a , option_b , option_c , option_d , option_e , mark , answer , question_type
            FROM questions
            WHERE id = ?
            `,
            [id]
        )
        if (question.length == 0) {
            return res.status(404).json({
                success: false,
                message: "question not found..!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Question read successfully..!!",
            data: question
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateQuestion = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field"
            });
        }
        const { question, optA, optB, optC, optD, optE, answer, questionType, marks } = req.body;

        if (!question && !optA && !optB && !optC && !optD && !optE && !answer && !questionType && !marks) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field"
            });
        }

        const id = req.params?.id;
        const [que] = await connection.execute(
            `
            SELECT id FROM questions
            WHERE id = ?
            `,
            [id]
        )
        if (que.length === 0) {
            return res.status(404).json({
                success: false,
                message: "question not found..!"
            })
        }
        const [updatedQuestion] = await connection.execute(
            `
            UPDATE questions 
            SET 
            question = COALESCE(? , question) ,
            option_a = COALESCE(? , option_a) ,
            option_b = COALESCE(? , option_b) ,
            option_c = COALESCE(? , option_c) ,
            option_d = COALESCE(? , option_d) ,
            option_e = COALESCE(? , option_e) ,
            answer = COALESCE(? , answer) ,
            mark = COALESCE(? , mark) ,
            question_type = COALESCE(? , question_type)
            WHERE id = ?
            `,
            [question ?? null, optA ?? null, optB ?? null, optC ?? null, optD ?? null, optE ?? null, answer ?? null, marks ?? null, questionType ?? null, id]
        )

        return res.status(200).json({
            success: true,
            message: "Question updated successfully..!!",
            data: updatedQuestion
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const [que] = await connection.execute(
            `
            SELECT id , quiz_id , mark FROM questions
            WHERE id = ?
            `, [id]
        )
        if (que.length === 0) {
            return res.status(404).json({
                success: false,
                message: "question not found..!"
            })
        }
        const [deleteQuestion] = await connection.execute(
            `
            DELETE FROM questions
            WHERE id = ?
            `,
            [id]
        )

        const effectOnQuizTable = await connection.execute(
            `
            UPDATE quiz
            SET total_marks = total_marks - ?,
            total_questions = total_questions - 1
            WHERE id = ?
            `,
            [que[0]?.mark, que[0]?.quiz_id]
        )
        return res.status(200).json({
            success: true,
            message: "Question deleted successfully..!!",
            data: deleteQuestion
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createQuestion,
    readQuestion,
    updateQuestion,
    deleteQuestion
}