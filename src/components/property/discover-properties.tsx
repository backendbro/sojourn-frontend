// "use client";

// import useQueryString from "@/hooks/useQueryString";
// import DiscoverPropertyCard from "./discover-property-card";
// import { Bath, Bed, CookingPot, Sofa } from "lucide-react";

// export default () => {
//   const { router } = useQueryString();

//   return (
//     <div className="w-full bg-[#FFF1D7] ">
//       <div className="w-full flex flex-col py-10 px-10 md:px-24 max-w-[1400px] mx-auto min-h-[500px]">
//         <h4 className="font-[500] text-center text-[30px] md:text-[48px] md:text-left">
//           <span className="text-primary font-[700]">Discover</span> our lovely
//           properties
//         </h4>
//         <p className="font-[700] text-[20px] text-center md:text-left mt-0 mb-4">
//           Find homes that would meet all your needs while staying
//         </p>
//         {/* <div className="w-full flex flex-col space-y-5 lg:w-auto md:space-y-0 lg:flex-row lg:space-x-5 lg:mt-10"> */}
//         <div className="w-full grid xl:grid-cols-3 gap-5">
//           <DiscoverPropertyCard
//             bgImage="bg-[url(/assets/imgs/discover-1.png)]"
//             type="smart share"
//             heading="Comfortable, Shared Budget Spaces"
//             list={[
//               { icon: Bed, text: "Private Bedroom" },
//               { icon: CookingPot, text: "Shared kitchen" },
//               { icon: Bath, text: "Private Bathroom" },
//               { icon: Sofa, text: "Shared Living room" },
//             ]}
//           />
//           <DiscoverPropertyCard
//             bgImage="bg-[url(/assets/imgs/discover-2.png)]"
//             type="Prime Inn"
//             heading="Comfortable Hotel rooms"
//             list={[
//               { icon: Bed, text: "Private Bedroom" },
//               { icon: Bath, text: "Private Bathroom" },
//             ]}
//           />
//           <DiscoverPropertyCard
//             bgImage="bg-[url(/assets/imgs/discover-3.png)]"
//             type="Town Home"
//             heading="Comfortable, Private Apartments"
//             list={[
//               { icon: Bed, text: "Private Bedroom" },
//               { icon: CookingPot, text: "Private kitchen" },
//               { icon: Bath, text: "Private Bathroom" },
//               { icon: Sofa, text: "Private Living room" },
//             ]}
//           />
//         </div>
//         <div className="w-full flex justify-center mt-4">
//           <button
//             onClick={() => {
//               const today = new Date();
//               const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);
//               router.push(
//                 `/properties?city=abuja&adults=${1}&children=${1}&infants=${1}&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`
//               );
//             }}
//             className="w-[200px] py-3 bg-primary text-white font-[700] rounded-md px-4 mt-6 text-sm ease duration-300 hover:bg-red-800"
//           >
//             Explore All
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


"use client";

import useQueryString from "@/hooks/useQueryString";
import Link from "next/link";

const CARDS = [
  {
    title: "Host",
    description: "List your space. Reach guests. Grow your income.",
    cta: "Become a host",
    href: "/become-a-host",
  },
  {
    title: "Stay",
    description: "Find your perfect stay. Book with confidence.",
    cta: "Explore stays",
    href: "/properties",
  },
  {
    title: "Earn",
    description: "Refer friends. Earn rewards on every booking.",
    cta: "Learn more",
    href: "/sojourn-credit",
  },
];

export default function DiscoverProperties() {
  const { router } = useQueryString();

  return (
    <section
      className="w-full py-10 sm:py-14 md:py-20 lg:py-28 px-3 sm:px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/assets/imgs/discover-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <header className="mb-10 sm:mb-14 md:mb-20">
          <h2 className="text-[22px] sm:text-[30px] md:text-[40px] lg:text-[56px] font-bold text-white tracking-tight leading-[1.1]">
            Built for Guests.
            <span className="block">Designed for Hosts.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl text-white/80 font-normal max-w-[540px]">
            Find homes that would meet all your needs while staying.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
          {CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="group flex flex-col bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 sm:p-7 md:p-10 min-h-[180px] sm:min-h-[240px] md:min-h-[280px] justify-between transition-all duration-500 ease-out hover:bg-white hover:scale-[1.02] md:hover:scale-[1.03] hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/25 cursor-pointer"
            >
              <div>
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase transition-colors duration-500 group-hover:text-red-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 sm:mt-3 md:mt-4 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[44px] font-bold text-white tracking-tight leading-[1.05] transition-colors duration-500 group-hover:text-red-700">
                  {card.title}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80 font-normal leading-relaxed transition-colors duration-500 group-hover:text-gray-600">
                  {card.description}
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-white transition-all duration-500 group-hover:text-red-700 group-hover:gap-3"
                >
                  {card.cta}
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 md:mt-20 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);
              router.push(
                `/properties?city=abuja&adults=1&children=1&infants=1&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`
              );
            }}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-white text-red-700 font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-white/90 transition-colors rounded-md min-h-[44px]"
          >
            Explore all properties
          </button>
          <Link
            href="/become-a-host"
            className="text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors"
          >
            Become a host →
          </Link>
        </div>
      </div>
    </section>
  );
}
