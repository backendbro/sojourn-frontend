"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, MouseEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from "@/schema/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import showPasswordIcon from "../../../public/assets/icons/eye-password-show.svg";
import hidePasswordIcon from "../../../public/assets/icons/eye-password-hide.svg";

import { useMutation } from "@tanstack/react-query";
import { getGoogleUser, signup } from "@/http/api";
import dynamic from "next/dynamic";
import useQueryString from "@/hooks/useQueryString";
import GoogleButton from "../buttons/GoogleButton";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

console.log("Coming from signup");
const Spinner = dynamic(() => import("@/components/svgs/Spinner"));

type FormFields = z.infer<typeof SignupSchema>;

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = useState({ access_token: "" });
  const [profile, setProfile] = useState({
    email: "",
    family_name: "",
    given_name: "",
    verified_email: false,
  });

  const signupGoogle = useGoogleLogin({
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

  const { params } = useQueryString();

  const refererId = params.get("ref") ? params.get("ref") : "";

  //mutations
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      router.push("/account-created");
    },
  });

  const googleMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      router.push("/account-created");
    },
    onError(error) {
      toast("Signup Error.", {
        description: error.message,
      });
    },
  });

  const [{ password, confirmPassword }, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const passwordIcon = password ? hidePasswordIcon : showPasswordIcon;

  const passwordFieldType = password ? "text" : "password";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields & { isEmailVerfied?: boolean; isGoogle?: boolean }>({
    resolver: zodResolver(SignupSchema),
  });

  const whenLoginIsPending = mutation.isPending || isSubmitting;

  const whenLoginFails = !mutation.isSuccess || mutation.isError;

  async function guestSignup(
    data: FormFields & { isEmailVerfied?: boolean; isGoogle?: boolean }
  ) {
    mutation.mutate({ ...data, ...(refererId && { refererId }) });
  }

  async function googleSignup(
    data: FormFields & { isEmailVerfied?: boolean; isGoogle?: boolean }
  ) {
    mutation.mutate({ ...data, ...(refererId && { refererId }) });
  }

  useEffect(() => {
    const fetchGoogleUser = async () => {
      if (user.access_token) {
        const data = await getGoogleUser(user.access_token);
        setProfile(data);
      }
    };
    fetchGoogleUser();
  }, [user]);

  useEffect(() => {
    const createGoogleAccount = async () => {
      if (profile.email) {
        const fields = {
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          password: "",
          isEmailVerified: profile.verified_email,
          isGoogle: true,
        };
        googleSignup(fields);
      }
    };
    createGoogleAccount();
  }, [profile]);

  return (
    <div className="w-full h-full py-6 flex items-center justify-center flex flex-col sm:py-[50px]">
      <div className="w-5/6 min-h-[200px] sj-shadow py-10 px-3 rounded-md flex items-center justify-center flex flex-col max-w-[600px]">
        {googleMutation.isPending ? (
          <Spinner color="red" size={35} />
        ) : (
          <>
            <h1 className="text-[32px] font-[400]] text-center sm:text-[26px]">
              Finish setting up your account
            </h1>
            <form
              className="w-full sm:w-4/5"
              onSubmit={handleSubmit(guestSignup)}
            >
              {mutation.isError && (
                <span className="text-primary font-semibold text-md">
                  {mutation.error.message}
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
              <input
                {...register("firstName")}
                type="text"
                placeholder="First Name"
                className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              />
              {errors.firstName && (
                <span className="text-primary font-semibold">
                  {errors.firstName.message}
                </span>
              )}
              <input
                {...register("lastName")}
                type="text"
                placeholder="Last Name"
                className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              />
              {errors.lastName && (
                <span className="text-primary font-semibold">
                  {errors.lastName.message}
                </span>
              )}
              <div className="w-full flex items-center border-b border-b-secondary justify-between px-2">
                <input
                  {...register("password")}
                  placeholder="Password"
                  type={passwordFieldType}
                  className="w-5/6 py-3 my-3 outline-none  placeholder:text-gray-400 text-[16px]"
                />
                <button
                  className="outline-none border-none"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setShowPassword(
                      (prevState: {
                        password: boolean;
                        confirmPassword: boolean;
                      }) => ({ password: !password, confirmPassword })
                    );
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

              <button
                disabled={isSubmitting || mutation.isPending}
                className="w-full flex items-center justify-center py-3 px-2 mt-5  text-white rounded-full bg-primary ease-in duration-200 hover:bg-red-800 sm:py-5"
              >
                {whenLoginIsPending ? (
                  <Spinner />
                ) : whenLoginFails ? (
                  <span>Continue</span>
                ) : (
                  <Spinner />
                )}
              </button>
              <GoogleButton onClick={signupGoogle} />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
