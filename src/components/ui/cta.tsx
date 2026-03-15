"use client";

import Link from "next/link";

export default function CTA() {
  const today = new Date();
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const checkIn = today.toISOString().split("T")[0];
  const checkOut = dayAfterTomorrow.toISOString().split("T")[0];

  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-16">

          {/* Text Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[620px] w-full">
            
            <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-primary mb-3 sm:mb-4">
              Ready to get started?
            </span>

            <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] font-black text-white leading-[1.1] tracking-tight">
              Find your perfect stay{" "}
              <span className="text-primary">today</span>
            </h2>

            <p className="mt-4 text-white/50 text-sm sm:text-base md:text-lg leading-relaxed max-w-[520px]">
              Whether you're a guest looking for comfort or a host ready to earn
              — Sojourn has you covered across Nigeria.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">

            <Link
              href={`/properties?city=lagos&adults=1&children=1&infants=1&check-in=${checkIn}&check-out=${checkOut}`}
              className="w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 rounded-full bg-primary text-white font-bold text-sm tracking-wide hover:bg-red-700 transition-colors"
            >
              Start Booking
            </Link>

            <Link
              href="/become-a-host"
              className="w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 rounded-full border-2 border-white/20 text-white font-bold text-sm tracking-wide hover:border-white/50 hover:bg-white/5 transition-colors"
            >
              Become a Host
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}