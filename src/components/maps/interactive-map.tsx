"use client";

import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  APIProvider,
  Map,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";

import { getPropertyMapPosition } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../svgs/Spinner";
import { CreateInspectionForm } from "@/lib/utils";
import { MoveRight } from "lucide-react";

export default ({
  form,
  setForm,
  next,
  prev,
}: {
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      const address = `${form.houseNumber} ${form.street} ${form.zip} ${form.city} ${form.country}`;
      return getPropertyMapPosition(address);
    },
    queryKey: ["property-position-host"],
  });

  const [closeOverlay, setCloseOverlay] = useState(false);

  const pos = {
    lat: +form.lat ? +form.lat : data ? data.lat : form.lat,
    lng: +form.lng ? +form.lng : data ? data.lng : form.lng,
  };

  const center = {
    lat: data && data.lat ? +data.lat : +form.lat,
    lng: data && data.lng ? +data.lng : +form.lng,
  };

  const handleClick = useCallback((ev: MapMouseEvent) => {
    setForm((prevState) => ({
      ...prevState,
      lat: ev.detail.latLng?.lat + "",
      lng: ev.detail.latLng?.lng + "",
    }));
  }, []);

  useEffect(() => {
    if (data) {
      setForm((prevState) => ({
        ...prevState,
        lat: data.lat + "",
        lng: data.lng + "",
      }));
    }
  }, [data]);

  return isLoading ? (
    <div className="w-full flex items-center justify-center h-[200px] md:mt-2">
      <Spinner size={20} color="red" />
    </div>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="w-full relative h-3/4 overflow-y-auto flex flex-col items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-full relative h-full">
        {!closeOverlay ? (
          <div className="absolute w-full h-full bg-black opacity-70 isolate z-[999999999] flex flex-col items-center justify-center space-y-5">
            <p className="w-4/6 md:w-full text-center text-xl text-white font-semibold">
              Find the precise place on the map and click on it.
            </p>
            <button
              onClick={() => {
                setCloseOverlay(true);
              }}
              className="text-xl text-white font-semibold py-2 px-10 rounded-full border border-white ease duration-300 hover:bg-gray-900"
            >
              close
            </button>
          </div>
        ) : null}
        <APIProvider
          apiKey={
            process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string
          }
        >
          <Map
            onClick={handleClick}
            className="w-full h-full md:w-full md:h-full"
            defaultCenter={center}
            defaultZoom={14}
            gestureHandling={"greedy"}
            // disableDefaultUI={true}
            mapId="4098f60762d1cbb1"
          >
            {<Marker position={pos} />}
          </Map>
        </APIProvider>
      </div>
      <div className="w-full fixed h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};
