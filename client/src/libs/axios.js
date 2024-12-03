import axios from "axios";

const axiosBaseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

// axiosBaseUrl.interceptors.response.use(
//   (response) => response, // return the response as is if successful
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // If the response status is 401, clear the token from localStorage
//       localStorage.removeItem("token");
//       // Optionally, you can redirect the user to the login page or show a logout message
//       window.location.href = "/login"; // Redirect to login (change this to your login page route)
//     }
//     return Promise.reject(error); // Reject the error so it can be handled later
//   }
// );

export default axiosBaseUrl;
