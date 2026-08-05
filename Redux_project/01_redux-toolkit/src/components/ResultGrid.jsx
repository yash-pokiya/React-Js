import React, { useEffect } from 'react'

import { fetchPhotos, fetchVideos } from "../api/mediaApi"
import { setQuery, setLoading, setError, setResult, clearResult } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultImage from './ResultImage'
import ResultVideo from './ResultVideo'



const ResultGrid = () => {
    const { query, activeTab, results, loading, error } = useSelector((state) => state.search)
    const dispatch = useDispatch()
    useEffect(() => {
        const getData = async () => {
            try {
                if (!query) return;
                dispatch(setLoading())
                let data;
                if (activeTab == "photos") {
                    let response = await fetchPhotos(query)
                    data = response.results.map((item) => {
                        return (
                            {
                                id: item.id,
                                type: "photo",
                                title: item.alt_description,
                                thumbnail: item.urls?.small,
                                url: item.urls?.full
                            }
                        )
                    })
                    dispatch(setResult(data))
                }
                if (activeTab == "videos") {
                    let response = await fetchVideos(query)
                    data = response.videos.map((item) => {
                        return (
                            {
                                id: item.id,
                                type: "video",
                                title: item.user?.name,
                                thumbnail: item.image,
                                url: item.video_files[4]?.link

                            }
                        )
                    })
                    console.log(data)
                    dispatch(setResult(data))
                }
            } catch (error) {
                dispatch(setError(error))
            }

        }
        getData()
    }, [query, activeTab])
    if (loading) return <h1 className='text-white text-2xl font-bold text-center w-full'>Loading....</h1>
    if (error) return <h1 className='text-red-500 text-2xl font-bold text-center w-full'>Error while loading data!</h1>
    return (
        <>
            <div className="w-full h-fit bg-gray-950 text-white mt-5 p-6">
                {activeTab === "photos" ? (
                    <ResultImage results={results} />
                ) : (
                    <ResultVideo results={results} />
                )}
            </div>
        </>
    )
}

export default ResultGrid