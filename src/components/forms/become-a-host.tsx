"use client";

import { doesUserExists, signupHost } from "@/http/api";
import { checkHostEmailSchema, HostSignUpSchema } from "@/schema/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../svgs/Spinner";
import { ReactNode, useState } from "react";
import useQueryString from "@/hooks/useQueryString";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { HomeIcon } from "lucide-react";

type FormFields = z.infer<typeof HostSignUpSchema>;

export default ({
  emailAddress,
  children,
}: {
  emailAddress?: string;
  children: ReactNode;
}) => {
  const [formStatus, setFormStatus] = useState<
    "account-check" | "create-host-account"
  >("account-check");

  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: doesUserExists,
    onSuccess: async (data) => {
      if (!data.user && !data.host) {
        setFormStatus("create-host-account");
      } else if (data.user && !data.host) {
        setError(
          "The user already exists as a guest, please login to add host."
        );
        setFormStatus("create-host-account");
      } else if (data.host && data.user) {
        setError(
          "The user already exists as a host, please login to your account."
        );
      }
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

  const email = getValues("email") ? getValues("email") : emailAddress;

  const whenAccountCheckIsPending = mutation.isPending || isSubmitting;

  async function accountCheck(data: { email: string }) {
    mutation.mutate(data.email || (email as string));
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Become a <span className="text-primary">Sojourn Host</span>
          </DialogTitle>
        </DialogHeader>
        {formStatus === "account-check" ? (
          <form
            autoComplete="off"
            className="w-full min-h-[50px] overflow-y-auto space-y-2 pb-10 px-5"
            onSubmit={handleSubmit(accountCheck)}
          >
            <span className="text-primary text-md font-semibold"> {error}</span>
            <input
              {...register("email")}
              value={email}
              className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              placeholder="Email address"
            />
            <button className="border-0 outline-none rounded-full flex items-center justify-center w-full p-4 bg-primary text-white font-bold ease duration-300 hover:bg-red-800">
              {whenAccountCheckIsPending ? <Spinner /> : <span>Continue</span>}
            </button>
          </form>
        ) : (
          <CreateHostAccountForm email={email as string} />
        )}
      </DialogContent>
    </Dialog>
  );
};

function CreateHostAccountForm({ email }: { email: string }) {
  const { params } = useQueryString();

  const refererId = params.get("ref") ? params.get("ref") : "";

  const mutation = useMutation({
    mutationFn: signupHost,
    onSuccess: async (data) => {
      location.href = `/account-created?email=${email}`;
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
    <form
      className="w-full overflow-y-auto space-y-5 pb-10 px-5"
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
        className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
        placeholder="Email address"
      />
      {errors.firstName && (
        <span className="text-primary font-semibold">
          {errors.firstName.message}
        </span>
      )}
      <input
        {...register("firstName")}
        className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
        placeholder="First name"
      />
      {errors.lastName && (
        <span className="text-primary font-semibold">
          {errors.lastName.message}
        </span>
      )}
      <input
        {...register("lastName")}
        className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
        placeholder="Last name"
      />
      {errors.accountType && (
        <span className="text-primary font-semibold">
          {errors.accountType.message}
        </span>
      )}
      <select
        {...register("accountType")}
        className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
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
        placeholder="Password"
        className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
      />
      <button className="border-0 outline-none rounded-full flex items-center justify-center w-full p-4 bg-primary text-white font-bold ease duration-300 hover:bg-red-800">
        {whenSignupIsPending ? (
          <Spinner />
        ) : whenSignupFails ? (
          <span>Signup</span>
        ) : (
          <Spinner />
        )}
      </button>
    </form>
  );
}
