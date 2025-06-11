"use client";

import Spinner from "@/components/svgs/Spinner";
import { getUserProfileById, updateUserById } from "@/http/api";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Save, X } from "lucide-react";
import { ChangeEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export interface AddressDetails {
  country: string;
  state: string;
  city: string;
  houseNumber: number;
  street: string;
  zipOrPostal: string;
}

interface BooleanAddressDetails {
  country: boolean;
  state: boolean;
  city: boolean;
  houseNumber: boolean;
  street: boolean;
  zipOrPostal: boolean;
}

export default () => {
  const userId = useSelector((state: RootState) => state.user?.me?.user?.id);

  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-user-address"],
    mutationFn: updateUserById,
    async onSuccess() {
      toast("Update Address Success", {
        description: "SuccessFully updated address info.",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
      await client.invalidateQueries({ queryKey: ["update-user-profile"] });
    },
    onError() {
      toast("Error updating address", {
        description: "Error occurred when updating address Info.",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfileById(userId),
    refetchOnReconnect: true,
  });

  const [state, setState] = useState<AddressDetails>({
    country: "",
    state: "",
    city: "",
    houseNumber: 0,
    street: "",
    zipOrPostal: "",
  });

  const [booleanState, setBooleanState] = useState<BooleanAddressDetails>({
    country: true,
    state: true,
    city: true,
    houseNumber: true,
    street: true,
    zipOrPostal: true,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "houseNumber" && isNaN(+value)) return;
    else if (name === "houseNumber" && !isNaN(+value)) {
      setState((prevState) => ({
        ...prevState,
        [name]: +value,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  function updateProfile() {
    let formData = new FormData();
    formData.append("profile", JSON.stringify(state));
    formData.append("user", JSON.stringify({}));
    formData.append("id", userId);
    mutation.mutate(formData);
  }

  useEffect(() => {
    if (data) {
      const isProfile = Boolean(data.profile);
      setState((prevState: AddressDetails) => ({
        country: isProfile ? data.profile.country : "",
        state: isProfile ? data.profile.state : "",
        city: isProfile ? data.profile.city : "",
        street: isProfile ? data.profile.street : "",
        houseNumber: isProfile ? data.profile.houseNumber : "",
        zipOrPostal: isProfile ? data.profile.zipOrPostal : "",
      }));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[200px]">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return (
    <div className="w-full p-5 md:px-20 md:py-[50px] mb-24 flex justify-center">
      <div className="w-full md:w-5/6">
        <div className="mt-4 md:mt-0">
          <h3 className="text-[1rem] md:text-[1.5rem]">Address</h3>
          <p>Here you can update your address.</p>
        </div>
        <div className="w-full">
          <form className="w-full px-2 py-4">
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="country" className="w-1/6 text-gray-400">
                Country
              </label>
              <input
                id="country"
                name="country"
                disabled={booleanState.country}
                className={`w-4/6 p-3 text-[16px] ${
                  !booleanState.country ? "focus:outline-2" : ""
                }`}
                value={state.country}
                onChange={handleChange}
              />
              {booleanState.country ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      country: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      country: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="state" className="w-1/6 text-gray-400">
                State / Region
              </label>
              <input
                id="state"
                name="state"
                disabled={booleanState.state}
                className={`w-4/6 p-3 text-[16px] ${
                  !booleanState.state ? "focus:outline-2" : ""
                }`}
                value={state.state}
                onChange={handleChange}
              />
              {booleanState.state ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      state: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      state: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="city" className="w-1/6 text-gray-400">
                City
              </label>
              <input
                id="city"
                name="city"
                disabled={booleanState.city}
                className={`w-4/6 p-3 text-[16px] ${
                  !booleanState.city ? "focus:outline-2" : ""
                }`}
                value={state.city}
                onChange={handleChange}
              />
              {booleanState.city ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      city: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      city: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="street" className="w-1/6 text-gray-400">
                Street
              </label>
              <input
                id="street"
                name="street"
                disabled={booleanState.street}
                className={`w-4/6 p-3 text-[16px] ${
                  !booleanState.street ? "focus:outline-2" : ""
                }`}
                value={state.street}
                onChange={handleChange}
              />
              {booleanState.street ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      street: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      street: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="houseNumber" className="w-1/6 text-gray-400">
                House Number
              </label>
              <input
                id="houseNumber"
                name="houseNumber"
                disabled={booleanState.houseNumber}
                className={`w-4/6 p-3 text-[16px] ${
                  !booleanState.houseNumber ? "focus:outline-2" : ""
                }`}
                value={!!state.houseNumber ? state.houseNumber : ""}
                onChange={handleChange}
              />
              {booleanState.houseNumber ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      houseNumber: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      houseNumber: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="zipOrPostal" className="w-1/6 text-gray-400">
                Area / Town
              </label>
              <input
                id="zipOrPostal"
                name="zipOrPostal"
                disabled={booleanState.zipOrPostal}
                className={`w-4/6 p-3 text-[16px] ${
                  !booleanState.zipOrPostal ? "focus:outline-2" : ""
                }`}
                value={!!state.zipOrPostal ? state.zipOrPostal : ""}
                onChange={handleChange}
              />
              {booleanState.zipOrPostal ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      zipOrPostal: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      zipOrPostal: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
