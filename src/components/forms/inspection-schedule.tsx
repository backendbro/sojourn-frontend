"use client";

import { useState, MouseEvent, FormEvent } from "react";
import { Calendar } from "../ui/calendar";
import { TimeScheduler } from "../ui/calendar-date-time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInspectionWithoutPhotos } from "@/http/api";
import Spinner from "../svgs/Spinner";
import { Check } from "lucide-react";
import { toast } from "sonner";

export default ({
  inspectionDate,
  inspectionTime,
  id,
  hostId,
}: {
  id: string;
  inspectionDate: Date;
  inspectionTime: string;
  hostId: string;
}) => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateInspectionWithoutPhotos,
    onSuccess: async (data) => {
      await client.invalidateQueries({
        queryKey: ["single-inspection-host"],
      });
    },
    onError(Error) {
      toast("Update Property Error", {
        description: "Error occurred when updating inspection schedule",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });
  const [state, setState] = useState<{
    id: string;
    inspectionDate: Date;
    inspectionTime: string;
  }>(() => ({ id, inspectionDate, inspectionTime }));

  const setTime = (time: string) => (e: MouseEvent<HTMLDivElement>) => {
    setState((prevState) => ({ ...prevState, inspectionTime: time }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...state, hostId });
  }
  return (
    <form onSubmit={onSubmit} className="w-full mb-5">
      <div className="w-full flex flex-col items-center space-y-4 md:items-start md:space-y-0 md:flex-row md:justify-evenly mb-5">
        <div className="flex flex-col">
          <h4 className="mb-2 font-semibold"> Choose a Date</h4>
          <Calendar
            className="w-full md:w-1/2"
            mode="single"
            selected={new Date(state.inspectionDate)}
            onSelect={(date) => {
              setState((prevState) => ({
                ...prevState,
                inspectionDate: date as Date,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="mb-2 font-semibold"> Choose a Time</h4>
          <TimeScheduler
            currentSelection={state.inspectionTime}
            setTime={setTime}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <button className="flex items-center justify-center font-semibold outline-none border-0 bg-black text-white py-2 px-4 rounded-md ease duration-300 hover:bg-slate-700">
          {mutation.isPending ? (
            <Spinner size={17} color="white" />
          ) : mutation.isSuccess ? (
            <Check size={17} color="white" />
          ) : (
            <span>Update</span>
          )}
        </button>
      </div>
    </form>
  );
};
