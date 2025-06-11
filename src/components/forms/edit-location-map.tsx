"use client";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import {
  APIProvider,
  Map,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";

import { getPropertyMapPosition } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../svgs/Spinner";
import { MapProps } from "./property-address";

export default ({
  city,
  street,
  lat,
  zip,
  houseNumber,
  lng,
  country,
  setState,
}: MapProps & {
  setState: Dispatch<SetStateAction<MapProps>>;
}) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      const address = `${houseNumber} ${street} ${zip} ${city} ${country}`;

      return getPropertyMapPosition(address);
    },
    queryKey: ["property-position-host"],
  });

  const pos = {
    lat: +lat,
    lng: +lng,
  };

  const center = {
    lat: +lat,
    lng: +lng,
  };

  const handleClick = useCallback((ev: MapMouseEvent) => {
    setState((prevState) => ({
      ...prevState,
      lat: ev.detail.latLng?.lat + "",
      lng: ev.detail.latLng?.lng + "",
    }));
  }, []);

  return isLoading ? (
    <div className="w-full flex items-center justify-center h-[200px]">
      <Spinner size={20} color="red" />
    </div>
  ) : (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string}
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
        {lat && lng ? <Marker position={pos} /> : ""}
      </Map>
    </APIProvider>
  );
};
