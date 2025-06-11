import CustomSearch from "@/components/ui/custom-search";
import Footer from "@/components/ui/footer";
import HowItWorks from "@/components/ui/how-it-works";
import Discover from "@/components/property/discover-locations";
import DealsAndOffers from "@/components/ui/deals-and-offers";
import ExploreSection from "@/components/ui/explore-section";
import Reviews from "@/components/ui/reviews";
import PropertyGrid from "@/components/property/property-grid";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
      <header className="w-full hero-banner bg-cover bg-no-repeat min-h-[380px] relative flex flex-col items-center justify-center items-center">
        <div className="w-auto px-10 flex flex-col space-y-10  max-w-[1400px] mx-auto lg:px-0 lg:w-[1100px]">
          <h1 className=" text-[48px] p-0 m-0 leading-[60px] text-white font-[400] sm:text-[58px] fade-in-and-out-header">
            Luxury away from home
          </h1>
          <p className="text-[20px]m -0  text-white font-[300] max-w-[850px] sm:text-[28px] fade-in-and-out-caption">
            Find a place to stay while visiting anywhere in the world and enjoy
            luxury and comfort.
          </p>
        </div>
      </header>
      <div className="w-full relative  flex flex-col items-center justify-center">
        <CustomSearch />
      </div>
      <HowItWorks />
      <section className="w-full p-12 min-h-[400px] flex flex-col items-center mt-[120px] sm:p-20 lg:mt-[35px]">
        <h3 className="text-center font-[500] text-[#000000] text-[35px]">
          Recommended properties
        </h3>
        <p className="text-[20px] text-[#2c2c2c] my-8 text-center">
          Featured home recommended for you from our Top Cities
        </p>
        <PropertyGrid />
      </section>
      <Discover />
      <DealsAndOffers />
      <ExploreSection />
      <Reviews />
      <Footer />
    </div>
  );
}
