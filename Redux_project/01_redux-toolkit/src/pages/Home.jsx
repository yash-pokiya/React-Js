import React from 'react'
import Searchbar from '../components/Searchbar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'

const Home = () => {
    return (
        <>
            <div className='h-screen w-full flex flex-col justify-start items-center bg-gray-950 text-white'>
                <div className='h-24 w-2/4 bg-gray-900 flex items-center justify-center'>
                    <Searchbar />
                </div>
                <div className='h-24 flex items-center justify-center'>
                    <Tabs />
                </div>
                <ResultGrid />
            </div>
        </>
    )
}

export default Home