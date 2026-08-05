import React from 'react';
import { FaInstagram, FaXTwitter , FaYoutube , FaLinkedin , FaTwitter   } from "react-icons/fa6";

export default function Navbar() {
    return (
        <nav className="w-full bg-[#f4f4f5] px-8 py-6 flex items-center justify-between font-sans relative">

            <ul className="flex ms-30 items-center gap-6 text-[#71717a] text-sm font-medium">
                <li>
                    <a href="#home" className="text-black text-xl font-bold">Home</a>
                </li>
                <li>
                    <a href="#about" className="hover:text-black text-xl transition-colors">About</a>
                </li>
                <li>
                    <a href="#projects" className="hover:text-black text-xl transition-colors">Projects</a>
                </li>
                <li>
                    <a href="#services" className="hover:text-black text-xl transition-colors">Services</a>
                </li>
                <li>
                    <a href="#contact" className="hover:text-black text-xl transition-colors">Contact</a>
                </li>
            </ul>

                {/*  Center    */}
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
                <h1 className="text-black text-xl font-extrabold  tracking-tight leading-none">
                    Yash The Developer
                </h1>
                <p className="text-[#71717a] text-2xl font-medium mt-1">
                    MERN Stack developer
                </p>
            </div>

            <div className="flex items-center me-30 gap-5 text-xl text-black">
                <a href="#" className="hover:opacity-70 transition-opacity"><FaXTwitter className='h-7 w-7' /></a>
                <a href="#" className="hover:opacity-70 transition-opacity"><FaInstagram className='h-7 w-7' /></a>
                <a href="#" className="hover:opacity-70 transition-opacity"><FaYoutube className='h-7 w-7' /></a>
                <a href="#" className="hover:opacity-70 transition-opacity"><FaLinkedin className='h-7 w-7'  /></a>
                <a href="#" className="hover:opacity-70 transition-opacity"><FaTwitter className='h-7 w-7'  /></a>
            </div>

        </nav>
    );  
}