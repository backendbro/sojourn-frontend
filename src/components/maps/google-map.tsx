"use client";

import React, { useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";

export const dynamic = "force-dynamic";

export default ({
  coords,
}: {
  coords: number[];
  title?: string;
  address?: string;
}) => {
  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string}
    >
      <Map
        className="w-full h-full"
        center={{ lat: coords[0], lng: coords[1] }}
        // defaultCenter={{ lat: coords[0], lng: coords[1] }}
        defaultZoom={14}
        gestureHandling={"greedy"}
        // disableDefaultUI={true}
        mapId="cfbe00b2d8ba58ba"
      >
        <Marker ref={markerRef} position={{ lat: coords[0], lng: coords[1] }} />
      </Map>
    </APIProvider>
  );
};
