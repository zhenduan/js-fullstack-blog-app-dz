// utils/api.js
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`, // Your backend API base URL
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("js-fullstack-blog-app-token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    toast.info(response.data?.message);
    return response;
  }, // Success: return the response
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Backend responded with an error status (4xx, 5xx)
      const { status, data } = error.response;
      console.error("Backend Error:", status, data.error || data);

      // Display a global error message (e.g., using a toast notification)
      toast.error(data.error || "An error occurred. Please try again.");

      // Handle specific error statuses
      if (status === 401 || status === 498) {
        // Unauthorized: Redirect to login or refresh token
        localStorage.removeItem("js-fullstack-blog-app-token");
        localStorage.removeItem("js-fullstack-blog-app-user");
        window.location.href = "/login";
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error:", error.request);
      toast.error("Network error. Please check your connection.");
    } else {
      // Something happened in setting up the request
      console.error("Request Error:", error.message);
      toast.error("An unexpected error occurred. Please try again.");
    }

    // Propagate the error to the calling function
    return Promise.reject(error);
  }
);

export default api;
