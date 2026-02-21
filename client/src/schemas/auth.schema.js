import { z } from "zod";

export const registerSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  university: z.string().min(2, "University name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ic_number: z.string().min(6, "IC/Passport number must be at least 6 characters"),
  gender: z.string({
    required_error: "Please select your gender",
    invalid_type_error: "Gender selection is required"
  }),
  study_year: z.string({
    required_error: "Please select your study year",
    invalid_type_error: "Study year selection is required"
  }),
  study_course: z.string().min(2, "Course of study is required"),
  nationality: z.string().min(2, "Nationality is required"),
  verification_link: z.string()
    .url("Must be a valid URL")
    .nonempty("Verification link is required"),
  resume_link: z.string()
    .url("Must be a valid URL")
    .nonempty("Resume link is required")
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email format"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email format"),
});
