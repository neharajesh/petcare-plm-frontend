import { createContext, useContext, useEffect, useState } from "react"
import { loadAllArticles } from "../api/ArticleAPI";

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [ articles, setArticles ] = useState([]);

    return(<>
        <ArticleContext.Provider value={{ articles, setArticles }}>
            {children}
        </ArticleContext.Provider>
    </>)
}

export const useArticle = () => {
    return useContext(ArticleContext)
}