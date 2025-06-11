"use client";

import { AMMENITIES } from "@/constants";
import { Slider } from "../ui/slider";
import { Dispatch, SetStateAction, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import useQueryString from "@/hooks/useQueryString";
import { CheckedState } from "@radix-ui/react-checkbox";
import { getNonFalsyKeys } from "@/lib/utils";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

type ApartmentType = {
  smartShare: boolean;
  townHouse: boolean;
  primeInn: boolean;
};

type NumberOfRooms = {
  one: boolean;
  two: boolean;
  three: boolean;
  greaterThan3: boolean;
};

type CloseMobileSearchType = ActionCreatorWithPayload<
  boolean,
  "host/setMobileSearchStatus"
>;

export default ({
  setOpen,
  setMobileSearchStatus,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMobileSearchStatus: CloseMobileSearchType;
}) => {
  const { router } = useQueryString();

  const [price, setPrice] = useState([5000]);

  const [apartments, setApartment] = useState<ApartmentType>({
    smartShare: false,
    primeInn: false,
    townHouse: false,
  });

  const dispatch = useDispatch();

  const [rooms, setRooms] = useState<NumberOfRooms>({
    one: false,
    two: false,
    three: false,
    greaterThan3: false,
  });

  const [roomValues, setRoomValues] = useState<number[]>([]);

  const [amenities, setAmenities] = useState<string[]>(() => []);

  const { params } = useQueryString();

  const tomorrow = new Date(Date.now() + 86400000);

  const city = params.get("city") as string;
  const adults = Number(params.get("adults"));
  const children = Number(params.get("children"));
  const checkInDate = params.get("check-in")
    ? new Date(params.get("check-in") as string)
    : new Date();
  const checkOutDate = params.get("check-out")
    ? new Date(params.get("check-out") as string)
    : tomorrow;
  const infants = Number(params.get("infants"));

  const queryParamString =
    `/properties?city=${city}&adults=${adults}&children=${children}&infants=${infants}&check-in=${checkInDate}&check-out=${checkOutDate}
  &types_of_property=${getNonFalsyKeys(apartments)}
  &number_of_rooms=${roomValues.join(",")}&price=${
      price ? +price : null
    }&amenities=${amenities.join(",")}
  `.trim();

  function closeMobileMenu() {
    setOpen(false);
    dispatch(setMobileSearchStatus(false));
  }

  function addNumberOfRoomsSelectionBy(value: number) {
    const isNumberPresent = roomValues.includes(value);
    if (isNumberPresent) return;
    setRoomValues((prevState) => [...prevState, value]);
  }

  function removeNumberOfRoomsSelectionBy(value: number) {
    const isNumberPresent = roomValues.includes(value);
    if (!isNumberPresent) return;
    const filteredState = roomValues.filter((v) => v !== value);
    setRoomValues(filteredState);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col my-2 col-span-1">
          <h4 className="text-black text-xl md:text-sm font-bold">
            Apartments
          </h4>
          <ul className="w-full space-y-2 mt-3">
            <li className="list-none space-x-1 w-full text-xs flex items-center space-x-1">
              <Checkbox
                onCheckedChange={(checked) => {
                  setApartment((prevState: ApartmentType) => ({
                    ...prevState,
                    smartShare: checked as boolean,
                  }));
                }}
                name="smartShare"
                checked={apartments?.smartShare}
                className="w-4 h-4"
              />
              <span className="text-black  text-xl md:text-sm">
                Smart Share
              </span>
            </li>
            <li className="list-none space-x-1 w-full text-xs flex items-center space-x-1">
              <Checkbox
                name="townHouse"
                checked={apartments?.townHouse}
                className="w-4 h-4"
                onCheckedChange={(checked) => {
                  setApartment((prevState: ApartmentType) => ({
                    ...prevState,
                    townHouse: checked as boolean,
                  }));
                }}
              />
              <span className="text-black  text-xl md:text-sm">Town House</span>
            </li>
            <li className="list-none space-x-1 w-full text-xs flex items-center space-x-1">
              <Checkbox
                className="w-4 h-4"
                name="primeInn"
                checked={apartments?.primeInn}
                onCheckedChange={(checked: CheckedState) => {
                  setApartment((prevState: ApartmentType) => ({
                    ...prevState,
                    primeInn: checked as boolean,
                  }));
                }}
              />
              <span className="text-black  text-xl md:text-sm">Prime Inn</span>
            </li>
          </ul>
        </div>
        <div className="w-full my-2 col-span-1">
          <h4 className="text-black text-xl md:text-sm font-bold">
            No. of rooms
          </h4>
          <ul className="w-full space-y-2 mt-3 flex flex-col">
            <li className="list-none text-xs flex items-center space-x-1">
              <Checkbox
                name="one"
                checked={rooms.one}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addNumberOfRoomsSelectionBy(1);
                  } else {
                    removeNumberOfRoomsSelectionBy(1);
                  }
                  setRooms((prevState: NumberOfRooms) => ({
                    ...prevState,
                    one: checked as boolean,
                  }));
                }}
                className="w-4 h-4"
              />
              <span className="text-black  text-xl md:text-sm">1 bedroom</span>
            </li>
            <li className="list-none text-xs flex items-center space-x-1">
              <Checkbox
                name="two"
                checked={rooms.two}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addNumberOfRoomsSelectionBy(2);
                  } else {
                    removeNumberOfRoomsSelectionBy(2);
                  }
                  setRooms((prevState: NumberOfRooms) => ({
                    ...prevState,
                    two: checked as boolean,
                  }));
                }}
                className="w-4 h-4"
              />
              <span className="text-black  text-xl md:text-sm">2 bedrooms</span>
            </li>
            <li className="list-none  text-xs flex items-center space-x-1">
              <Checkbox
                name="three"
                checked={rooms.three}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addNumberOfRoomsSelectionBy(3);
                  } else {
                    removeNumberOfRoomsSelectionBy(3);
                  }
                  setRooms((prevState: NumberOfRooms) => ({
                    ...prevState,
                    three: checked as boolean,
                  }));
                }}
                className="w-4 h-4"
              />
              <span className="text-black  text-xl md:text-sm">3 bedrooms</span>
            </li>
            <li className="list-none  text-xs flex items-center space-x-1">
              <Checkbox
                name="greaterThan3"
                checked={rooms.greaterThan3}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addNumberOfRoomsSelectionBy(4);
                  } else {
                    removeNumberOfRoomsSelectionBy(4);
                  }
                  setRooms((prevState: NumberOfRooms) => ({
                    ...prevState,
                    greaterThan3: checked as boolean,
                  }));
                }}
                className="w-4 h-4"
              />
              <span className="text-black  text-xl md:text-sm">
                {">"} 3 bedrooms
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col my-2 col-span-2">
          <h4 className="text-black text-xl md:text-sm font-bold">Amenities</h4>
          <ul className="w-full space-y-2 mt-3 mt-2 grid grid-cols-2 grid-rows-4">
            {AMMENITIES.map((amenity, idx: number) => (
              <li
                key={idx}
                className="list-none space-x-1 w-full text-xs flex items-center"
              >
                <Checkbox
                  name={amenity.text}
                  checked={amenities.includes(amenity.text)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAmenities((prevState: string[]) =>
                        Array.from(new Set([...prevState, amenity.text]))
                      );
                    } else {
                      const filteredAmenities = amenities.filter(
                        (a) => a !== amenity.text
                      );
                      setAmenities((prevState: string[]) =>
                        Array.from(new Set(filteredAmenities))
                      );
                    }
                  }}
                  className="w-4 h-4"
                />
                <span className="text-black capitalize  text-xl md:text-sm">
                  {amenity.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 space-y-2 my-2">
          <h4 className="text-black text-xl md:text-sm font-bold">Price</h4>
          <div className="font-inter text-black  text-xl md:text-sm">
            ₦{price}+
          </div>
          <Slider
            defaultValue={price}
            value={price}
            min={5000}
            max={1000000}
            step={5000}
            className="w-full"
            onValueChange={(value: number[]) => {
              setPrice(value);
            }}
          />
        </div>
      </div>
      <div className="w-full flex justify-end my-4 md:my-2">
        <button
          onClick={(e) => {
            router.push(queryParamString);
            closeMobileMenu();
          }}
          className="w-full md:w-auto rounded-md px-4 py-3 md:py-2 bg-primary text-white"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};
