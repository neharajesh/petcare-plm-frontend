import { createContext, useContext, useState } from "react";

const initialTodoList = JSON.parse(localStorage.getItem("cart")) || [];

const TodoContext = createContext()

export const TodoProvider = ({children}) => {
    const [todoList, setTodoList] = useState(initialTodoList)

    return(<>
        <TodoContext.Provider value={{ todoList, setTodoList }}>
            {children}
        </TodoContext.Provider>
    </>)
}

export const useTodo = () => {  
    return useContext(TodoContext)
}