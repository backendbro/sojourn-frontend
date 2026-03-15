"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, Globe, Users, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "Eco-Friendly Practices",
    desc: "Sustainable materials and energy-efficient stays.",
  },
  {
    icon: Globe,
    title: "Responsible Tourism",
    desc: "Supporting local communities and culture.",
  },
  {
    icon: Users,
    title: "Community Growth",
    desc: "Empowering hosts and guests across Nigeria.",
  },
];

export default function ChooseSojourn() {
  return (
    <section className="w-full bg-[#0a1a14] py-10 sm:py-14 md:py-20 lg:py-24 px-3 sm:px-6 md:px-12 lg:px-24 overflow-x-hidden overflow-y-visible">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        
        {/* Left: Content */}
        <div>
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-emerald-400 mb-2 sm:mb-3">
            Sustainability
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-3 sm:mb-5">
            Choose Sojourn
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-8 sm:mb-10 max-w-[440px]">
            For stays that support Sustainability &mdash; promoting eco-friendly
            practices, responsible tourism, and community growth through our
            commitment to ESG values.
          </p>

          {/* Feature Cards */}
          <div className="space-y-3">
            {FEATURES.map((f) => (
              <Link
                key={f.title}
                href="/about-us"
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-emerald-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white">{f.title}</h3>
                  <p className="text-xs text-white/50">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Become a Host Button */}
          <div className="mt-6 sm:mt-8">
            <Link
              href="/become-a-host"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-900/30"
            >
              Become a Host
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right: Image composition */}
        <div className="relative flex items-center justify-center min-h-[280px] sm:min-h-[360px] md:min-h-[480px]">
          
          <div className="relative w-[180px] h-[240px] sm:w-[240px] sm:h-[320px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 z-10">
            <Image
              src="/assets/imgs/sojourn-nigerian-host.png"
              alt="Nigerian host in traditional attire"
              fill
              className="object-cover object-top"
              sizes="320px"
            />
          </div>

          {/* Decorative circle */}
          <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 w-[140px] sm:w-[180px] md:w-[200px] h-[140px] sm:h-[180px] md:h-[200px] rounded-full bg-emerald-900/40 z-0" />

          {/* Floating stat card — top right */}
          <div className="absolute top-2 right-0 sm:top-4 sm:-right-2 md:right-0 z-20 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-xl shadow-black/20 w-[110px] sm:w-[140px] md:w-[160px]">
            <p className="text-[10px] sm:text-xs text-black/50 font-medium mb-0.5 sm:mb-1">
              Eco-rated stays
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a1a14]">
              500+
            </p>

            <div className="mt-2 flex gap-0.5">
              {[30, 50, 35, 65, 45, 70, 55, 80, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-2 rounded-sm bg-emerald-400"
                  style={{ height: `${h * 0.35}px` }}
                />
              ))}
            </div>
          </div>

          {/* Floating stat card — bottom left */}
          <div className="absolute bottom-4 left-0 sm:bottom-8 sm:-left-2 md:left-0 z-20 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-xl shadow-black/20 w-[105px] sm:w-[130px] md:w-[150px]">
            <p className="text-[10px] sm:text-xs text-black/50 font-medium mb-0.5 sm:mb-1">
              Happy guests
            </p>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a1a14]">
              2,841
            </p>

            <div className="mt-2 w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full w-[82%] bg-emerald-500 rounded-full" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}