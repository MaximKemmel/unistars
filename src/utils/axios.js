import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  /*headers: {
    "Content-Type": "application/json",
  },*/
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("unistars_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.config &&
      !error.config._isRetry &&
      (error.response.status === 401 || error.response.status === 409)
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/refresh`,
          {
            refreshToken: localStorage.getItem("unistars_refresh_token"),
          },
        );
        const loginResponse = response.data;
        localStorage.setItem("unistars_token", loginResponse.accessToken);
        return instance.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  },
);

export default instance;
