import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(3, "First name cannot be less than 3 characters"),
  lastName: z.string().min(3, "Last name cannot be less than 3 characters"),
  password: z.string().min(6, "Password cannot be less than 6 characters"),
});

export const HostSignUpSchema = z.object({
  firstName: z.string().min(3, "First name cannot be less than 3 characters"),
  lastName: z.string().min(3, "Last name cannot be less than 3 characters"),
  password: z.string().min(6, "Password cannot be less than 6characters"),
  accountType: z.string().min(6),
});

export const checkHostEmailSchema = z.object({
  email: z.string().email(),
});
