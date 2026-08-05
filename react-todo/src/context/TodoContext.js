import { useContext , createContext} from "react";


export const TodoContext = createContext({
    todos : [],
    addTodo : (text) => {},
    deleteTodo : (text , id) => {},
    updateTodo : (text , id) => {},
    toggleComplete : (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider