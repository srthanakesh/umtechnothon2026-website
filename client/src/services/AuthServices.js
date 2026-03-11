import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../lib/AxiosInstance";

// Register a new participant
export const registerUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post(
      "/participants/register",
      userData
    );

    if (data) {
      Cookies.set("accessToken", data?.accessToken);
      Cookies.set("refreshToken", data?.refreshToken);
      window.dispatchEvent(new Event("authChanged"));
    }

    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

// Login an existing participant
export const loginUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/participants/login", userData);

    if (data) {
      Cookies.set("accessToken", data?.accessToken, { expires: 7 });
      Cookies.set("refreshToken", data?.refreshToken, { expires: 7 });
      window.dispatchEvent(new Event("authChanged"));
    }

    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

// Logout the user and remove JWT tokens from cookies
export const logoutUser = async () => {
  try {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  } catch (err) {
    throw new Error(err);
  }
};

// Get current user details from the decoded JWT token
export const getCurrentUser = () => {
  const accessToken = Cookies.get("accessToken");

  let decodedToken = null;

  if (accessToken) {
    decodedToken = jwtDecode(accessToken);

    return {
      _id: decodedToken?.participant_id,
      full_name: decodedToken?.full_name,
      email: decodedToken?.email,
      role: decodedToken?.role,
      team_id: decodedToken?.team_id,
      is_leader: decodedToken?.is_leader
    };
  }

  return decodedToken;
};
