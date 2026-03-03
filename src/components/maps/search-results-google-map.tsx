// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   useMap,
// } from "@vis.gl/react-google-maps";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import type { Marker } from "@googlemaps/markerclusterer";

// import useQueryString from "@/hooks/useQueryString";

// export const dynamic = "force-dynamic";

// type LocationType = {
//   title: string;
//   price: number;
//   address: string;
//   coords: number[];
//   href: string;
// };

// export default ({ locations = [] }: { locations: LocationType[] }) => {
//   const map = useMap();

//   const { router } = useQueryString();

//   const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

//   const clusterer = useRef<MarkerClusterer | null>(null);

//   const setMarkerRef = (marker: Marker | null, key: string) => {
//     if (marker && markers[key]) return;
//     if (!marker && !markers[key]) return;

//     setMarkers((prev) => {
//       if (marker) {
//         return { ...prev, [key]: marker };
//       } else {
//         const newMarkers = { ...prev };
//         delete newMarkers[key];
//         return newMarkers;
//       }
//     });
//   };

//   const handleClick =
//     (l: { href: string }) => (ev: google.maps.MapMouseEvent) => {
//       router.push(l.href);
//     };

//   const center = {
//     lat: locations.length ? locations[0].coords[0] : 0,
//     lng: locations.length ? locations[0].coords[1] : 0,
//   };

//   const Places = locations.map((l, key: number) => {
//     const position = {
//       lat: l.coords[0],
//       lng: l.coords[1],
//     };

//     return (
//       <AdvancedMarker
//         key={key}
//         position={position}
//         onClick={handleClick(l)}
//         ref={(marker) => setMarkerRef(marker, `${key}`)}
//       >
//         <div className="custom-map-marker font-sans">
//           ₦{new Number(l.price).toLocaleString()}
//         </div>
//       </AdvancedMarker>
//     );
//   });

//   useEffect(() => {
//     if (!map) return;
//     if (!clusterer.current) {
//       clusterer.current = new MarkerClusterer({ map });
//     }
//   }, [map]);

//   useEffect(() => {
//     clusterer.current?.clearMarkers();
//     clusterer.current?.addMarkers(Object.values(markers));
//   }, [markers]);

//   return (
//     <APIProvider
//       apiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string}
//     >
//       <Map
//         className="w-full h-[600px] md:w-full md:h-[450px]"
//         center={center}
//         defaultZoom={12}
//         gestureHandling={"greedy"}
//         // disableDefaultUI={true}
//         mapId="cfbe00b2d8ba58ba"
//       >
//         {Places}
//       </Map>
//     </APIProvider>
//   );
// };

"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

import useQueryString from "@/hooks/useQueryString";
import SearchResultCardRedesign from "./search-result-card-design";

export const dynamic = "force-dynamic";

type LocationType = {
  id: string;
  title: string;
  price: number;
  address: string;
  coords: number[];
  href: string;
  image?: string;
  description?: string;
  photos: string[];
  city: string;
  country: string;
  reviews: {
    rating: number;
  }[];
};

const MarkerWithModal = ({
  location,
  onClick,
}: {
  location: LocationType;
  onClick: (ev: google.maps.MapMouseEvent) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const position = {
    lat: location.coords[0],
    lng: location.coords[1],
  };

  return (
    <AdvancedMarker position={position} onClick={onClick}>
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* PRICE STICKER */}
        <div
          className="
            inline-block
            whitespace-nowrap
            bg-white
            text-gray-900
            text-sm
            font-semibold
            px-4
            py-1.5
            rounded-full
            shadow-lg
            border border-gray-200
            transition-transform
            hover:scale-105
            flex-shrink-0
          "
        >
          ₦{location.price.toLocaleString()}
        </div>

        {/* HOVER CARD */}
        {isHovered && (
          <div className="absolute bottom-full mb-3 z-[9999] w-[300px] bg-white rounded-xl shadow-2xl border border-gray-200">
            <SearchResultCardRedesign {...location} />
          </div>
        )}
      </div>
    </AdvancedMarker>
  );
};

export default function MapComponent({
  locations = [],
}: {
  locations: LocationType[];
}) {
  const map = useMap();
  const { router } = useQueryString();

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  const handleClick =
    (l: { href: string }) => (ev: google.maps.MapMouseEvent) => {
      router.push(l.href);
    };

  const center = {
    lat: locations.length ? locations[0].coords[0] : 0,
    lng: locations.length ? locations[0].coords[1] : 0,
  };

  useEffect(() => {
    if (!map) return;

    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    if (!clusterer.current) return;

    clusterer.current.clearMarkers();
    clusterer.current.addMarkers(Object.values(markers));
  }, [markers]);

  return (
    <APIProvider
      apiKey={
        process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string
      }
    >
      <div className="relative w-full h-full">
        <Map
          className="w-full h-[600px] md:h-[500px]"
          center={center}
          defaultZoom={12}
          gestureHandling="greedy"
          mapId="cfbe00b2d8ba58ba"
        >
          {locations.map((location) => (
            <MarkerWithModal
              key={location.id}
              location={location}
              onClick={handleClick(location)}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}