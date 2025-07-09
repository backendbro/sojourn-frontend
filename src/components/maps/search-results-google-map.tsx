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
import SearchResultCard from "@/components/property/search-result-card";

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

export default ({ locations = [] }: { locations: LocationType[] }) => {
  const map = useMap();
  const { router } = useQueryString();

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleClick =
    (l: { href: string }) => (ev: google.maps.MapMouseEvent) => {
      router.push(l.href);
    };

  const center = {
    lat: locations.length ? locations[0].coords[0] : 0,
    lng: locations.length ? locations[0].coords[1] : 0,
  };

  const Places = locations.map((l, key: number) => {
    const position = {
      lat: l.coords[0],
      lng: l.coords[1],
    };
    const isHovered = hoveredId === l.id;

    return (
      <AdvancedMarker
        key={key}
        position={position}
        onClick={handleClick(l)}
        ref={(marker) => setMarkerRef(marker, `${key}`)}
      >
        <div className="relative flex flex-col items-center group">
          <div
            className="custom-map-marker font-sans"
            onMouseEnter={() => setHoveredId(l.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            ₦{new Number(l.price).toLocaleString()}
          </div>

          {isHovered && (
            <div className="absolute bottom-full mb-2 z-[9999] w-[300px] bg-white rounded-lg shadow-xl p-2">
              <div className="w-full h-[150px] relative overflow-hidden rounded-md mb-2">
                {l.photos?.[0] ? (
                  <img
                    src={l.photos[0]}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="px-1">
                <h4 className="text-[14px] font-bold truncate">{l.title}</h4>
                <p className="text-xs text-gray-500">
                  {l.city}, {l.country}
                </p>
                <p className="text-red-600 text-sm font-semibold mt-1">
                  ₦{l.price.toLocaleString()} / night
                </p>
              </div>
            </div>
          )}
        </div>
      </AdvancedMarker>
    );
  });

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string}
    >
      <div className="relative w-full h-full">
        <Map
          className="w-full h-[600px] md:w-full md:h-[450px]"
          center={center}
          defaultZoom={12}
          gestureHandling={"greedy"}
          mapId="cfbe00b2d8ba58ba"
        >
          {Places}
        </Map>
      </div>
    </APIProvider>
  );
};
