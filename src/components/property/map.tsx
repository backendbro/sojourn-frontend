import React, { useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";

export default ({ positions }: { positions: Array<number> }) => {
  const [markerRef, marker] = useMarkerRef();

  const clientId = process.env
    .NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string;

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);

  return (
    <APIProvider apiKey={clientId}>
      <Map
        className="w-full h-full"
        defaultCenter={{ lat: positions[0], lng: positions[1] }}
        defaultZoom={14}
        gestureHandling={"greedy"}
        // disableDefaultUI={true}
        mapId="cfbe00b2d8ba58ba"
      >
        <Marker
          ref={markerRef}
          position={{ lat: positions[0], lng: positions[1] }}
        />
      </Map>
    </APIProvider>
  );
};
