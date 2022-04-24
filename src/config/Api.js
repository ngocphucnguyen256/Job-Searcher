import axios from 'axios'




export const endpoints = {
    "categories": "/categories/",
    "majors": "/majors/",
    "users": "/users/",
    "posts": "/posts/",
    "post-detail": (postId) => `/posts/${postId}/`,
    "post-detail-applies": (postId) => `/posts/${postId}/applies/`,
    "token":"/o/token/"
 
}


export const client = {
    "clientId" :"6BWELa46xitqudxnPl6pbtEk7qlXqb2RRemJnNd3",
    "clientSecret" :"IsX5DexNhy5cxQOQalpiMDEjjLgMbgKxdbHYdPXJQ0YikEkf7IwjRtYEfci7q7cOAK64KOaZTS7JnRRUEEw0UCDyRegqZSAeGOFwUxIIxbILVbZJ70aP1cSkJ02Nd6Ss"
}


export default axios.create({
    // baseURL: "https://ttken01.pythonanywhere.com"
    baseURL: "http://127.0.0.1:8000"
})



