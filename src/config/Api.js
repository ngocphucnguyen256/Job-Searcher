import axios from 'axios'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


export const endpoints = {
    "categories": "/categories/",
    "majors": "/majors/",
    "posts":`/posts/`,
    "users": "/users/",
    "posts-page":(page)=> `/posts/?page=${page}`,
    "post-detail": (postId) => `/posts/${postId}/`,
    "post-detail-applies": (postId) => `/posts/${postId}/applies/`,
    "token":"/o/token/",
    "getUser":"/users/current-user/",
    "myPost":"/posts/my-posts/",
    "myPostDelete": (postId) => `/posts/${postId}/`,
    "waits": "/waits/",
    "applies":"/applies/",
    "applies-detail": (id) => `/applies/${id}/`,
    "user-detail": (userId) => `/users/${userId}/`,
    "company-detail": (userId) => `/company/${userId}/`,
    "user-rating": (userId) => `/company/${userId}/rating/`,
    "companyCommentsById": (companyId) => `/company/${companyId}/comments/`,
    "companyCreateCommentsById": (companyId) => `/company/${companyId}/create-comment/`,
    "my-applies":"/applies/my-applies/",
    "hirer":"/company/",
    "hirer-posts":(id)=> `/posts/my-posts/?id=${id}`,
    "comments":"/comments/",
    "comment-detail": (id) => `/comments/${id}/`,
    "mySavedPosts": "/my-saved-posts/",
    "savedPostDelete": (id) => `/my-saved-posts/${id}/`,
    "profile": `/user-profile/`,
    "profile-detail": (id) => `/user-profile/${id}/`,
    "education": `/education-profile/`,
    "experience": `/experience-profile/`,
    "educationDetail": (id) => `/education-profile/${id}/`,
    "experienceDetail": (id) => `/experience-profile/${id}/`,
    "getCompanyProfile": (id) => `users/${id}/company-profile/`,
    "companyPosts": (companyId) => `/company/${companyId}/company-posts/`,
}


export const client = {
    // "clientId" :"6BWELa46xitqudxnPl6pbtEk7qlXqb2RRemJnNd3",
    // "clientSecret" :"IsX5DexNhy5cxQOQalpiMDEjjLgMbgKxdbHYdPXJQ0YikEkf7IwjRtYEfci7q7cOAK64KOaZTS7JnRRUEEw0UCDyRegqZSAeGOFwUxIIxbILVbZJ70aP1cSkJ02Nd6Ss"

    //deploy
     "clientId" :"jO4kgKp2fnAQvECmpIksAxLvYUdArMEdgqQw6vZi",
     "clientSecret" :"IFFXPHlfSBzM03MT8bEQErWo0Ur7eepVi9cZ4uqUURvLGQW6qev3H4jRUhUqkCRAW3UaTRcx03b7TerplXpiWVRa0DmlwRnloMUKoH9O3jGInxQi1jUGXmgIZnLlorA1"

    //new version`
    //"clientId" :"GBwgpr34PQbf0NLHS8brq9glKxicyBGXkklDvydX",
    //"clientSecret" :"Ma5vxAbBRLZA8NUIsks2Gph5fCTHldw6ZJFWQH64Wvq2qmn6LZRu1xqRhznnUAf5mh4rTWgsYJEQPC36aAEQNOuJyIHSWODp9h7aCO19mrAPw6RNPh0DzarqJ1V7zUQD"

}


export default axios.create({
    // baseURL: "https://ttken01.pythonanywhere.com"
    // baseURL: "http://127.0.0.1:8000"
    baseURL: "https://nhat238.pythonanywhere.com"
})



