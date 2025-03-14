import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useLoadingStore from "../stores/loadingStore";
import { registerSchema } from "../utils/validationSchemas";
import Form from "../components/Form";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();

  const { register } = useAuthStore();

  const handleSubmit = async () => {
    try {
      startLoading(); // Start loading
      const response = await register({ username, email, password }, navigate);
      if (response.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      stopLoading(); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        {showMessage && (
          <p className="text-center text-green-600">
            Please visit your email to verify your account
          </p>
        )}
        <Form schema={registerSchema} onSubmit={handleSubmit} button="Register">
          {(control, errors) => (
            <>
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  {...control.register("username")}
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.username && (
                  <p className="text-red-600 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...control.register("email")}
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...control.register("password")}
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login here
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <Link className="underline" to="/resend-verify-link">
              Click here
            </Link>{" "}
            to resend verification link if expired
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
