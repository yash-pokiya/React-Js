import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        items: JSON.parse(localStorage.getItem("collection")) || []
    },
    reducers: {
        addCollection: (state, action) => {
            const alreadyExist = state.items.find(item => item.id === action.payload.id)
            if (alreadyExist) {
                toast.warn("item already saved..!")
                return
            } else {
                state.items.push(action.payload)
                localStorage.setItem("collection", JSON.stringify(state.items))
                toast.success("saved success...!")
            }
        },
        removeColection: (state, action) => {
            const filteredItems = state.items.filter(item => item.id !== action.payload.id)
            state.items = filteredItems
            localStorage.setItem("collection", JSON.stringify(state.items))
            toast.success("item removed...!")
        },
        clearCollection: (state, action) => {
            state.items = []
            localStorage.setItem("collection", JSON.stringify(state.items))
        }
    }
})

export default collectionSlice.reducer
export const { addCollection, removeColection, clearCollection } = collectionSlice.actions