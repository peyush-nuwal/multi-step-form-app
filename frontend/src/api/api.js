import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
   
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 🔥 No quotes around token
        }
        return config;
    },
    (error) => Promise.reject(error)
  );

export const apiPost = async (url, data) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post(`http://localhost:3000${url}`, data, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res;
    } catch (err) {
        console.error("Error in API POST:", err);
        throw err;
    }
  };

export default axiosInstance;