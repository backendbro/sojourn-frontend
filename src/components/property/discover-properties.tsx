"use client";

import useQueryString from "@/hooks/useQueryString";
import DiscoverPropertyCard from "./discover-property-card";
import { Bath, Bed, CookingPot, Sofa } from "lucide-react";

export default () => {
  const { router } = useQueryString();

  return (
    <div className="w-full bg-[#FFF1D7] ">
      <div className="w-full flex flex-col py-10 px-10 md:px-24 max-w-[1400px] mx-auto min-h-[500px]">
        <h4 className="font-[500] text-center text-[30px] md:text-[48px] md:text-left">
          <span className="text-primary font-[700]">Discover</span> our lovely
          properties
        </h4>
        <p className="font-[700] text-[20px] text-center md:text-left mt-0 mb-4">
          Find homes that would meet all your needs while staying
        </p>
        {/* <div className="w-full flex flex-col space-y-5 lg:w-auto md:space-y-0 lg:flex-row lg:space-x-5 lg:mt-10"> */}
        <div className="w-full grid xl:grid-cols-3 gap-5">
          <DiscoverPropertyCard
            bgImage="bg-[url(/assets/imgs/discover-1.png)]"
            type="smart share"
            heading="Comfortable, Shared Budget Spaces"
            list={[
              { icon: Bed, text: "Private Bedroom" },
              { icon: CookingPot, text: "Shared kitchen" },
              { icon: Bath, text: "Private Bathroom" },
              { icon: Sofa, text: "Shared Living room" },
            ]}
          />
          <DiscoverPropertyCard
            bgImage="bg-[url(/assets/imgs/discover-2.png)]"
            type="Prime Inn"
            heading="Comfortable Hotel rooms"
            list={[
              { icon: Bed, text: "Private Bedroom" },
              { icon: Bath, text: "Private Bathroom" },
            ]}
          />
          <DiscoverPropertyCard
            bgImage="bg-[url(/assets/imgs/discover-3.png)]"
            type="Town Home"
            heading="Comfortable, Private Apartments"
            list={[
              { icon: Bed, text: "Private Bedroom" },
              { icon: CookingPot, text: "Private kitchen" },
              { icon: Bath, text: "Private Bathroom" },
              { icon: Sofa, text: "Private Living room" },
            ]}
          />
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={() => {
              const today = new Date();
              const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);
              router.push(
                `/properties?city=abuja&adults=${1}&children=${1}&infants=${1}&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`
              );
            }}
            className="w-[200px] py-3 bg-primary text-white font-[700] rounded-md px-4 mt-6 text-sm ease duration-300 hover:bg-red-800"
          >
            Explore All
          </button>
        </div>
      </div>
    </div>
  );
};
