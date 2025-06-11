import { EXPLORE_CITIES } from "@/constants";
import ExploreCard from "./explore-card";

export default () => {
  return (
    <section className="w-full flex flex-col min-h-[500px] items-center max-w-[1400px]  mx-auto">
      <div className="w-full flex flex-col items-center my-5 space-y-5 px-4 md:px-0">
        <h4 className="text-[36px] md:text-[48px] font-[700] m-0 p-0  text-center md:text-left">
          <span className="text-primary text-center md:text-left">
            Explore{" "}
          </span>
          the beautiful country of Nigeria
        </h4>
        <p className="font-[600] text-[24px] m-0 p-0 text-center md:text-left">
          These popular destinations have a lot to offer
        </p>
      </div>
      <div className="w-full md:w-5/6 grid md:grid-cols-3 min-h-[400px] my-10 px-10 md:px-0">
        <ExploreCard
          description={EXPLORE_CITIES.abuja}
          imageUrl="/assets/imgs/discover-abuja.png"
          title="Abuja"
        />
        <ExploreCard
          description={EXPLORE_CITIES.lagos}
          imageUrl="/assets/imgs/discover-lagos.png"
          title="Lagos"
        />
        <ExploreCard
          description={EXPLORE_CITIES.portharcout}
          imageUrl="/assets/imgs/discover-portharcourt.png"
          title="Portharcourt"
        />
        <ExploreCard
          description={EXPLORE_CITIES.akwa_ibom}
          imageUrl="/assets/imgs/discover-akwaibom.jpg"
          title="AkwaIbom"
        />
        <ExploreCard
          description={EXPLORE_CITIES.delta}
          imageUrl="/assets/imgs/discover-delta.jpg"
          title="Delta"
        />
        <ExploreCard
          description={EXPLORE_CITIES.oyo}
          imageUrl="/assets/imgs/discover-oyo.jpg"
          title="Oyo"
        />
        <ExploreCard
          description={EXPLORE_CITIES.benin}
          imageUrl="/assets/imgs/discover-benin.jpg"
          title="Benin"
        />
      </div>
    </section>
  );
};
