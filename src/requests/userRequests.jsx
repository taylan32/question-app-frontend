import axios from "axios";

export const getUserActivity = (userId) => {
  return axios.get(`/api/users/activity/${userId}`);
};

export const getUserById = (userId) => {
  return axios.get(`/api/users/${userId}`, {
    headers: { Authorization: localStorage.getItem("tokenKey") },
  });
};

export const changeAvatar = (userId, avatar) => {
  return axios.post(`/api/users/changeAvatar?userId=${userId}&avatar=${avatar}`, null, {
    headers: { Authorization: localStorage.getItem("tokenKey") },
  });
};
