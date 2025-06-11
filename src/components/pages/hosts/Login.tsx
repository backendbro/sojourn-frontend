"use client";

import { Backend_URL } from "@/constants";
import Link from "next/link";
// import GoogleButton from "../../buttons/GoogleButton";
// import FacebookButton from "../../buttons/FacebookButton";
import { useEffect, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schema/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import hidePasswordIcon from "../../../../public/assets/icons/eye-password-hide.svg";
import showPasswordIcon from "../../../../public/assets/icons/eye-password-show.svg";
import { useMutation } from "@tanstack/react-query";
import { loginHost } from "@/http/api";
import { X } from "lucide-react";
import useQueryString from "@/hooks/useQueryString";
import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("../../svgs/Spinner"));

type FormFields = z.infer<typeof LoginSchema>;

const Login = () => {
  const {
    router,
    pathname,
    params: queryParams,
    removeQueryString,
  } = useQueryString();

  //mutations
  const mutation = useMutation({
    mutationFn: loginHost,
    onSuccess: (data) => {
      location.href = "/hosts/dashboard";
    },
  });

  const [googleLoginError, setGoogleLoignError] = useState("");

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

  async function googleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    window.location.href = `${Backend_URL}/auth/google/redirect`;
  }

  async function hostLogin(data: FormFields) {
    await new Promise((resolve) => setTimeout(resolve, 3000)); //artificial delay
    mutation.mutate(data);
  }

  const clearError = () => {
    mutation.reset();
  };

  const clearGoogleError = () => {
    router.push(
      `${pathname}? ${removeQueryString("message", googleLoginError)}`
    );
    setGoogleLoignError("");
  };

  useEffect(() => {
    const message = String(queryParams.get("message"));
    if (message !== "null" && !googleLoginError) {
      setGoogleLoignError(message);
    } else {
      setGoogleLoignError("");
    }
  }, []);
  return (
    <form
      className="w-full space-y-4 sm:w-4/5"
      onSubmit={handleSubmit(hostLogin)}
    >
      {googleLoginError && (
        <div className="w-full bg-red-50 text-primary font-semibold px-3 py-2  flex items-center justify-between">
          <span>{googleLoginError}</span>
          <span onClick={clearGoogleError} className="cursor-pointer">
            <X size={17} color="red" />
          </span>
        </div>
      )}

      {mutation.isError && (
        <div className="w-full bg-red-50 text-primary font-semibold px-3 py-2 cursor-pointer flex items-center justify-between">
          <span>{mutation.error.message}</span>
          <span onClick={clearError}>
            <X size={17} color="red" />
          </span>
        </div>
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
      <div className="w-full flex items-center border-b border-b-secondary justify-between px-2">
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
        <Link className="text-primary font-semibold ml-1" href="/hosts/reset">
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
      {/* <GoogleButton onClick={googleLogin} /> */}
      {/* <FacebookButton /> */}
    </form>
  );
};

export default Login;
