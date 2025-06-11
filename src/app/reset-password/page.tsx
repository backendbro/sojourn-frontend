"use client";

import Spinner from "@/components/svgs/Spinner";
import { passwordReset } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default () => {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationKey: ["password-reset"],
    mutationFn: passwordReset,
    onSuccess() {
      toast("Password reset email success.", {
        description: "Password reset email sent.",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    },
    onError() {
      toast("Password reset email error.", {
        description: "Error sending password reset email.",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate(email);
  }

  return (
    <div className="w-full flex flex-col h-[80vh] justify-center items-center py-10">
      <form
        className="w-full md:w-auto py-10 px-14 space-y-7 sj-shadow rounded-2xl"
        onSubmit={onSubmit}
      >
        <h3 className="text-[32px] text-center font-semibold">
          Forgot password?
        </h3>
        <p>
          Enter your email and we’ll send you a link to get back into you
          account
        </p>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
          placeholder="Email address"
        />
        <button
          disabled={!email}
          className="w-full flex flex-col items-center justify-center px-3 py-5 rounded-full text-white bg-primary text-[17px] disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <Spinner size={14} color="white" />
          ) : (
            <span>Reset password</span>
          )}
        </button>
      </form>
    </div>
  );
};
