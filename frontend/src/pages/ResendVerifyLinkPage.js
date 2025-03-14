import React, { useState } from "react";
import useLoadingStore from "../stores/loadingStore";
import useAuthStore from "../stores/authStore";

const ResendVerifyLinkPage = () => {
  const [email, setEmail] = useState("");
  const { resendVerifyEmail } = useAuthStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      await resendVerifyEmail({ email });
    } catch (error) {
      console.error("failed to resend verify link", error);
    } finally {
      stopLoading();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Resend Verify Link
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Processing..." : "Resend"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendVerifyLinkPage;
