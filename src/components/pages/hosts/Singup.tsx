"use client";

import { doesUserExists, signupHost } from "@/http/api";
import { checkHostEmailSchema, HostSignUpSchema } from "@/schema/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../../svgs/Spinner";
import { useState } from "react";
import Link from "next/link";
import useQueryString from "@/hooks/useQueryString";

type FormFields = z.infer<typeof HostSignUpSchema>;

export default () => {
  const [formStatus, setFormStatus] = useState<
    "account-check" | "create-host-account"
  >("account-check");

  const mutation = useMutation({
    mutationFn: doesUserExists,
    onSuccess: async (data) => {
      if (!data.user && !data.host) {
        setFormStatus("create-host-account");
      } else location.href = "/hosts/setup";
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<{ email: string }>({
    resolver: zodResolver(checkHostEmailSchema),
  });

  const email = getValues("email");

  const whenAccountCheckIsPending = mutation.isPending || isSubmitting;

  const whenAccountCheckFails = !mutation.isSuccess || mutation.isError;

  async function accountCheck(data: { email: string }) {
    mutation.mutate(data.email);
  }

  return formStatus === "account-check" ? (
    <div className="w-full flex flex-col justify-center items-center h-full py-24">
      <h3 className="text-2xl mb-5">
        Become a <span className="text-primary text-2xl">Sojourn</span> host
      </h3>
      <form
        className="w-full md:w-3/5 h-[50px]  space-y-2 pb-10 px-5 max-w-[500px]"
        onSubmit={handleSubmit(accountCheck)}
      >
        <input
          {...register("email")}
          className="outline-0  w-full p-4 focus:border-2 focus:border-gray-900 rounded-md placeholder:text-gray-400 border border-gray-400 text-[16px]"
          placeholder="Email address"
        />
        <button className="border-0 outline-none rounded-md flex items-center justify-center w-full p-4 bg-primary text-white font-bold ease duration-300 hover:bg-red-800">
          {whenAccountCheckIsPending ? (
            <Spinner />
          ) : whenAccountCheckFails ? (
            <span>continue</span>
          ) : (
            <Spinner />
          )}
        </button>
        <div className="w-full flex items-center">
          <p className="text-xs font-bold">
            Already a <span className="text-primary">Sojourn</span> host?
            <Link
              className="text-primary font-bold ml-[3px] underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  ) : (
    <CreateHostAccountForm email={email} />
  );
};

function CreateHostAccountForm({ email }: { email: string }) {
  const { params } = useQueryString();

  const refererId = params.get("ref") ? params.get("ref") : "";

  const mutation = useMutation({
    mutationFn: signupHost,
    onSuccess: async (data) => {
      location.href = "/hosts/account-created";
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(HostSignUpSchema) });

  const whenSignupIsPending = mutation.isPending || isSubmitting;

  const whenSignupFails = !mutation.isSuccess || mutation.isError;

  async function signup(data: FormFields) {
    mutation.mutate({ ...data, email, ...(refererId && { refererId }) });
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-full py-24">
      <h3 className="text-2xl mb-5">
        Become a <span className="text-primary text-2xl">Sojourn</span> host
      </h3>
      <form
        className="w-full md:w-3/5 h-[50px]  space-y-2 pb-10 px-5 max-w-[500px]"
        onSubmit={handleSubmit(signup)}
      >
        {mutation.isError && (
          <span className="text-primary font-semibold">
            {mutation.error.message}
          </span>
        )}
        <input
          value={email}
          disabled={!!email}
          className="outline-0  w-full p-4 focus:border-2 focus:border-gray-900 rounded-md placeholder:text-gray-400 border border-gray-400 text-[16px]"
          placeholder="Email address"
        />
        {errors.firstName && (
          <span className="text-primary font-semibold">
            {errors.firstName.message}
          </span>
        )}
        <input
          {...register("firstName")}
          className="outline-0  w-full p-4 focus:border-2 focus:border-gray-900 rounded-md placeholder:text-gray-400 border border-gray-400 text-[16px]"
          placeholder="First name"
        />
        {errors.lastName && (
          <span className="text-primary font-semibold">
            {errors.lastName.message}
          </span>
        )}
        <input
          {...register("lastName")}
          className="outline-0  w-full p-4 focus:border-2 focus:border-gray-900 rounded-md placeholder:text-gray-400 border border-gray-400 text-[16px]"
          placeholder="Last name"
        />
        {errors.accountType && (
          <span className="text-primary font-semibold">
            {errors.accountType.message}
          </span>
        )}
        <select
          {...register("accountType")}
          className="outline-0  w-full p-4 focus:border-2 focus:border-gray-900 rounded-md placeholder:text-gray-400 border border-gray-400"
        >
          <option selected>select</option>
          <option value="Company" selected>
            Company
          </option>
          <option value="Individual" selected>
            Individual
          </option>
        </select>
        {errors.password && (
          <span className="text-primary font-semibold">
            {errors.password.message}
          </span>
        )}
        <input
          {...register("password")}
          type="password"
          className="outline-0  w-full p-4 focus:border-2 focus:border-gray-900 rounded-md placeholder:text-gray-400 border border-gray-400 text-[16px]"
          placeholder="Password"
        />
        <button className="border-0 outline-none rounded-md flex items-center justify-center w-full p-4 bg-primary text-white font-bold ease duration-300 hover:bg-red-800">
          {whenSignupIsPending ? (
            <Spinner />
          ) : whenSignupFails ? (
            <span>Signup</span>
          ) : (
            <Spinner />
          )}
        </button>
        <div className="w-full flex items-center">
          <p className="text-xs font-bold">
            Already a <span className="text-primary">Sojourn</span> host?
            <Link
              className="text-primary font-bold ml-[3px] underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
