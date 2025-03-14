import { create } from "zustand";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("js-fullstack-blog-app-user")) || null,
  token: localStorage.getItem("js-fullstack-blog-app-token") || null,
  isAuthenticated: !!localStorage.getItem("js-fullstack-blog-app-token"),

  register: async (userData, navigate) => {
    try {
      const response = await api.post("/users/register", userData);
      if (response.status === 201) {
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  },

  login: async (credentials, navigate) => {
    try {
      const response = await api.post("/users/login", credentials);

      if (response.status === 200) {
        localStorage.setItem(
          "js-fullstack-blog-app-token",
          response.data.token
        );

        const decodedUser = jwtDecode(response.data.token);
        localStorage.setItem(
          "js-fullstack-blog-app-user",
          JSON.stringify(decodedUser)
        );
        if (decodedUser) {
          set({
            user: decodedUser,
            token: response.data.token,
            isAuthenticated: true,
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/users/verify-email/${token}`);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Verify email failed:", error);
    }
  },
  resendVerifyEmail: async (payload) => {
    try {
      await api.post("/users/resend-verification-email", payload);
    } catch (error) {
      console.error("Resend verify email failed:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("js-fullstack-blog-app-user");
    localStorage.removeItem("js-fullstack-blog-app-token");
    set({ user: null, token: null, isAuthenticated: false });
    window.location.href = "/";
  },

  //   fetchUser: async () => {
  //     try {
  //       const response = await axios.get("/api/me", {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //       set({ user: response.data.user });
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error);
  //     }
  //   },
}));

export default useAuthStore;
