import axios from "axios";

export const auth = (data, path) => {
    console.log(data)
    return axios.post("/api/auth/" + path, data)
}