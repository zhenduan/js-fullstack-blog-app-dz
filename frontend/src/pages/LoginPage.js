import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import useLoadingStore from "../stores/loadingStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginSchema } from "../utils/validationSchemas";
import Form from "../components/Form";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login);
  const { startLoading, stopLoading } = useLoadingStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      startLoading(); // Start loading
      await login({ email, password }, navigate);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login Page</h1>
        <p className="text-sm text-gray-600 text-center">
          Login with demo account if you don't want to create a real account
        </p>
        <p className="text-sm text-gray-600 text-center">
          <span className="font-bold">email: </span>test@example.com{" "}
          <span className="font-bold">password: </span>password123
        </p>
        <div className="space-y-6">
          <Form schema={loginSchema} onSubmit={handleSubmit} button="Login">
            {(control, errors) => (
              <>
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...control.register("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...control.register("password")}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </Form>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
