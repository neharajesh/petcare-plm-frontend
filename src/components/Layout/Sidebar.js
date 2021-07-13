import "../../styles.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { showNotification } from "../Utilities/toast";
import { Theme } from "../Utilities/Theme";
import { loadAllArticles } from "../../api/ArticleAPI";
import { useArticle } from "../../context/ArticleContext";
import { fetchAllTodoLists } from "../../api/TodoApi";
import { useTodo } from "../../context/TodoContext";

export const Sidebar = () => {
    const { token } = useAuth();
    const { setArticles } = useArticle();
    const { setTodoList } = useTodo();

    const logoutHandler = () => {
        showNotification("Logging Out")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("todoLists")
        window.location.reload();
    }

    const loadArticles = async() => {
        console.log("loading articles")
        const response = await loadAllArticles();
        console.log(response)
        setArticles(response.articles)
    }

    const loadTodos = async() => {
        console.log("loading todos")
        const response = await fetchAllTodoLists();
        console.log(response)
        localStorage.setItem("todoLists", JSON.stringify(response))
        setTodoList(response)
    }

    return (<>
        <div className="sidebarContainer">
            <Link to="/" className="header-brand txt-700"> PETCARE </Link> <br/>
            <div className="mg-tb-2">
                <Link className="navLink" to="/"> <span> Home </span> </Link> <br />
                <Link onClick={() => loadArticles()} className="navLink" to="/discover"> <span> Discover </span> </Link> <br />
                <Link onClick={() => loadTodos()} className="navLink" to="/todo"> <span> My Todos </span> </Link> <br />
                {token === "" 
                ? <Link className="navLink" to="/signin"> <span> Login </span> </Link>  
                : <Link onClick={() => logoutHandler()} className="navLink" to="/signin"> <span> Logout </span> </Link>}
            </div>

            <Theme />

            <div id="notification-container"></div>
        </div>
    </>)
}