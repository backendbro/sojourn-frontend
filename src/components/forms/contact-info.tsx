"use client";

import {
  updateInspectionWithoutPhotos,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../svgs/Spinner";
import { Check } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default ({
  isInspection = false,
  id,
  contactEmail,
  contactName,
  hostId,
  contactPhoneNumber,
}: {
  contactName: string;
  id: string;
  hostId: string;
  contactPhoneNumber: string;
  contactEmail: string;
  isInspection?: boolean;
}) => {
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

  const [state, setState] = useState<{
    contactName: string;
    contactPhoneNumber: string;
    contactEmail: string;
  }>({ contactEmail, contactPhoneNumber, contactName });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...state, id, hostId });
  }

  return (
    <form className="w-full mb-5" onSubmit={onSubmit}>
      <h4 className="text-xl underline mb-4">Contact Information</h4>
      <div className="w-full md:w-1/2 flex flex-col">
        <label htmlFor="contactName">Contact Name</label>
        <input
          value={state.contactName}
          onChange={handleChange}
          type="text"
          id="contactName"
          name="contactName"
          className="w-full md:w-1/2 p-2 rounded-md border-2 border-black text-[16px]"
          placeholder="Enter Contact name"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <label htmlFor="contactPhoneNumber">Contact Phone Number</label>
        <input
          value={state.contactPhoneNumber}
          onChange={handleChange}
          type="text"
          id="contactPhoneNumber"
          name="contactPhoneNumber"
          className="w-full md:w-1/2 p-2 rounded-md border-2 border-black text-[16px]"
          placeholder="Enter Contact Phone number"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          value={state.contactEmail}
          onChange={handleChange}
          type="email"
          id="contactEmail"
          name="contactEmail"
          className="w-full md:w-1/2 p-2 rounded-md border-2 border-black text-[16px]"
          placeholder="Enter Contact Email"
        />
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
