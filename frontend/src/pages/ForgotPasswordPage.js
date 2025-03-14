import React, { useState } from "react";
import useLoadingStore from "../stores/loadingStore";
import useAuthStore from "../stores/authStore";
import { forgotPasswordSchema } from "../utils/validationSchemas";
import Form from "../components/Form";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { startLoading, stopLoading } = useLoadingStore();
  const { forgotPassword } = useAuthStore();

  const handleSubmit = async () => {
    try {
      startLoading();
      await forgotPassword({ email });
      setEmail("");
    } catch (error) {
      console.error("failed to resend verify link", error);
    } finally {
      stopLoading();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <Form
          schema={forgotPasswordSchema}
          onSubmit={handleSubmit}
          button="Send Reset Link"
        >
          {(control, errors) => (
            <>
              <div className="mb-4">
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
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
