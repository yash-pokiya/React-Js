import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        increment: (state, action) => {
            return state + 1;
        },
        decrement: (state, action) => {
            return state - 1;
        },
        reset: (state, action) => {
            return state = 0;
        }
    }
})

export default counterSlice.reducer;
export const { increment, decrement, reset } = counterSlice.actions