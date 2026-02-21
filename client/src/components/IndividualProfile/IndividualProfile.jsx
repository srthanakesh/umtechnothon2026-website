import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";

const IndividualProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    // Only proceed with fetch when user data is available
    if (!user) {
      return; // Exit early if user is null
    }

    // Fetch the participant data from the backend
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/participants/${user._id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        setProfile(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch profile details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]); // This will re-run when user changes from null to populated

  if (!user) {
    return <p className="text-center text-lg mt-8">Loading user data...</p>;
  }

  if (loading) {
    return <p className="text-center text-lg mt-8">Loading profile data...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#d1d1d100]">
      {/* Title Outside the White Rectangle */}
      <h2 className="text-4xl font-bold text-black mb-6">INDIVIDUAL PROFILE</h2>

      {/* White Rectangle */}
      <div className="bg-[#efece6] shadow-md rounded-lg p-8 max-w-xl w-full mt-4">
        <div className="space-y-6">
          {/* Display Name */}
          <div>
            <p className="text-gray-700 font-semibold">Name:</p>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-xl w-full h-12 flex items-center">
              {profile?.full_name || user?.full_name || "Not available"}
            </div>
          </div>
          {/* Display Personal Info */}
          <div>
            <p className="text-gray-700 font-semibold">Personal Info:</p>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-xl w-full h-12 flex items-center">
              {profile?.email || user?.email || "Not available"}
            </div>
          </div>
          {/* Display University/Institution */}
          <div>
            <p className="text-gray-700 font-semibold">University/Institution:</p>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-xl w-full h-12 flex items-center">
              {profile?.university || "Not specified"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProfile;