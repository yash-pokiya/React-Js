import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeColection } from '../redux/features/collectionSlice'

const CollectionPage = () => {
    const { items } = useSelector(state => state.collection)
    const dispatch = useDispatch()

    return (
        <div className="w-full h-fit min-h-[calc(100vh-80px)] bg-gray-950 text-white p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">My Collection</h1>
            
            {items.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">No items in your collection yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="w-80 h-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg relative"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <button className="text-white absolute top-5 right-5 h-auto w-auto px-3 py-0.5 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                                onClick={() => {
                                    dispatch(removeColection(item))
                                }}>
                                Remove
                            </button>
                            {item.type === 'photo' && (
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                                    image
                                </div>
                            )}
                            {item.type === 'video' && (
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                                    Video
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CollectionPage