import { FaArrowRight } from "react-icons/fa";
import { BiLogoUpwork } from "react-icons/bi";
import { SiFreelancer } from "react-icons/si";
import { RiFiverrFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiPhone } from "react-icons/gi";

const Footer = () => {
    return (
        <>
            <div>
                <footer>
                    <div className='h-110 w-full bg-black flex justify-center items-start'>
                        {/* left div */}
                        <div className='px-auto ms-50 w-1/2 mt-5'>
                            <h1 className='text-white pt-10 font-bold text-4xl'>Have a Project idea. get in </h1>
                            <h1 className='text-white text-4xl font-bold'> touch and let's chat!</h1>
                            <p className='text-white text-wrap pt-6 w-4/5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quas a obcaecati aliquam accusantium aspernatur fuga voluptates veniam repudiandae temporibus</p>
                            <button className='text-black flex justify-center items-center bg-white mt-8 px-3 font-bold text-xl py-3'>Lets work together <span className='ms-2 '><FaArrowRight className='mt-1' /></span></button>
                        </div>
                        {/* right div */}
                        <div className='px-auto ms-50 w-1/2 mt-5 flex flex-col '>
                            {/* first div */}
                            <div className="w-100 h-18 border flex border-t-gray-300 border-b-gray-300 mt-10">
                                <div className="bg-white w-1/3 h-auto flex justify-center items-center">
                                    <RiFiverrFill className="h-full w-full" />
                                </div>
                                <div className="bg-black w-2/3 h-auto">
                                    <div >
                                        <h1 className="text-white text-3xl font-bold">Fiverr</h1>
                                        <p className="text-white text-xl font-semibold">@Yash.developer</p>
                                    </div>
                                </div>
                            </div>
                            {/* second div */}
                            <div className="w-100 h-18 border flex border-t-gray-300 border-b-gray-300 mt-10">
                                <div className="bg-white w-1/3 h-auto flex justify-center items-center">
                                    <SiFreelancer className="h-full w-full" />
                                </div>
                                <div className="bg-white w-2/3 h-auto">
                                    <div >
                                        <h1 className="text-black text-3xl font-bold">Freelancer</h1>
                                        <p className="text-black text-xl font-semibold">@Yash.developer</p>
                                    </div>
                                </div>
                            </div>
                            {/* third div */}
                            <div className="w-100 h-18 border flex border-t-gray-300 border-b-gray-300 mt-10">
                                <div className="bg-white w-1/3 h-auto">
                                    <BiLogoUpwork className="h-full w-full flex justify-center items-center" />
                                </div>
                                <div className="bg-black w-2/3 h-auto">
                                    <div >
                                        <h1 className="text-white text-3xl font-bold">Upwork</h1>
                                        <p className="text-white text-xl font-semibold">@Yash.developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Middle div */}
                    <div className="flex justify-between items-center w-full h-50 bg-black">
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-20 h-20"><MdEmail className="w-full text-sky-500 h-full" /></div>
                            <h1 className="text-white text-2xl font-bold">Email Address</h1>
                            <h2 className="text-gray-500 text-xl font-semibold">yashpokiya44@gmail.com</h2>
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-20 h-20"><FaLocationDot className="w-full text-pink-500 h-full" /></div>
                            <h1 className="text-white text-2xl font-bold">Location</h1>
                            <h2 className="text-gray-500 text-xl font-semibold">Surat, Gujarat</h2>
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-20 h-20"><GiPhone className="w-full text-teal-600 h-full" /></div>
                            <h1 className="text-white text-2xl font-bold">Phone number</h1>
                            <h2 className="text-gray-500 text-xl font-semibold">+91 8200559351</h2>
                        </div>
                    </div>

                    {/* last div*/}

                    <div className="flex justify-between items-center w-full h-50 bg-black">
                        <div className="text-center w-1/3 mt-20">
                            <h1 className="text-white text-xl font-extrabold  tracking-tight leading-none">
                                Yash The Developer
                            </h1>
                            <p className="text-[#71717a] text-2xl font-medium mt-1">
                                MERN Stack developer
                            </p>
                        </div>

                        <div className="text-center w-1/3 mt-20">
                            <ul className="flex justify-center items-center gap-6 text-[#71717a] text-sm font-medium">
                                <li>
                                    <a href="#home" className="text-white text-xl font-bold">Home</a>
                                </li>
                                <li>
                                    <a href="#about" className="hover:text-white text-xl transition-colors">About</a>
                                </li>
                                <li>
                                    <a href="#projects" className="hover:text-white text-xl transition-colors">Projects</a>
                                </li>
                                <li>
                                    <a href="#services" className="hover:text-white text-xl transition-colors">Services</a>
                                </li>
                                <li>
                                    <a href="#contact" className="hover:text-white text-xl transition-colors">Contact</a>
                                </li>
                            </ul>

                        </div>
                            <div className="text-center w-1/3 mt-20">
                                <h1 className="text-[#71717a] text-xl  ">@2026Yash</h1>
                            </div>
                    </div>


                </footer>
            </div>
        </>
    )
}

export default Footer