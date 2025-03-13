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
      console.log("register response", response);
      if (response.status === 201) {
        navigate("/login");
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

  logout: () => {
    localStorage.removeItem("js-fullstack-blog-app-user");
    localStorage.removeItem("js-fullstack-blog-app-token");
    set({ user: null, token: null, isAuthenticated: false });
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
