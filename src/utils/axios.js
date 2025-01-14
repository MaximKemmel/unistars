import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("unistars_token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
);

export default instance;
