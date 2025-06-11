"use client";

import Spinner from "@/components/svgs/Spinner";
import useQueryString from "@/hooks/useQueryString";
import { passwordResetConfirmation } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default ({ params }: { params: { id: string } }) => {
  const { params: queryParams } = useQueryString();

  const router = useRouter();

  const code = queryParams.get("code");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation({
    mutationKey: ["password-reset"],
    mutationFn: passwordResetConfirmation,
    onSuccess() {
      toast("Password reset.", {
        closeButton: true,
      });

      router.push("/");
    },
    onError() {
      toast("Password reset ", {
        description: "Error resetting password.",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    },
  });

  const match =
    password === confirmPassword && password !== "" && confirmPassword !== "";

  function onSubmit(e: FormEvent) {
    if (password !== confirmPassword) {
      toast("passwords do not match", { closeButton: true });
      return;
    }
    e.preventDefault();
    mutation.mutate({ password, id: params.id, code: code as string });
  }

  return (
    <div className="w-full flex flex-col h-[80vh] items-center justify-center py-10">
      <form
        className="w-full md:w-[600px] py-10 px-14 space-y-7 sj-shadow rounded-2xl"
        onSubmit={onSubmit}
      >
        <h3 className="text-[32px] text-center font-[600]">Reset password </h3>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
          placeholder="New password"
        />
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
          className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
          placeholder="Confirm New Password"
        />
        <button
          disabled={!password || !match}
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
