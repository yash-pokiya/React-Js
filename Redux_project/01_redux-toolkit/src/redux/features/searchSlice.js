import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : "search",
    initialState : {
        query : "",
        activeTab : "photos",
        results : [],
        loading : false,
        error : null
    },
    reducers : {
        setQuery(state , action){
            state.query = action.payload
        },
        setActiveTab (state , action){
            state.activeTab = action.payload
        },
        setLoading (state , action){
            state.loading = true
            state.error = null
        },
        setResult (state , action){
            state.results = action.payload
            state.loading = false
            state.error = null
        },
        setError (state , action){
            state.error = action.payload
            state.loading = false
            state.results = []
        },
        clearResult(state){
            state.results = []
        }
    }
})

export const {setQuery , setActiveTab , setLoading , setError , setResult , clearResult} = searchSlice.actions;

export default searchSlice.reducer;