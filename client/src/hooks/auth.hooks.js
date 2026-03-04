import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify"; // Replace with your toast library
import { registerUser, loginUser } from "../services/AuthServices";

export const useUserRegistration = () => {
  return useMutation({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      toast.success("User registration successful!");
      // Handle additional actions like redirecting or updating state
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success("Login successful!");

      if(data.mustSetPassword) {
        window.location.href = "/set-password"; // Redirect to set password page
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
};
