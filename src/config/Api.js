import axios from 'axios'

export const endpoints = {
    "categories": "/categories/"
}

export default axios.create({
    baseURL: "https://ttken01.pythonanywhere.com"
})