import Footer from "@/components/ui/footer";
import CustomSearch from "@/components/ui/custom-search";
import HowItWorksSection from "@/components/ui/how-it-works-section";
import RecommendedProperties from "@/components/property/recommended-properties";
import ReferAndEarn from "@/components/property/refer-and-earn";
import Explore from "@/components/property/explore";
import Reviews from "@/components/property/reviews";
import DiscoverProperties from "@/components/property/discover-properties";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full md:px-10 relative">
        <header
          id="custom-search"
          className="w-full pb-5 md:pb-0 hero-banner min-h-[880px] md:h-[680px] relative flex flex-col space-y-6 items-center pt-20 md:rounded-t-[30px]"
        >
          <div className="max-w-[800px] px-10  flex flex-col space-y-6  max-w-[1400px] mx-auto">
            <h1 className=" text-[48px] p-0 m-0 leading-[60px] text-[#310000] font-[500] sm:text-[48px] fade-in-and-out-header text-center">
              Luxury away from home 
            </h1>
            <p className="m -0 text-[#310000] font-semibold max-w-[850px] text-[18px] sm:text-[24px] fade-in-and-out-caption text-center font-[500] ">
              Find a place to stay while visiting anywhere in Nigeria and enjoy
              luxury and comfort.
            </p>
          </div>
          <CustomSearch />
        </header>
      </div>
      <div className=" w-full min-h-[900px] mt-[-250px] md:mt-[-200px] isolate pb-20 pt-64 bg-wave-overlay flex flex-col justify-center items-center ">
        <HowItWorksSection />
      </div>
      <RecommendedProperties />
      <DiscoverProperties />
      <ReferAndEarn />
      <Explore />
      <Reviews />
      <Footer />
    </div>
  );
}
