import axios from "axios"

export const getAllPosts = () => {
    return axios.get('/api/posts/')
}

export const createPost = (values) => {
    return axios.post('/api/posts/', values, {headers: {"Authorization":localStorage.getItem("tokenKey")}})
}

export const getPostById = (postId) => {
    return axios.get(`/api/posts/${postId}`)
}