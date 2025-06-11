"use client";

import { cancelBooking, cancelInspectionById } from "@/http/api";
import { RootState } from "@/store";
import { openPrompt } from "@/store/features/prompt-slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../svgs/Spinner";
import { useState } from "react";
import { Check } from "lucide-react";

export default () => {
  const client = useQueryClient();

  const [error, setError] = useState("");
  const [successMessage, setSuccess] = useState("");

  const page = useSelector((state: RootState) => state.prompt.page);

  const message =
    page === "booking"
      ? "Booking has been cancelled."
      : "Inspection has been cancelled.";

  const errorMessage =
    page === "booking"
      ? "Could not cancel booking at this time."
      : "Could not cancel Inspection at this time.";

  const mutation = useMutation({
    mutationFn: page === "booking" ? cancelBooking : cancelInspectionById,
    async onSuccess() {
      setSuccess(message);
    },
    onError(error) {
      setError(errorMessage);
    },
  });

  const promptStatus = useSelector((state: RootState) => state.prompt.status);
  const promptQuestion = useSelector(
    (state: RootState) => state.prompt.question
  );

  const id = useSelector((state: RootState) => state.prompt.id);

  const dispatch = useDispatch();

  function clearAllState() {
    setError("");
    setSuccess("");
  }

  return promptStatus === "open" ? (
    <>
      <div
        role="button"
        onClick={async (e) => {
          await client.invalidateQueries({ queryKey: ["bookings"] });
          dispatch(openPrompt("closed"));
          clearAllState();
        }}
        className="fixed w-full z-[99999] h-screen bg-black opacity-50 isolate"
      ></div>
      <div className="fixed flex flex-col justify-between px-7 pt-7 pb-2 rounded-2xl top-1/3 left-1/2 -translate-x-1/2 w-full md:w-[600px] isolate z-[999999] min-h-[180px] bg-white shadow-md">
        {error ? (
          <p className="text-[18px] text-primary font-[600] flex items-center">
            {error}
          </p>
        ) : null}
        {
          <p className="text-[23px] font-[600] flex items-center">
            {successMessage ? successMessage : promptQuestion}
            {successMessage ? <Check color="green" size={24} /> : null}
          </p>
        }
        <div className="w-full flex space-x-2 justify-end">
          <button
            role="button"
            onClick={async (e) => {
              await client.invalidateQueries({ queryKey: ["bookings"] });
              dispatch(openPrompt("closed"));
              clearAllState();
            }}
            className="w-[150px]  py-3 bg-transparent border border-gray-400 rounded-full text-black text-lg ease duration-300 hover:bg-gray-300"
          >
            Close
          </button>
          <button
            role="button"
            disabled={!!successMessage}
            onClick={(e) => {
              mutation.mutate(id as string);
            }}
            className="w-[150px] py-3 flex items-center justify-center bg-primary rounded-full text-white text-lg ease duration-300 hover:bg-red-800 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? (
              <Spinner color="white" size={20} />
            ) : (
              <span>Yes</span>
            )}
          </button>
        </div>
      </div>
    </>
  ) : null;
};
