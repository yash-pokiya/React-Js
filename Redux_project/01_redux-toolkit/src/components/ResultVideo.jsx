import React from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../redux/features/collectionSlice'

const ResultVideo = ({ results }) => {
    const dispatch = useDispatch()
    return (
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                {results.map((item) => (
                    <div
                        key={item.id}
                        className="w-80 h-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg relative"
                    >
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <button className='text-white absolute top-5 right-5 h-auto w-auto px-3 py-0.5 rounded-md bg-red-400'
                            onClick={() => {
                                console.log(`clicked`)
                                dispatch(addCollection(item))
                            }}>
                            save
                        </button>
                    </div>
                ))}
            </div></>
    )
}

export default ResultVideo