import React, { useState } from "react";
import AppForm from "../../components/Shared/Form/AppForm";
import AppInput from "../../components/Shared/Form/AppInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../lib/AxiosInstance";
import { setPasswordSchema } from "../../schemas/auth.schema";

const SetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  const emailFromUrl = searchParams.get("email");

  const onSubmit = async (data) => {
    // Reset error first
    setError("");

    // Simple manual frontend check
    if(!emailFromUrl){
      setError("Invalid invitation link. No email found.");
      return;
    }

    try {
      // This sends the "Link" (email) and the "New Secret" (password) to the backend
      const response = await axiosInstance.put("/participants/set-password", {
        email: emailFromUrl, 
        newPassword: data.password 
      });

      if (response.status === 200) {
        console.log("Password linked and saved!");
        navigate("/login");
      }
    } catch (err) {
      // Show backend error (e.g., "Account already verified")
      setError(err.response?.data?.error || "Failed to update password.");
    }
};
    
  

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-[#1a1d23] py-10 md:py-16 px-6 md:px-30 text-center">
      <div className="w-full max-w-sm p-2">
        <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-[#fafdff] opacity-90 mb-4">
          Set Your Password
        </h2>
        <p className="text-sm text-[#fafdff] opacity-70 mb-8 text-center">
          This is your first login. Please create a secure password to continue.
        </p>

        <AppForm onSubmit={onSubmit} schema={setPasswordSchema}>
          <AppInput
            type="password"
            name="password"
            label="New Password"
            placeholder="Enter your new password"
          />
          
          <div className="text-left text-xs text-[#fafdff] opacity-60 mb-4 space-y-1 px-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
            </ul>
          </div>

          <AppInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
          />

          {/* Error message displayed right here under the input */}
          {error && (
            <p className="text-red-500 text-xs text-left mt-1 px-1 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#4c5ab6] text-white py-2 rounded-md font-semibold hover:bg-[#2e3b7f] mt-4 transition-colors"
          >
            Save Password & Continue
          </button>
        </AppForm>
      </div>
    </div>
  );
};

export default SetPassword;