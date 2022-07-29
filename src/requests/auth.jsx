import axios from "axios";

export const auth = (data, path) => {
    return axios.post("/api/auth/" + path, data)
}

export const refreshToken = (values) => {
    return axios.post("/api/auth/refresh", values)
}