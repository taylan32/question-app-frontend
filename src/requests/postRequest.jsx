import axios from "axios"

export const getAllPosts = () => {
    return axios.get('/api/posts/')
}

export const createPost = (values) => {
    return axios.post('/api/posts/', values)
}