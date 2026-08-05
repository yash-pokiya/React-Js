import { FaArrowRight } from "react-icons/fa";

const Introduction = () => {
    return (
        <>
            <div className='h-215 w-full flex mb-20 justify-between'>
                {/* left side */}
                <div className='h-full  w-[575px] bg-black flex justify-center relative items-center'>
                    {/* inside round */}
                    <div className='h-160 w-160 bg-white rounded-full flex justify-center  items-center flex-col absolute left-[45%]'>
                        <h1 className='text-black font-semibold text-4xl mb-3'>Do you need a designer.</h1>
                        <h1 className='text-black font-semibold text-4xl'>Request a quate!</h1>
                        <p className='text-black text-[18px] text-center text-wrap w-2/3 mt-9'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, dignissimos voluptatibus? Amet sapiente inventore tenetur.</p>
                        <h1 className='text-blue-400 font-semibold  text-4xl mt-10'>contect@dummy.com</h1>
                    </div>
                </div>

                {/* right side */}
                <div className='h-full w-220 flex flex-col justify-center'>
                    <h2 className='text-neutral-400 text-xl font-semibold ms-20'>MERN stack developer. Web designer Freelancer</h2>
                    <h1 className='font-extrabold text-5xl ms-20 text-black text-start w-2/3 mt-5 font-serif'>I'M a passionate designer with a keen eyes for details.</h1>
                    <p className='text-gray-800 text-[18px] text-wrap w-2/3 mt-9 ms-20'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cupiditate rem asperiores animi debitis deserunt consequatur quod nobis totam perferendis. Nulla, magnam. Quod minus facere dolore molestiae cumque commodi corrupti aliquid aspernatur animi ipsam officia, cum laboriosam in? Sed, nihil.</p>
                    <button className='text-white ms-20 w-fit flex justify-center items-center rounded-xl bg-black mt-8 px-4 font-bold text-xl py-4'>Lets work together <span className='ms-2 '><FaArrowRight className='mt-1' /></span></button>
                </div>
            </div>
        </>
    )
}

export default Introduction