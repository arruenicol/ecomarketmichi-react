import axios from "axios";

const api = axios.create({
    baseURL: "https://ecomarket-992494024913.us-central1.run.app/api",
    headers:{
        "Content-Type": "application/json"
    }
});

export default api;