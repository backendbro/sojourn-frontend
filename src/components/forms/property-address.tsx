"use client";

import {
  updateInspectionWithoutPhotos,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Map } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

import Spinner from "@/components/svgs/Spinner";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const InspectionMap = dynamic(() => import("./edit-location-map"), {
  ssr: false,
});

export type MapProps = {
  city: string;
  street: string;
  lat: string;
  country: string;
  lng: string;
  houseNumber: number;
  zip: string;
};

export default ({
  houseNumber,
  city,
  street,
  zip,
  id,
  isInspection = false,
  hostId,
  lat,
  lng,
}: {
  houseNumber: number;
  street: string;
  city: string;
  zip: string;
  id: string;
  isInspection?: boolean;
  hostId: string;
  lat: string;
  lng: string;
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
        description: "Error occurred when updating address",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const [state, setState] = useState<MapProps>(() => ({
    houseNumber,
    city,
    street,
    zip,
    lng,
    lat,
    country: "Nigeria",
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setState((prevState) => ({ ...prevState, [name]: +value }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...state, id, hostId });
  }
  return (
    <form onSubmit={onSubmit} className="w-full w-full space-y-2 pb-5 mb-10">
      <div className="w-full flex items-center space-x-3">
        <h4 className="font-semibold  text-md mb-2">
          {city}, {street} {houseNumber}
        </h4>
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center cursor-pointer space-x-1 p-2 border border-black rounded-md ease duration-300 hover:bg-gray-100">
              <span className="text-xs font-semibold">Open map</span>
              <Map size={15} color="gray" />
            </div>
          </DialogTrigger>
          <DialogContent className="p-0 m-0 max-w-full h-full sm:max-w-[1024px] flex items-center justify-center fixed sm:h-[550px] bg-black border-0">
            <InspectionMap {...state} setState={setState} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
        <div className="w-full flex flex-col">
          <label htmlFor="houseNumber">House Number</label>
          <input
            value={!!state.houseNumber ? state.houseNumber : ""}
            onChange={handleChange}
            type="number"
            id="houseNumber"
            name="houseNumber"
            className="w-full  p-2  rounded-md border-2 border-black text-[16px]"
            placeholder="Enter  house  Number"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="city">City</label>
          <input
            value={state.city}
            onChange={handleChange}
            type="text"
            id="city"
            name="city"
            className="w-full  p-2  rounded-md border-2 border-black text-[16px]"
            placeholder="Enter the city"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="street">Street</label>
          <input
            value={state.street}
            onChange={handleChange}
            type="text"
            id="street"
            name="street"
            className="w-full  p-2  rounded-md border-2 border-black text-[16px]"
            placeholder="Enter street name"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="zip">Area / Town</label>
          <input
            value={state.zip}
            onChange={handleChange}
            type="text"
            id="zip"
            name="zip"
            className="w-full  p-2  rounded-md border-2 border-black text-[16px]"
            placeholder="Enter Area / Town"
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
