import { FaAngleDoubleDown } from "react-icons/fa";

const HeroText = () => {
    return (
        <>
            <div className='flex justify-center items-center font-serif flex-col h-120'>
                <h1 className="text-start pt-10 ms-20 text-7xl tracking-tight">Hey,It's Yash Pokiya.</h1>
                <h1 className="text-start pt-5 ms-20 text-7xl tracking-tight">MERN Stack Developer</h1>
                <h1 className="text-start pt-5 ms-20 text-7xl tracking-tight">Based on Gujarat India</h1>
                <p className=" flex flex-col items-center text-center mt-15 text-sm justify-center">Scroll down <FaAngleDoubleDown className="animate-bounce mt-2" /></p>
            </div>
        </>
    )
}

export default HeroText