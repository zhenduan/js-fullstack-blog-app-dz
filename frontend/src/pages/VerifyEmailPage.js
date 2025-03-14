import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const { verifyEmail } = useAuthStore();
  const [verifyMessage, setVerifyMessage] = useState("");

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        setVerifyMessage("Verifying email");
        const response = await verifyEmail(token);
        if (response.status === 200) {
          setVerifyMessage("Verify email success, please go to login page.");
        }
      } catch (error) {
        console.error("Verify email failed:", error);
        setVerifyMessage(`Verify email failed + ${error}`);
      }
    };

    handleVerifyEmail();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{verifyMessage}</h1>
    </div>
  );
};

export default VerifyEmailPage;
