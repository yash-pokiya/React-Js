import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote, updateNote } from '../redux/features/noteSlice';
import FilterData from './FilterData';

const RecentNotes = () => {
    const [editNoteId, setEditNoteId] = useState(null);
    const notes = useSelector((state) => {
        return state.noteReducer.notes;
    })
    const search = useSelector((state) => {
        return state.noteReducer.search;
    })
    const dispatch = useDispatch()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const updateHandle = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value)
        }
        else if (name === "content") {
            setContent(value)
        }

    }

    return (
        <>
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-start">
                <h2 className="text-4xl font-bold mb-8 tracking-tight">Recent Notes</h2>
                <FilterData />
                {
                    search ? <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
                        {notes.filter((note) => {
                            return note.title.toLowerCase().includes(search.toLowerCase());
                        }).map((note) => {
                            const isEdit = editNoteId === note.id;
                            return (

                                <div key={note.id} className="bg-gray-950 rounded-2xl w-full h-72 p-6 shadow-lg border border-gray-200 flex flex-col">

                                    <p className="text-sm text-white">
                                        ID: <span className="font-medium text-white">{note.id}</span>
                                    </p>
                                    <div className="relative min-h-18 mt-3">

                                        {isEdit ? <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={(e) => {
                                                updateHandle(e)
                                            }}
                                            className="absolute inset-0 w-full h-full bg-transparent border-b-2 border-white text-2xl font-bold text-white outline-none"
                                        /> : <h2
                                            className={`text-2xl font-bold text-white ${isEdit ? "invisible" : "visible"
                                                }`}
                                        >
                                            {note.title}
                                        </h2>}

                                    </div>


                                    <div className="relative flex-1 mt-4">
                                        {isEdit ? (
                                            <textarea
                                                value={content}
                                                name='content'
                                                onChange={(e) => {
                                                    updateHandle(e)
                                                }}
                                                className="w-full h-full bg-transparent border border-gray-500 rounded-lg p-2 text-white outline-none resize-none"
                                            />
                                        ) : (
                                            <p className="text-white overflow-y-auto">
                                                {note.content}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-4 flex justify-end gap-3">
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600" onClick={() => {
                                            if (isEdit) {
                                                dispatch(updateNote({
                                                    id: note.id,
                                                    title: title,
                                                    content: content
                                                }))
                                                setEditNoteId(null)
                                                setTitle("")
                                                setContent("")
                                            } else {
                                                setEditNoteId(note.id)
                                                setTitle(note.title)
                                                setContent(note.content)
                                            }

                                        }}>
                                            {isEdit ? "Done" : "Edit"}
                                        </button>

                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => {
                                            dispatch(deleteNote({
                                                id: note.id
                                            }))
                                            setEditNoteId(null)
                                            setTitle("")
                                            setContent("")
                                        }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
                            {notes.map((note) => {
                                const isEdit = editNoteId === note.id;
                                return (

                                    <div key={note.id} className="bg-gray-950 rounded-2xl w-full h-72 p-6 shadow-lg border border-gray-200 flex flex-col">

                                        <p className="text-sm text-white">
                                            ID: <span className="font-medium text-white">{note.id}</span>
                                        </p>
                                        <div className="relative min-h-18 mt-3">

                                            {isEdit ? <input
                                                type="text"
                                                name="title"
                                                value={title}
                                                onChange={(e) => {
                                                    updateHandle(e)
                                                }}
                                                className="absolute inset-0 w-full h-full bg-transparent border-b-2 border-white text-2xl font-bold text-white outline-none"
                                            /> : <h2
                                                className={`text-2xl font-bold text-white ${isEdit ? "invisible" : "visible"
                                                    }`}
                                            >
                                                {note.title}
                                            </h2>}

                                        </div>


                                        <div className="relative flex-1 mt-4">
                                            {isEdit ? (
                                                <textarea
                                                    value={content}
                                                    name='content'
                                                    onChange={(e) => {
                                                        updateHandle(e)
                                                    }}
                                                    className="w-full h-full bg-transparent border border-gray-500 rounded-lg p-2 text-white outline-none resize-none"
                                                />
                                            ) : (
                                                <p className="text-white overflow-y-auto">
                                                    {note.content}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-4 flex justify-end gap-3">
                                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600" onClick={() => {
                                                if (isEdit) {
                                                    dispatch(updateNote({
                                                        id: note.id,
                                                        title: title,
                                                        content: content
                                                    }))
                                                    setEditNoteId(null)
                                                    setTitle("")
                                                    setContent("")
                                                } else {
                                                    setEditNoteId(note.id)
                                                    setTitle(note.title)
                                                    setContent(note.content)
                                                }

                                            }}>
                                                {isEdit ? "Done" : "Edit"}
                                            </button>

                                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => {
                                                dispatch(deleteNote({
                                                    id: note.id
                                                }))
                                                setEditNoteId(null)
                                                setTitle("")
                                                setContent("")
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                }

            </div>
        </>
    )
}

export default RecentNotes