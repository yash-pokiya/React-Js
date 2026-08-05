import React from 'react'

const CaseStudy = () => {
    const images = [
        "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg",
        "https://i.pinimg.com/736x/40/3e/1c/403e1ca58aad496e0919761227c18f31.jpg",
        "https://i.pinimg.com/736x/5d/63/f0/5d63f0f8b54354686b6c79050b83ff7c.jpg",
        "https://i.pinimg.com/736x/f3/a5/f1/f3a5f1aa6873436e1c1e3274846a0a0f.jpg",
        "https://i.pinimg.com/736x/a2/e7/81/a2e781054f0f815e39eef8b2e8488d1c.jpg",
        "https://i.pinimg.com/736x/73/a1/c5/73a1c5a059c01e06fe95268fc1c5b582.jpg"
    ]
    return (
        <>
            <div className='h-105 w-full flex flex-col px-50'>
                <h1 className='font-extrabold text-5xl text-start mt-25'>Recent case study</h1>
                <p className='text-gray-800 text-[18px] text-wrap w-1/3  mt-9'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, tempore porro! Omnis eaque adipisci dicta earum assumenda, vitae nostrum perferendis praesentium sapiente consectetur. Ratione quia, molestias id iste magni veritatis eos fugit dolorum inventore qui quibusdam aspernatur officiis placeat harum.</p>
            </div>

            <div className="w-full h-full px-50 grid grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <div key={index} className="overflow-hidden">
                        <img
                            src={image}
                            className="w-full h-150 "
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default CaseStudy