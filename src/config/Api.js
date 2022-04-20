import axios from 'axios'

export const endpoints = {
    "categories": "/categories/",
    "posts": "/posts/",
    "majors": "/majors/"
}


export default axios.create({
    // baseURL: "https://ttken01.pythonanywhere.com"
    baseURL: "http://127.0.0.1:8000"
})