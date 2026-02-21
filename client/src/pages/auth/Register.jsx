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
    <>
      {isPending && <Loading />}
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-full max-w-sm p-2">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 my-6">
            Create a new account
          </h2>

          <AppForm onSubmit={onSubmit} schema={registerSchema}>
            <AppInput
              type="text"
              name="full_name"
              label="Full Name"
              placeholder="Enter your name"
            />
            <AppSelect
              name="gender"
              label="Gender"
              placeholder="Select your gender"
              options={[
                { value: "true", label: "Male" },
                { value: "false", label: "Female" }
              ]}
            />
            <AppInput
              type="text"
              name="nationality"
              label="Nationality"
              placeholder="Enter your nationality"
            />
            <AppInput
              type="text"
              name="ic_number"
              label="IC/Passport Number"
              placeholder="Enter your IC/Passport number"
            />
            <AppInput
              type="text"
              name="university"
              label="University name"
              placeholder="Enter your university name"
            />
            <AppSelect
              name="study_year"
              label="Study Year"
              placeholder="Select your study year"
              options={[
                { value: "1", label: "Year 1" },
                { value: "2", label: "Year 2" },
                { value: "3", label: "Year 3" },
                { value: "4", label: "Year 4" }
              ]}
            />
            <AppInput
              type="text"
              name="study_course"
              label="Course of Study"
              placeholder="Enter your course"
            />
            <p className="text-sm font-semibold text-[#4c5ab6]">
              Please upload a proof to verify that you are currently an active undergraduate student in either public or private universities in Malaysia (preferably student card). Please note that failure to do so may result in your registration response being disqualified in Technothon 2025. Kindly upload it into your google drive first and submit the link at the space provided.
            </p>
            <AppInput
              type="url"
              name="verification_link"
              label="Verification Link"
              placeholder="Student verification link"
            />
            <p className="text-sm font-semibold text-[#4c5ab6]">
              The collection of your resume / CV is for demographic and internal purposes only and this will not affect on your evaluation or qualification of being a participant. Please be informed that your submission will not be shared to any third-party organisations unless necessary. Kindly upload it into your google drive first and submit the link at the space provided.
            </p>
            <AppInput
              type="url"
              name="resume_link"
              label="Resume Link"
              placeholder="Link to your resume"
            />
            <AppInput
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email. This will be used for login."
            />
            <AppInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              className="w-full bg-[#4c5ab6] text-white py-2 rounded-md font-semibold hover:bg-[#2e3b7f]"
            >
              Register
            </button>
          </AppForm>

          <p className="my-6 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold text-[#4c5ab6] hover:text-[#2e3b7f] ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
