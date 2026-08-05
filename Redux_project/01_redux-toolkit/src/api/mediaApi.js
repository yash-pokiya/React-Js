import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;


export const fetchPhotos = async (query, page = 1, per_page = 20) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query,
                page,
                per_page
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_KEY}`
            }
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchVideos = async (query, page = 1, per_page = 20) => {
    try {
        const response = await axios.get(`https://api.pexels.com/v1/videos/search`, {
            params: {
                query,
                page,
                per_page
            },
            headers: {
                Authorization: PEXELS_KEY
            }
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}