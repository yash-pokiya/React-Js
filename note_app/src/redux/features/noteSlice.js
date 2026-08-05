import { createSlice } from "@reduxjs/toolkit";

const getAllData = () => {
    const data = JSON.parse(localStorage.getItem("notes"))
    return data;
}

const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: getAllData() || [],
        search : ""
    },
    reducers: {
        setSearch : (state , action) => {
            state.search = action.payload;
        },
        addNote: (state, action) => {
            state.notes.push(action.payload);
            const currentNotes = JSON.parse(localStorage.getItem("notes")) || [];
            currentNotes.push(action.payload)
            localStorage.setItem("notes", JSON.stringify(currentNotes))
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter((note) => {
                return note.id !== action.payload.id
            })
            const currentNotes = JSON.parse(localStorage.getItem("notes")) || [];
            const allNotes = currentNotes.filter((note) => {
                return note.id !== action.payload.id
            })
            localStorage.setItem("notes", JSON.stringify(allNotes))
        },
        updateNote: (state, action) => {
            const { id, title, content } = action.payload
            const note = state.notes.find((note) => note.id == id);
            if (note) {
                note.title = title,
                    note.content = content
                const currentNotes = JSON.parse(localStorage.getItem("notes")) || [];
                const updateNote = currentNotes.find((note) => {
                    return note.id == id
                })
                updateNote.title = title
                updateNote.content = content
                localStorage.setItem("notes", JSON.stringify(currentNotes))
            }
        }
    }
})

export default noteSlice.reducer;
export const {addNote , deleteNote , updateNote , setSearch} = noteSlice.actions;