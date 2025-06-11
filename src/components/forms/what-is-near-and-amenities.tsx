"use client";
import {
  updateInspectionWithoutPhotos,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, XCircle } from "lucide-react";
import { useState, MouseEvent, ChangeEvent } from "react";
import Spinner from "../svgs/Spinner";
import { toast } from "sonner";

export default ({
  nearbyPlaces,
  amenities,
  id,
  isInspection = false,
  hostId,
}: {
  nearbyPlaces: string[];
  amenities: string[];
  id: string;
  hostId: string;
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
        description: "Error occurred when updating amenities",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const [state, setState] = useState<{
    nearbyPlaces: string[];
    amenities: string[];
  }>(() => ({ nearbyPlaces, amenities }));

  const [placeOrAmenity, setPlaceOrAmenity] = useState<{
    place: string;
    amenity: string;
  }>({ place: "", amenity: "" });

  const removePlace = (value: string) => (e: MouseEvent<HTMLSpanElement>) => {
    const filteredPlaces = state.nearbyPlaces.filter(
      (place) => place !== value
    );
    setState((prevState) => ({ ...prevState, nearbyPlaces: filteredPlaces }));
  };

  const removeAmenity = (value: string) => (e: MouseEvent<HTMLSpanElement>) => {
    const filteredAmenities = state.amenities.filter(
      (amenity) => amenity !== value
    );
    setState((prevState) => ({ ...prevState, amenities: filteredAmenities }));
  };

  const addPlace = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.nearbyPlaces.includes(placeOrAmenity.place.toLowerCase())) return;
    setState((prevState) => ({
      ...prevState,
      nearbyPlaces: [...prevState.nearbyPlaces, placeOrAmenity.place],
    }));
    setPlaceOrAmenity((prevState) => ({ ...prevState, place: "" }));
  };

  const addAmenity = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.amenities.includes(placeOrAmenity.amenity.toLowerCase())) return;
    setState((prevState) => ({
      ...prevState,
      amenities: [...prevState.amenities, placeOrAmenity.amenity],
    }));
    setPlaceOrAmenity((prevState) => ({ ...prevState, amenity: "" }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlaceOrAmenity((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate({
      nearbyPlaces: state.nearbyPlaces,
      ammenities: state.amenities,
      id,
      hostId,
    });
  };

  return (
    <form className="w-full w-full space-y-2 pb-5 mb-10">
      <div className="w-full mb-5 md:mb-0 md:w-4/6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <h4 className="w-full font-semibold underline text-md mb-2 col-span-2 md:col-span-4">
          List of Nearby places
        </h4>
        {state.nearbyPlaces.map((place: string, idx: number) => (
          <div
            className="w-full flex items-center space-x-1 border border-gray-50 p-2 bg-gray-100 rounded-md"
            key={idx}
          >
            <span
              onClick={removePlace(place)}
              className="cursor-pointer ease duration-300 hover:translate-x-1"
            >
              <XCircle size={15} />
            </span>
            <span>{place}</span>
          </div>
        ))}
      </div>
      <label htmlFor="place">What is near ?</label>
      <input
        value={placeOrAmenity.place}
        onChange={handleChange}
        type="text"
        id="place"
        name="place"
        className="w-full md:w-1/2 p-2 rounded-md border-2 border-black text-[16px]"
        placeholder="Enter  the nearby places"
      />
      <button
        onClick={addPlace}
        className="flex items-center justify-center font-semibold outline-none border-0 bg-black text-white py-2 px-4 rounded-md ease duration-300 hover:bg-slate-700"
      >
        Add place
      </button>
      <div className="w-full md:w-4/6 mb-5 md:mb-0 grid grid-cols-2 md:grid-cols-4 gap-4">
        <h4 className="w-full mt-5 md:mt-0 font-semibold underline text-md mb-2 col-span-2 md:col-span-4">
          List of Amenities
        </h4>
        {state.amenities.map((amenity: string, idx: number) => (
          <div
            className="w-full flex items-center space-x-1 border border-gray-50 p-2 bg-gray-100 rounded-md"
            key={idx}
          >
            <span
              onClick={removeAmenity(amenity)}
              className="cursor-pointer ease duration-300 hover:translate-x-1"
            >
              <XCircle size={15} />
            </span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
      <label htmlFor="amenity">Amenities</label>
      <input
        value={placeOrAmenity.amenity}
        onChange={handleChange}
        type="text"
        id="amenity"
        name="amenity"
        className="w-full md:w-1/2 p-2 rounded-md border-2 border-black text-[16px]"
        placeholder="Enter  the amenities"
      />
      <button
        onClick={addAmenity}
        className="flex items-center justify-center font-semibold outline-none border-0 bg-black text-white py-2 px-4 rounded-md ease duration-300 hover:bg-slate-700"
      >
        Add amenity
      </button>
      <div className="w-full flex items-center justify-end">
        <button
          onClick={onSubmit}
          className="flex items-center justify-center font-semibold outline-none border-0 bg-black text-white py-2 px-4 rounded-md ease duration-300 hover:bg-slate-700"
        >
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
