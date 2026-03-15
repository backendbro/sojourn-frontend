import Footer from "@/components/ui/footer";
import CustomSearch from "@/components/ui/custom-search";
import CTA from "@/components/ui/cta"
import HowItWorksSection from "@/components/ui/how-it-works-section";
import RecommendedProperties from "@/components/property/recommended-properties";
import ReferAndEarn from "@/components/property/refer-and-earn";
import ChooseSojourn from "@/components/property/choose-sojourn";
import Explore from "@/components/property/explore";
import Reviews from "@/components/property/reviews";
import DiscoverProperties from "@/components/property/discover-properties";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Animations from "@/components/ui/animations";
import { Metadata } from "next";

const today = new Date();
const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);


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
    <div className="w-full min-h-screen overflow-x-hidden">
      <Animations />

      {/* Hero Section */}
      <div className="w-full relative">
        <header
          id="custom-search"
          className="w-full min-h-[100vh] relative flex flex-col items-center justify-center hero-banner"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 mix-blend-overlay" />

          {/* Hero Content */}
          {/* <div className="max-w-[1200px] px-6 md:px-10 flex flex-col items-center space-y-8 z-10"> */}

        <div className="max-w-[1200px] px-6 md:px-10 pt-28 md:pt-0 flex flex-col items-center space-y-8 z-10">
  <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center leading-tight animate-fade-in">
    Experience Luxury
    <span className="block mt-2">Away from Home</span>
  </h1>

  <p className="text-lg md:text-xl text-white/90 max-w-2xl text-center font-medium animate-fade-in-delay">
    Discover exceptional stays across Nigeria. Your perfect home away
    from home awaits, combining comfort, style, and authentic local
    experiences.
  </p>

  {/* Search Component */}
  <div className="w-full max-w-4xl animate-slide-up pb-24 md:pb-8">
    <CustomSearch />
  </div>

  {/* Scroll Indicator */}
  <Link
    href="#how-it-works"
    className="absolute bottom-4 md:bottom-8 flex flex-col items-center space-y-1 md:space-y-2 text-white animate-bounce cursor-pointer hover:text-white/80 transition-colors"
  >
    <span className="text-xs md:text-sm font-medium">
      Scroll to explore
    </span>
    <ArrowDown size={18} className="md:w-5 md:h-5" />
  </Link>
</div>
        </header>
      </div>

      {/* How It Works Section */}
      {/* <div
        id="how-it-works"
        className="w-full bg-white relative scroll-mt-24 md:scroll-mt-32 pt-12 md:pt-20"
      >
        <div className="absolute inset-0 bg-wave-pattern opacity-5" />
        <div className="relative z-10">
          <HowItWorksSection />
        </div>
      </div> */}

       <div
        id="how-it-works"
        className="w-full bg-white relative scroll-mt-24 md:scroll-mt-32 pt-12 md:pt-20"
      >
        <div className="absolute inset-0 bg-wave-pattern opacity-5" />
        <div className="relative z-10">
          <HowItWorksSection />
        </div>
      </div>

      {/* Properties Showcase */}
      <section className="w-full py-10 md:py-20 bg-white">
        <RecommendedProperties />
      </section>

      {/* Discovery Section with Parallax */}
      <section className="w-full bg-white">
        <DiscoverProperties />
      </section>

      {/* Referral Program */}
       <section className="w-full py-20 bg-[#0a1a14]">
        {/* <ReferAndEarn /> */}
        <ChooseSojourn />
      </section> 


      {/* Explore Cities */}
      <section className="w-full py-15 bg-gradient-to-b from-white to-[#FFF1D7]">
        <Explore />
      </section>

      {/* Reviews Section   */}
      {/* Reviews */}
      <Reviews />

      {/* CTA Banner */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
