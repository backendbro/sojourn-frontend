"use client";

import {
  updateInspectionWithoutPhotos,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "../svgs/Spinner";
import { Check } from "lucide-react";
import { toast } from "sonner";

export default ({
  description,
  id,
  numberOfRooms,
  maxNumberOfPeople,
  isInspection = false,
  hostId,
}: {
  description: string;
  numberOfRooms: number;
  maxNumberOfPeople: number;
  isInspection?: boolean;
  hostId: string;
  id: string;
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
        description: "Error occurred when updating Living Info",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });
  const [state, setState] = useState<{
    description: string;
    numberOfRooms: number;
    maxNumberOfPeople: number;
  }>(() => ({
    description,
    numberOfRooms,
    maxNumberOfPeople,
  }));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setState((prevState) => ({ ...prevState, [name]: +value }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...state, id, hostId });
  };
  return (
    <form className="w-full space-y-2 pb-5" onSubmit={onSubmit}>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={state.description}
        id="description"
        onChange={handleChange}
        className="w-full p-3 min-h-[150px] resize-none border-2 border-black rounded-md"
      />
      <div className="w-full flex flex-col sm:flex-row items-center space-x-3">
        <div className="flex flex-col w-full sm:w-1/3">
          <label htmlFor="numberOfRooms">Number of rooms</label>
          <input
            value={!!state.numberOfRooms ? state.numberOfRooms : ""}
            onChange={handleChange}
            type="number"
            id="numberOfRooms"
            name="numberOfRooms"
            className="w-full p-2 rounded-md border-2 border-black text-[16px]"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/3">
          <label htmlFor="maxNumberOfPeople">Max number of people</label>
          <input
            value={!!state.maxNumberOfPeople ? state.maxNumberOfPeople : ""}
            onChange={handleChange}
            type="number"
            id="maxNumberOfPeople"
            name="maxNumberOfPeople"
            className="w-full p-2 rounded-md border-2 border-black text-[16px]"
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
