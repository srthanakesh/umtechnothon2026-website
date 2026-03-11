import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";
import envConfig from '../../config/envConfig';

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
        const response = await fetch(`${envConfig.serverBaseApi}/participants/${user._id}`);

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
    return <p className="text-center text-lg mt-8 text-white">Loading user data...</p>;
  }

  if (loading) {
    return <p className="text-center text-lg mt-8 text-white">Loading profile data...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-black text-[#fafdff] mb-6 uppercase tracking-tighter italic">
        Individual Profile
      </h2>

      <div className="bg-[#111827] border border-white/10 shadow-2xl rounded-2xl p-8 w-full">
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <p className="text-[#e151af] text-xs font-bold uppercase tracking-widest mb-2">Full Name</p>
            <div className="bg-[#0b0e14] border border-white/5 rounded-xl p-4 text-[#fafdff] font-medium shadow-inner">
              {profile?.full_name || user?.full_name || "Not available"}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <p className="text-[#e151af] text-xs font-bold uppercase tracking-widest mb-2">Email Address</p>
            <div className="bg-[#0b0e14] border border-white/5 rounded-xl p-4 text-[#fafdff] font-medium shadow-inner">
              {profile?.email || user?.email || "Not available"}
            </div>
          </div>

          {/* University Field */}
          <div>
            <p className="text-[#e151af] text-xs font-bold uppercase tracking-widest mb-2">University / Institution</p>
            <div className="bg-[#0b0e14] border border-white/5 rounded-xl p-4 text-[#2dcefb] font-semibold shadow-inner">
              {profile?.university || "Not specified"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProfile;