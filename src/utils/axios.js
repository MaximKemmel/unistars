import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("sheriff_md_token");
    config.headers.Accept = { 'Access-Control-Allow-Credentials': true };
    return config;
});

export default instance;
