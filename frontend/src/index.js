import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResendVerifyLinkPage from "./pages/ResendVerifyLinkPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "./stores/authStore";
import Layout from "./components/Layout";
const root = ReactDOM.createRoot(document.getElementById("root"));
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};
root.render(
  <>
    <ToastContainer />
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/blogs/:id" element={<BlogDetailPage />} />
          <Route
            exact
            path="/blog/create"
            element={
              <PrivateRoute>
                <CreateBlogPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/blog/edit/:id"
            element={
              <PrivateRoute>
                <EditBlogPage />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />

          <Route
            exact
            path="/verify-email/:token"
            element={<VerifyEmailPage />}
          />
          <Route
            exact
            path="/resend-verify-link"
            element={<ResendVerifyLinkPage />}
          />
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </Layout>
    </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
