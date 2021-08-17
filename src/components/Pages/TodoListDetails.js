import "../../styles.css"
import { useEffect, useState } from "react"
import { useParams, Navigate } from "react-router";
import { deleteCurrentTodoList, updateCurrentTodoList } from "../../api/TodoApi";
import { showNotification } from "../Utilities/toast";
import { useTodo } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";

export const TodoListDetails = () => {
    const { todoId } = useParams();
    const { todoList } = useTodo();
    const navigate = useNavigate()

    const [ newTask, setNewTask ] = useState("");
    const [ currentTodo, setCurrentTodo ] = useState({})
    const [ markDone, setMarkDone ] = useState(false)

    useEffect( () => {
        let currentTodoList = todoList.find(todo => todo._id === todoId)
        setCurrentTodo(currentTodoList)
    }, [todoId, todoList])

    const deleteTodoList = async () => {
        const response = await deleteCurrentTodoList(todoId)
        showNotification(response.message)
        response.success && navigate("/todo")
    }

    const addNewTask = async () => {
        let taskToAdd = { task: newTask, isDone: false }
        let allTasks = [...currentTodo.tasks, taskToAdd]
        let currentTodoList = {...currentTodo, tasks: allTasks}
        setCurrentTodo(currentTodoList)
        const response = await updateCurrentTodoList(todoId, currentTodoList)
        showNotification(response.message)
    }

    const markAsDone = async (taskId) => {
        setMarkDone(markDone => !markDone)
        currentTodo.tasks.map(task => {
            if (task._id === taskId) {
                task.isDone = !task.isDone
            }
            return task;
        })
        console.log(currentTodo)
        setCurrentTodo(currentTodo)
        const response = await updateCurrentTodoList(todoId, currentTodo)   
        console.log(response)
        showNotification(markDone ? "Marked as undone" : "Marked as Done")
    }

    return (<>
        <div className="mg-l-2 mg-t-1">
            {!currentTodo && <Navigate to="/todo" />}
            <h1> {currentTodo?.todoListName} </h1>

            <input type="text" placeholder="Add a Task" className="todoInput mg-b-2 mg-t-1" onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={() => addNewTask()} className="pd-05 bdr-none bdr-rad-m fill-secondary-red mg-l-2"> Add </button>
            
            <div className="flex flex-row-wrap w-100">
                {currentTodo.tasks === undefined ? <p> No Tasks </p> : 
                    currentTodo.tasks.map(task => (
                        <div key={task._id} className="flex flex-space-between card-w-30 mg-1 pd-1 bdr-thin bdr-grey bdr-rad-m">
                        <p className={task.isDone ? "txt-strike w-75 mg-r-025" : "w-75 mg-r-025"}> {task.task} </p>
                        <button onClick={() => markAsDone(task._id)} className="card-w-7 h-fit pd-05 bdr-none bdr-rad-m fill-secondary-blue"> { task.isDone? "Undo Done" : "Mark as Done"} </button>
                    </div>
                    ))
                }
            </div>

            <button onClick={() => deleteTodoList()} className="txt-white pd-05 fill-primary-red bdr-none bdr-rad-m"> Delete Todo List </button>
        </div>
        <div id="notification-container"></div>
    </>)
}