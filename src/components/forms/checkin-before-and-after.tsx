"use client";

import {
  updateInspectionWithoutPhotos,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import Spinner from "../svgs/Spinner";
import { Check } from "lucide-react";

type TimeProps = {
  checkInAfter: string;
  checkOutBefore: string;
  id: string;
  hostId: string;
  isInspection?: boolean;
};
export default ({
  checkInAfter,
  checkOutBefore,
  id,
  hostId,
  isInspection = false,
}: TimeProps) => {
  const [state, setState] = useState<TimeProps>({
    checkInAfter,
    checkOutBefore,
    id,
    hostId,
    isInspection,
  });
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: isInspection
      ? updateInspectionWithoutPhotos
      : updatePropertyWithoutPhotos,
    onSuccess: async (data) => {
      if (isInspection) {
        await client.invalidateQueries({
          queryKey: ["single-inspection-host"],
        });
      } else {
        await client.invalidateQueries({
          queryKey: ["single-property-host"],
        });
      }
    },
    onError(Error) {
      toast("Update Property Error", {
        description: "Error occurred when updating Contact Info",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const setTime = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      checkInAfter: state.checkInAfter,
      checkOutBefore: state.checkOutBefore,
      id,
      hostId,
    });
  }
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="w-full flex flex-col  md:flex-row md:items-center md:space-x-5">
        <div className="w-full flex flex-col space-y-2 mb-4 md:w-1/2">
          <label htmlFor="check-in-after">Check in after</label>
          <div className="w-full flex items-start space">
            <input
              className="w-[96%] border border-black rounded-md p-3 capitalize placeholder:text-gray-800 text-[16px]"
              name="checkInAfter"
              id="check-in-after"
              type="time"
              onChange={setTime}
              value={state.checkInAfter}
              placeholder="Four bedroom semi detached duplex"
            />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 mb-4 md:w-1/2">
          <label htmlFor="check-out-before">Check out before</label>
          <div className="w-full flex items-start">
            <input
              className="w-[96%] border border-black rounded-md p-3 capitalize placeholder:text-gray-800 text-md"
              name="checkOutBefore"
              id="check-out-before"
              type="time"
              onChange={setTime}
              value={state.checkOutBefore}
              placeholder="10:00am"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-0 flex items-center justify-end">
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
