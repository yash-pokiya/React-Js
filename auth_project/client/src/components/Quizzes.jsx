const Quizzes = ({ per, idx, date }) => {
    return (
        <>
            {per ? (
                <tr key={idx} className="border-b hover:bg-gray-50 text-center">
                    <td className="py-4">{per.title}</td>
                    <td>{per.passing_percentage}</td>
                    <td>{per.percentage}</td>
                    <td>{date}</td>
                    <td>{per.is_pass ? "Passed" : "Failed"}</td>
                </tr>) : per && per.length === 0 ? (
                    <p>No Attempts Found</p>
                ) : null
            }
        </>
    )
}

export default Quizzes