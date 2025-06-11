"use client";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Lagos } from "./recommendations";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedCities } from "@/http/api";
import Spinner from "../svgs/Spinner";

const PropertyGrid = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["recommended-cities"],
    queryFn: getRecommendedCities,
  });

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner color="red" size={20} />
      </div>
    );

  if (error)
    return (
      <div className="w-full flex items-center justify-center">
        Could not load cities at this time.
      </div>
    );

  return (
    <Tabs
      defaultValue="abuja"
      className="w-full flex flex-col items-center justify-center capitalize"
    >
      <TabsList className="flex bg-transparent items-center justify-between py-10">
        {Array.isArray(data)
          ? data.map(({ city }: { city: string }, idx: number) => (
              <TabsTrigger
                className="w-5/6  focus-visible:ring-0 focus-visible:ring-offset-0  border-b-2 capitalize border-b-transparent  data-[state=active]:font-bold  focus-visible:p-0 focus-visible:m-0 sm:w-[110px] data-[state=active]:tab-test ease duration-500 hover:bg-[#ffede6] hover:text-black"
                key={idx}
                value={city}
              >
                {city}
              </TabsTrigger>
            ))
          : null}
      </TabsList>
      {Array.isArray(data)
        ? data.map(({ city }: { city: string }, idx: number) => (
            <Lagos key={idx} city={city} />
          ))
        : null}
    </Tabs>
  );
};

export default PropertyGrid;
