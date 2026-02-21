import AppForm from "../../components/Shared/Form/AppForm";
import AppInput from "../../components/Shared/Form/AppInput";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/auth.schema";
import { useUserLogin } from "../../hooks/auth.hooks";
import { useEffect } from "react";
import Loading from "../../components/Shared/UI/Loading";

const Login = () => {
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin(); // Using your custom hook for login

  // Form submission handler
  const onSubmit = async (data) => {
    handleLogin(data);
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
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-6">
            Login to your account
          </h2>

          <AppForm onSubmit={onSubmit} schema={loginSchema}>
            <AppInput
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
            />
            <AppInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              showForgotPassword={true}
              onForgotPassword={() => navigate("/contact-us")}
            />
            <button
              type="submit"
              className="w-full bg-[#4c5ab6] text-white py-2 rounded-md font-semibold hover:bg-[#2e3b7f]"
            >
              Login
            </button>
          </AppForm>

          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/register"
              className="font-semibold text-[#4c5ab6] hover:text-[#2e3b7f] ml-1"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
