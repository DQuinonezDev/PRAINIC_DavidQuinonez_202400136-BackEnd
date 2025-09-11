import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
});

// interceptor para adjuntar token automáticamente
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
