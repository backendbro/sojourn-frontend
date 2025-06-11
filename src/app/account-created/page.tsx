"use client";

import useQueryString from "@/hooks/useQueryString";
import { resendEmailConfirmation } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default () => {
  const { params, router } = useQueryString();

  const email = params.get("email");

  const mutation = useMutation({
    mutationKey: ["resend-email"],
    mutationFn: resendEmailConfirmation,
    onSuccess() {
      toast("Email resend success", {
        description: "Email has been sent.",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    },
    onError() {
      toast("Email resend error", {
        description: "Email could not be sent.",
        action: {
          label: "",
          onClick: () => null,
        },
      });
    },
  });

  function onClick() {
    if (!email) {
      router.replace("/");
    } else {
      mutation.mutate(email as string);
    }
  }

  return (
    <div className="w-full h-full py-6 flex items-center justify-center flex flex-col sm:py-[50px]">
      <div className="w-5/6 min-h-[200px] sj-shadow py-10 px-3 rounded-md flex items-center justify-center flex flex-col max-w-[600px]">
        <h3 className="text-[22px] my-4 font-semibold">Sign up</h3>
        <CheckCircle color="#34A853" size={60} />
        <p className="text-center font-semibold my-2 md:text-left">
          You will receive an email with the confirmation link
        </p>
        <p className="text-sm my-2">
          Did not receive link?{" "}
          <span
            onClick={onClick}
            role="button"
            className="text-primary cursor-pointer font-semibold"
          >
            Resend Email
          </span>
        </p>
      </div>
    </div>
  );
};
