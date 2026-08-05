import React from 'react'

const QuizQuestion = ({ question, questionNo, answers, onAnswer }) => {
    if (!question) return null;

    const selectedAnswer = answers.find((item) => item.questionNo === questionNo)?.answer || "";

    return (
        <>
            <div className="p-8">

                <h2 className="text-xl font-semibold mb-8">
                    {question?.question}
                </h2>

                <div className="space-y-4">

                    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                        <input type="radio" name={`ans_${questionNo}`}
                            checked={selectedAnswer === "A"}
                            onChange={(e) => {
                                onAnswer(questionNo, e.target.value)
                            }}
                            value="A"
                        />
                        <span>{question?.option_a}</span>
                    </label>

                    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500" >
                        <input type="radio" name={`ans_${questionNo}`}
                            checked={selectedAnswer === "B"}
                            onChange={(e) => {
                                onAnswer(questionNo, e.target.value)
                            }}
                            value="B" />
                        <span>{question?.option_b}</span>
                    </label>

                    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                        <input type="radio" name={`ans_${questionNo}`}
                            checked={selectedAnswer === "C"}
                            onChange={(e) => {
                                onAnswer(questionNo, e.target.value)
                            }}
                            value="C" />
                        <span>{question?.option_c}</span>
                    </label>

                    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                        <input type="radio" name={`ans_${questionNo}`}
                            checked={selectedAnswer === "D"}
                            onChange={(e) => {
                                onAnswer(questionNo, e.target.value)
                            }}
                            value="D" />
                        <span>{question?.option_d}</span>
                    </label>
                    {question?.option_e && (
                        <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                            <input type="radio" name={`ans_${questionNo}`}
                                checked={selectedAnswer === "E"}
                                onChange={(e) => {
                                    onAnswer(questionNo, e.target.value)
                                }}
                                value="E" />
                            <span>{question?.option_e}</span>
                        </label>
                    )}

                </div>


            </div>

        </>
    )
}

export default QuizQuestion