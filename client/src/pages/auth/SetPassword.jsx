import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // TODO: call backend API to update password
    navigate("/"); // redirect after success
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-[#1a1d23] text-white">
      <div className="bg-[#22252b] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Set Your Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 rounded bg-gray-800"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#4c5ab6] py-2 rounded font-semibold"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default SetPassword;