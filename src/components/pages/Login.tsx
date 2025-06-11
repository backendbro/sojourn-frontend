"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleButton from "../buttons/GoogleButton";
import { useEffect, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schema/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import hidePasswordIcon from "../../../public/assets/icons/eye-password-hide.svg";
import showPasswordIcon from "../../../public/assets/icons/eye-password-show.svg";
import Spinner from "../svgs/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGoogleUser, login, loginWithGoogle } from "@/http/api";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

type FormFields = z.infer<typeof LoginSchema>;

console.log("Coming from login");
const Login = () => {
  const [user, setUser] = useState({ access_token: "" });
  const [profile, setProfile] = useState({
    email: "",
  });

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUser(tokenResponse);
    },
    onError: (error) => {
      toast("Login Message", {
        description: "Could not login at this time. Please try again.",
        action: {
          label: "close",
          onClick: () => null,
        },
      });
    },
  });

  const googleMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: async (data) => {
      location.href = "/";
    },
  });

  //mutations
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data && data.path === "host") {
        location.href = "/hosts/dashboard/properties";
      } else {
        location.href = "/";
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const passwordIcon = showPassword ? hidePasswordIcon : showPasswordIcon;

  const passwordFieldType = showPassword ? "text" : "password";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(LoginSchema) });

  const whenLoginIsPending = mutation.isPending || isSubmitting;

  const whenLoginFails = !mutation.isSuccess || mutation.isError;

  async function guestLogin(data: FormFields) {
    mutation.mutate(data);
  }

  useEffect(() => {
    const fetchGoogleUser = async () => {
      if (user.access_token) {
        // const data = await getGoogleUser(user.access_token);
        // setProfile(data);
        const response = await axios.post(
          `https://sojourn-backend-api-xk5x.onrender.com/api/v1/google/userinfo`,
          { access_token: user.access_token },
          { withCredentials: true }
        );
        console.log(response);
      }
    };
    fetchGoogleUser();
  }, [user]);

  useEffect(() => {
    const googleSignin = async () => {
      if (profile.email) {
        googleMutation.mutate(profile.email);
      }
    };
    googleSignin();
  }, [profile]);

  return (
    <div className="w-full h-full py-6 flex items-center justify-center sm:py-[50px]">
      <div className="w-5/6 min-h-[200px] sj-shadow p-3 rounded-md flex items-center justify-center flex flex-col max-w-[600px]">
        {googleMutation.isPending ? (
          <div className="w-5/6 min-h-[200px] flex items-center justify-center">
            <Spinner color="red" size={35} />
          </div>
        ) : (
          <>
            <h1 className="text-[32px] mt-[36px] font-semibold">Login</h1>
            <form
              className="w-full sm:w-4/5"
              onSubmit={handleSubmit(guestLogin)}
            >
              {mutation.isError && (
                <span className="text-primary font-semibold">
                  {mutation.error.message}
                </span>
              )}
              {googleMutation.isError && (
                <span className="text-primary font-semibold">
                  {googleMutation.error.message}
                </span>
              )}
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              />
              {errors.email && (
                <span className="text-primary font-semibold">
                  {errors.email.message}
                </span>
              )}
              <div className="w-full flex items-center justify-between px-2">
                <input
                  {...register("password")}
                  placeholder="Password"
                  type={passwordFieldType}
                  className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
                />
                <button
                  className="outline-none border-none"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setShowPassword((prevState: boolean) => !prevState);
                  }}
                >
                  <Image
                    src={passwordIcon}
                    alt="hide password icon"
                    width={20}
                    height={10}
                  />
                </button>
              </div>
              {errors.password && (
                <span className="text-primary font-semibold">
                  {errors.password.message}
                </span>
              )}
              <p className="my-3 px-2 text-[14px]">
                Forgot your password?
                <Link
                  className="text-primary font-semibold ml-1"
                  href="/reset-password"
                >
                  Reset
                </Link>
              </p>
              <button
                disabled={isSubmitting || mutation.isPending}
                className="w-full flex items-center justify-center py-3 px-2  text-white rounded-full bg-primary ease-in duration-200 hover:bg-red-800 sm:py-5"
              >
                {whenLoginIsPending ? (
                  <Spinner />
                ) : whenLoginFails ? (
                  <span>Login</span>
                ) : (
                  <Spinner />
                )}
              </button>
              <GoogleButton onClick={loginGoogle} />
              <p className="my-3 px-2 text-[14px] text-center">
                Don't have an account?
                <Link
                  className="text-primary font-semibold ml-1"
                  href="/signup"
                >
                  Signup
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
