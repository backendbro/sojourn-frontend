import Footer from "@/components/ui/footer";
import CustomSearch from "@/components/ui/custom-search";
import HowItWorksSection from "@/components/ui/how-it-works-section";
import RecommendedProperties from "@/components/property/recommended-properties";
import ReferAndEarn from "@/components/property/refer-and-earn";
import Explore from "@/components/property/explore";
import Reviews from "@/components/property/reviews";
import DiscoverProperties from "@/components/property/discover-properties";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Shortlet in Nigeria | Unique Stays & Travel Experiences",
  description:
    "Discover and book unique shortlet apartments across Nigeria. Find your perfect stay with Sojourn.",
  keywords: [
    "how to host a shortlet in Nigeria",
    "how to list shortlet in Nigeria",
    "Lagos shortlet hosting",
    "Nigeria shortlet booking",
    "hosting process Nigeria",
    "sojourn nigeria",
    "sojourn naija",
    "sojourn abuja",
    "sojourn lagos",
    "shorlets in abuja",
    "shorlets in lagos",
    "list apartment in Nigeria",
    "list apartment in lagos",
    "list apartment in abuja",
    "list apartment in portharcourt",
    "list apartment in akwa ibom",
    "list apartment in benin",
    "list apartment in delta",
    "list apartment in oyo",
    "shorlets in portharcourt",
    "sojourn portharcourt",
    "sojourn akwa ibom",
    "shorlets in akwa ibom",
    "sojourn delta",
    "shorlets in delta",
    "sojourn oyo",
    "shorlets in oyo",
    "sojourn benin",
    "shorlets in benin",
    "unique stays",
    "travel experiences",
    "vacation rentals",
    "holiday homes",
    "Sojourn",
  ],
  openGraph: {
    title: "Sojourn: Book Unique Stays & Travel Experiences Worldwide",
    description:
      "Discover unique accommodations, cozy homes, and extraordinary travel experiences with Sojourn. Explore stays that match your style and budget.",
    url: "https://www.sojourn.ng",
    type: "website",
    images: [
      {
        url: "https://www.sojourn.ng/assets/logo/sojourn-logo-red.png",
        width: 1200,
        height: 630,
        alt: "Sojourn Nigeria, Luxury away from home",
      },
    ],
  },
};

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
