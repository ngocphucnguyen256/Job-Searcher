import axios from 'axios'

export const endpoints = {
    "categories": "/categories/",
    "majors": "/majors/",
    "users": "/users/",
    "posts": "/posts/",
    "post-detail": (postId) => `/posts/${postId}/`,
    "post-detail-applies": (postId) => `/posts/${postId}/applies/`
}


export default axios.create({
    // baseURL: "https://ttken01.pythonanywhere.com"
    baseURL: "http://127.0.0.1:8000"
})