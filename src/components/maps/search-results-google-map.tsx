"use client";

import React, { useCallback, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import useQueryString from "@/hooks/useQueryString";
import SearchResultCardRedesign from "./search-result-card-design";

export const dynamic = "force-dynamic";

type LocationType = {
  id?: string;
  title: string;
  price: number;
  address: string;
  coords: number[];
  href: string;
  photos: string[];
  city: string;
  country: string;
  reviews: { rating: number }[];
  numberOfRooms?: number;
  typeOfProperty?: string;
};

function MapContent({ locations }: { locations: LocationType[] }) {
  const { router } = useQueryString();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const center = {
    lat: locations.length ? locations[0].coords[0] : 9.06,
    lng: locations.length ? locations[0].coords[1] : 7.49,
  };

  const handleClick = useCallback(
    (href: string) => () => {
      router.push(href);
    },
    [router]
  );

  return (
    <Map
      className="w-full h-full map-popup-clean"
      defaultCenter={center}
      defaultZoom={12}
      gestureHandling="greedy"
      mapId="cfbe00b2d8ba58ba"
    >
      {locations.map((location, idx) => {
        const position = {
          lat: location.coords[0],
          lng: location.coords[1],
        };
        const isHovered = hoveredIndex === idx;

        return (
          <React.Fragment key={idx}>
            <AdvancedMarker
              position={position}
              onClick={handleClick(location.href)}
              zIndex={isHovered ? 999 : 1}
            >
              <div
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`px-2.5 py-1.5 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all duration-150 whitespace-nowrap border ${
                    isHovered
                      ? "bg-black text-white border-black scale-110"
                      : "bg-white text-black border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                  }`}
                >
                  ₦{Number(location.price).toLocaleString()}
                </div>
              </div>
            </AdvancedMarker>

            {isHovered && (
              <InfoWindow
                position={position}
                pixelOffset={[0, -35]}
                onCloseClick={() => setHoveredIndex(null)}
              >
                <div
                  className="map-popup-card cursor-pointer"
                  onClick={handleClick(location.href)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <SearchResultCardRedesign
                    title={location.title}
                    city={location.city}
                    country={location.country}
                    price={location.price}
                    photos={location.photos}
                    reviews={location.reviews}
                    numberOfRooms={location.numberOfRooms}
                    typeOfProperty={location.typeOfProperty}
                  />
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        );
      })}
    </Map>
  );
}

export default ({ locations = [] }: { locations: LocationType[] }) => {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string}
    >
      <div className="relative w-full h-full">
        <MapContent locations={locations} />
      </div>
    </APIProvider>
  );
};
