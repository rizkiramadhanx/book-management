import axios from "axios";

const axiosBaseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default axiosBaseUrl;
