import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <section className='flex items-center justify-center mt-10'>
            <nav className='bg-black/60 backdrop-blur-sm w-[80%] rounded-full fixed text-white px-6 py-4 flex items-center justify-between'>
            <h1 className=' navHeading text-xl font-bold hover:text-black hover:bg-white/70 transition-all duration-300 px-2 py-1  rounded-full '>Company Name </h1>
            <ul className='flex items-center justify-center gap-x-4 text-lg font-medium'>
                <li className='hover:text-white hover:bg-black transition-all duration-300 rounded-full px-2 py-1'><Link to="/">Home</Link></li>
                <li className='hover:text-white hover:bg-black transition-all duration-300 rounded-full px-2 py-1'><Link to="/product">Products</Link></li>
                <li className='hover:text-white hover:bg-black transition-all duration-300 rounded-full px-2 py-1'><Link to="/about">About Us</Link></li>
                <li className='hover:text-white hover:bg-black transition-all duration-300 rounded-full px-2 py-1'><Link to="/contact">Contact Us</Link></li>
            </ul>
        </nav>
    </section>

    </>
  )
}

export default Navbar