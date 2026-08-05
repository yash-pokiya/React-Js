
const WorkProfileRightPanel = ({ num, title, icon }) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-full mt-5">
                <h1 className='text-5xl flex justify-center items-center '>{num} {icon}</h1>
                <p className="mt-5">{title}</p>
            </div>
        </>
    )
}

export default WorkProfileRightPanel