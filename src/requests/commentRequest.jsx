import axios from "axios";


export const getCommentsByPostId = (postId) => {
    return axios.get(`/api/comments/getByPostId?postId=${postId}`)
}
export const createComment = (values) => {
    return axios.post("/api/comments/", values, {headers: {"Authorization":localStorage.getItem("tokenKey")}})
}