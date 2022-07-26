import axios from "axios";

export const getLikeCount = (postId) => {
  return axios.get("/api/likes/" + postId);
};

export const checkIfUserLikedPost = (userId, postId) => {
  return axios.get(`/api/likes/checkIfLiked?userId=${userId}&postId=${postId}`);
};

export const likePost = (values) => {
  return axios.post(
    "/api/likes/",
    values,{headers: {"Authorization":localStorage.getItem("tokenKey")}}
  );
};

export const removeLike = (userId, postId) => {
  return axios.post(`/api/likes/removeLike?userId=${userId}&postId=${postId}`, null,{headers: {"Authorization":localStorage.getItem("tokenKey")}});
};
