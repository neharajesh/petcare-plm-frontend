import "../../styles.css"
import { Link } from "react-router-dom"
import { useTodo } from "../../context/TodoContext"
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { fetchCurrentUserTodos } from "../../api/TodoApi";

export const Todo = () => {
    const { todoList, setTodoList } = useTodo();
    const { user } = useAuth();

    useEffect(async() => {
        const response = await fetchCurrentUserTodos(user._id)
        setTodoList(response)
    }, [])

    return (<div className="mg-l-2 mg-t-1">
    <h1 className="mg-b-2"> Todo List </h1>
    <Link className=" txt-s pd-05 fill-secondary-red bdr-none bdr-rad-m txt-black txt-deco-none" to="/todo/create"> Create new Todo </Link>
        <h2 className="mg-t-2"> Your Todo Lists </h2>
        <div className="flex flex-row-wrap w-100"> 
            {todoList.map(todoList => (
                <div key={todoList._id} className="pd-1 mg-1 bdr-thin bdr-rad-m bdr-grey card-vert">
                    <p className="txt-l txt-500"> {todoList.todoListName} </p>
                    <p className="txt-m txt-500 mg-t-025 txt-grey"> {todoList.tasks.filter(task => task.isDone === false).length} tasks remaining </p>
                    <br />
                    <Link className="txt-grey txt-300" to={`/todo/${todoList._id}`}> Click to View </Link>
                </div>
            ))}
        </div>
    </div>)
}