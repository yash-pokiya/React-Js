import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import ShinyText from '../components/ShinyText';
import BlurText from '../components/BlurText';

export default function Home() {
    const [value, setValue] = useState("");
    const [skills, setSkills] = useState([])
    const checkBoxHandle = (e) => {
        if (e.target.checked) {
            setSkills([...skills, e.target.value])
        } else {
            setSkills([...skills.filter((item) => item !== e.target.value)])
        }
    }
    const inputHandle = (e) => {
        setValue(e.target.value)
    }
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-7xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl  sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl flex flex-wrap justify-center items-center font-bold sm:text-3xl">
                            <BlurText
                                text="Download now!"
                                delay={800}
                                animateBy="words"
                                direction="top"
                                className="text-4xl"
                            /> <br />
                            <span className="sm:block text-4xl">

                                <ShinyText
                                    text="React"
                                    speed={3}
                                    delay={1}
                                    color="red"
                                    shineColor="orange"
                                    spread={120}
                                    direction="left"
                                    yoyo={true}
                                    pauseOnHover={true}
                                    disabled={false}
                                /></span>
                        </h2>
                        <input type="text" placeholder='enter value' className='border border-gray-300 px-4 py-2 rounded-lg' onChange={inputHandle} value={value} /><br />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setValue("")}>clear</button><br />
                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/"
                        >
                            <svg
                                fill="white"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                            </svg>
                            &nbsp; Download now
                        </Link>
                        <h1>select your skills</h1>
                        <input type="checkbox" onChange={checkBoxHandle} id="node" value="node" />
                        <label htmlFor="node">node</label><br />
                        <input type="checkbox" onChange={checkBoxHandle} id="react" value="react" />
                        <label htmlFor="react">react</label><br />
                        <input type="checkbox" onChange={checkBoxHandle} id="python" value="python" />
                        <label htmlFor="python">python</label><br />
                        <input type="checkbox" onChange={checkBoxHandle} id="java" value="java" />
                        <label htmlFor="java">java</label><br />
                        <h1>{skills.toString()}</h1>
                    </div>
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                    <img className="w-96" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75n3lCU6LtBcjcNyFA2hCDRBvKsxLkf2GKdUzpJgJBZV-_M2JHnJ_qQk&s=10 " alt="image1" />
                </div>
            </aside>

            <div className="grid  place-items-center sm:mt-20">
                <img className="sm:w-96 w-48" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75n3lCU6LtBcjcNyFA2hCDRBvKsxLkf2GKdUzpJgJBZV-_M2JHnJ_qQk&s=10" alt="image2" />
            </div>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Lorem Ipsum Yojo</h1>
        </div>
    );
}