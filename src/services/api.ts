import axios from "axios"

export const api = axios.create({
    baseURL: "https://trainee.fidelis.workers.dev/api",
    headers : {
        Authorization: "Bearer 6e9a4e73-bd0e-4c40-bf40-11bcd922a58e"
    }
})