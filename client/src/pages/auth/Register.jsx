import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppForm from "../../components/Shared/Form/AppForm";
import AppInput from "../../components/Shared/Form/AppInput";
import AppSelect from "../../components/Shared/Form/AppSelect";
import { registerSchema } from "../../schemas/auth.schema";
import { useUserRegistration } from "../../hooks/auth.hooks";
import Loading from "../../components/Shared/UI/Loading";

const Register = () => {
  const navigate = useNavigate();
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration(); // Using your custom hook for login

  // Form submission handler
  const onSubmit = async (data) => {
    handleUserRegistration(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-[#1a1d23]">
      <div className="w-full max-w-sm p-6 bg-[#0b0e14] border border-white/10 rounded-2xl text-center shadow-lg">
        <h2 className="text-[#fafdff] text-2xl font-bold tracking-tight mb-4">
          Registration Closed
        </h2>
        <p className="text-[#fafdff] text-sm opacity-80 mb-6 leading-relaxed">
          Participant registration is now handled externally via Google Forms. 
          If you have registered, your team leader will receive an email with instructions to set their password and access the dashboard.
        </p>
        <Link
          to="/login"
          className="inline-block w-full bg-[#4c5ab6] text-white py-2 rounded-md font-semibold hover:bg-[#2e3b7f] transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
