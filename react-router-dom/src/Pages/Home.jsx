import React from 'react'

const Home = () => {
  return (
    <>
    <section className='flex flex-col gap-y-2 items-center justify-center h-screen w-full'>
        <h1 className='text-9xl font-bold'>Homepage</h1>
        <br />
        <h1 className='text-4xl mt-3'>Steps: </h1>
        <p className='text-2xl'>1. Install react router dom</p>
        <p className='text-2xl'>2. Main.jsx == wrap App with browserRouter</p>
        <p className='text-2xl'>3. App.jsx == wrap all Routes with Routes </p>
        <p className='text-2xl'>4. App.jsx == create a Route for All Pages</p>
    </section>
    </>
  )
}

export default Home