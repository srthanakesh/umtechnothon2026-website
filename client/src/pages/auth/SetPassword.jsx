import React, { useState } from "react";
import AppForm from "../../components/Shared/Form/AppForm";
import AppInput from "../../components/Shared/Form/AppInput";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    // Reset error first
    setError("");

    // Simple manual frontend check
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // No alert, just proceed
    console.log("Success! Redirecting...");
    navigate("/login");
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

        <AppForm onSubmit={onSubmit}>
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