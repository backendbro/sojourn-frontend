"use client";

import useQueryString from "@/hooks/useQueryString";
import Link from "next/link";

const today = new Date();
const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

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
    href: `/properties?city=lagos&adults=1&children=1&infants=1&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`,
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
                `/properties?city=lagos&adults=1&children=1&infants=1&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`
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
