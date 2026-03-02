// import { HOW_IT_WORKS } from "@/constants";
// import HowItWorksCard from "../property/how-it-works-card";

// export default () => {
//   return (
//     <div className="w-full flex flex-col max-w-[1400px]  mx-auto items-center">
//       <h3 className="font-[500] text-[#310000] mb-10">How it works</h3>
//       <div className="w-full md:w-5/6 px-5 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {HOW_IT_WORKS.map((hiw, idx: number) => {
//           return (
//             <HowItWorksCard
//               key={idx}
//               title={hiw.title}
//               list={hiw.list}
//               imageUrl={hiw.imageUrl}
//               index={idx + 1}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };


"use client"

import { HOW_IT_WORKS } from "@/constants";
import {
  MapPin,
  CalendarCheck,
  CreditCard,
  PartyPopper,
  DoorOpen,
} from "lucide-react";

const STEP_ICONS = [MapPin, CalendarCheck, CreditCard, PartyPopper, DoorOpen];
const STEP_COLORS = [
  "bg-rose-50 text-rose-600",
  "bg-amber-50 text-amber-600",
  "bg-blue-50 text-blue-600",
  "bg-emerald-50 text-emerald-600",
  "bg-purple-50 text-purple-600",
];

export default function HowItWorks() {
  return (
    <section className="w-full py-10 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/[0.03] to-transparent rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-10 sm:mb-14">
          <h2 className="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-black text-gray-900 tracking-tighter leading-[0.95] flex-shrink-0">
            How it works
          </h2>

          <div
            className="relative rounded-2xl overflow-hidden bg-cover bg-center px-4 py-3 sm:px-6 sm:py-5 shadow-lg shadow-red-900/15 sm:mb-2"
            style={{
              backgroundImage: "url('/assets/imgs/discover-bg.png')",
              
            }}
          >
            <div className="absolute inset-0 bg-black/15" />
            <p className="relative z-10 text-xs sm:text-sm md:text-base font-bold text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              Book your perfect stay in just a few simple steps.
            </p>
          </div>
        </div>

        {/* Steps — horizontal scrolling row */}
        <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 sm:-mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-visible">
          {HOW_IT_WORKS && HOW_IT_WORKS.map((hiw, idx) => {
            const Icon = STEP_ICONS[idx];
            const colorClass = STEP_COLORS[idx];
            
            // Safety check - if Icon is undefined, don't render or use a fallback
            if (!Icon) return null;
            
            return (
              <div
                key={idx}
                className="group flex flex-col snap-start flex-shrink-0 w-[220px] sm:w-auto bg-white border border-black rounded-xl sm:rounded-2xl p-4 sm:p-6 justify-between transition-all duration-400 ease-out hover:border-black hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${colorClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-snug mt-2">
                    {hiw.title}
                  </h3>
                </div>

                {hiw.list && hiw.list.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {hiw.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[13px] sm:text-xs text-gray-700 leading-relaxed"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 flex-shrink-0 group-hover:bg-primary transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}