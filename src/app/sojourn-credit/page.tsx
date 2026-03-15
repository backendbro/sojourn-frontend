import Footer from "@/components/ui/footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sojourn Credit | A Smarter Way to Stay",
  description:
    "Sojourn Credit is a digital reward balance designed to make short-term stays more flexible and accessible across Nigeria.",
};

const FAQ = [
  { q: "Is Sojourn Credit cash?", a: "No. It is redeemable platform credit." },
  { q: "Is it cryptocurrency?", a: "Not currently. Future tokenization refers to backend infrastructure evolution." },
  { q: "Can I withdraw it?", a: "No. It is designed for ecosystem usage." },
  { q: "Can hosts use Sojourn Credit?", a: "Not at this stage." },
];

export default function SojournCreditPage() {
  return (
    <>
      {/* ───── Hero ───── */}
      <section
        className="relative w-full py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/imgs/discover-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/60 mb-2 sm:mb-3">
              Introducing
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Sojourn Credit
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-white/80 max-w-[480px]">
              A Smarter Way to Stay &mdash; Powered by Value
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">What is it?</h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-3">
              A digital reward balance that makes short-term stays more flexible
              and accessible across Nigeria.
            </p>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-3">
              Accumulate value within the Sojourn ecosystem and use it toward
              future bookings.
            </p>
            <p className="text-white font-semibold text-base sm:text-lg mt-4">
              Today, loyalty credit. Tomorrow, something bigger.
            </p>
          </div>
        </div>
      </section>

      {/* ───── Why + How (side by side) ───── */}
      <section className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 sm:gap-16">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight mb-4 sm:mb-6">
              Why Sojourn Credit Exists
            </h2>
            <p className="text-sm sm:text-base text-black/60 mb-4 sm:mb-5">
              Short-let bookings in Nigeria are often:
            </p>
            <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
              {["Paid fully upfront", "Detached from loyalty incentives", "Transactional instead of relational"].map((item) => (
                <li key={item} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-black/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm sm:text-base text-black/70 leading-relaxed">
              Frequent guests should benefit from staying. Sojourn Credit
              reduces booking friction and rewards consistent platform users.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight mb-4 sm:mb-6">
              How It Works Today
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-black/50 uppercase tracking-wider mb-2 sm:mb-3">Earn</h3>
                {["Complete bookings", "Refer new users", "Loyalty campaigns", "Frequent stays"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-xs sm:text-sm text-black/70 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-black/50 uppercase tracking-wider mb-2 sm:mb-3">Spend</h3>
                {["Booking discounts", "Service fees", "Promo offers"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-xs sm:text-sm text-black/70 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-neutral-50 rounded-lg border border-black/5 text-xs sm:text-sm text-black/60 leading-relaxed">
              Credits are stored in your guest dashboard and applied at checkout.
              Currently guest-focused &mdash; hosts do not earn credit at this stage.
            </div>
          </div>
        </div>
      </section>

      {/* ───── Future: Tokenized (two-col on red bg) ───── */}
      <section
        className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/imgs/discover-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              The Future: Tokenized Sojourn Credit
            </h2>
            <p className="text-white/75 text-sm sm:text-base max-w-[600px]">
              We are designing Sojourn Credit to evolve into a tokenized
              ecosystem layer. <span className="font-semibold text-white">Tokenization does not mean speculation. It means structure.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 sm:p-6">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
                Future Phases
              </h3>
              {[
                "Blockchain-backed utility token",
                "Verifiable and transparent",
                "Transferable within the ecosystem",
                "Usable across partner services",
              ].map((item) => (
                <p key={item} className="flex items-center gap-2.5 text-sm text-white/80 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  {item}
                </p>
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 sm:p-6">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
                This Enables
              </h3>
              {[
                "Cross-city wallet functionality",
                "Ecosystem-wide value portability",
                "Transparent reward issuance",
                "Programmatic loyalty tiers",
                "Community-based incentives",
              ].map((item) => (
                <p key={item} className="flex items-center gap-2.5 text-sm text-white/85 py-1.5">
                  <span className="text-green-400 shrink-0 text-xs">&#10004;</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Tokenization Matters + What It's NOT (side by side) ───── */}
      <section className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 sm:gap-16">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight mb-4 sm:mb-6">
              Why Tokenization Matters
            </h2>
            <p className="text-xs sm:text-sm text-black/50 uppercase tracking-wider font-bold mb-3">
              In emerging markets like Nigeria
            </p>
            <ul className="space-y-2 mb-5 sm:mb-6">
              {["Trust is critical", "Value transparency builds loyalty", "Digital wallet adoption is rising"].map((item) => (
                <li key={item} className="flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base text-black/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {["Reduce fraud", "Improve accountability", "Measurable loyalty", "Long-term retention"].map((item) => (
                <div key={item} className="flex items-center gap-2 p-2.5 sm:p-3 bg-neutral-50 rounded-lg border border-black/5">
                  <span className="text-red-600 text-xs shrink-0">&#10004;</span>
                  <span className="text-xs sm:text-sm font-medium text-black/75">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-black/60 leading-relaxed">
              It transforms a basic reward system into programmable infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight mb-4 sm:mb-6">
              What It Is <span className="text-red-600">&</span> Isn&apos;t
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-red-50 rounded-xl border border-red-100">
                <h3 className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-wider mb-2 sm:mb-3">Not</h3>
                {["Speculative crypto coin", "Public trading asset", "Investment product"].map((item) => (
                  <p key={item} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black/60 py-0.5 sm:py-1">
                    <span className="text-red-400 text-sm shrink-0">&times;</span>
                    {item}
                  </p>
                ))}
              </div>
              <div className="p-3 sm:p-4 bg-green-50 rounded-xl border border-green-100">
                <h3 className="text-[10px] sm:text-xs font-bold text-green-600 uppercase tracking-wider mb-2 sm:mb-3">It is</h3>
                {["Utility-based credit", "Platform usability tool", "Engagement system"].map((item) => (
                  <p key={item} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black/60 py-0.5 sm:py-1">
                    <span className="text-green-600 text-xs shrink-0">&#10004;</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-black mb-3">The Long-Term Vision</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Reward-backed travel network", icon: "🌍" },
                { label: "Short-let financial layer", icon: "💳" },
                { label: "Loyalty-powered ecosystem", icon: "🏠" },
              ].map((item) => (
                <div key={item.label} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-0 p-3 bg-neutral-50 rounded-lg border border-black/5">
                  <span className="text-lg sm:text-xl sm:mb-1.5">{item.icon}</span>
                  <p className="text-xs font-semibold text-black/70 leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm sm:text-base text-black font-bold">
              Sojourn Credit is the foundation.
            </p>
          </div>
        </div>
      </section>

      {/* ───── FAQ (2-col grid) ───── */}
      <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight mb-6 sm:mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            {FAQ.map((item) => (
              <div key={item.q} className="p-4 sm:p-5 bg-white rounded-xl border border-black/5">
                <h3 className="text-sm sm:text-base font-bold text-black mb-1.5">{item.q}</h3>
                <p className="text-xs sm:text-sm text-black/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section
        className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/imgs/discover-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-2 sm:mb-3">
              A New Standard for<br />Short-Let in Nigeria
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[400px] mx-auto md:mx-0">
              Affordable stays reward loyalty. Flexible booking builds value.
              Sojourn Credit makes that possible.
            </p>
          </div>
          <div className="text-center md:text-right shrink-0">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">
              Stay smarter. Earn value.
            </p>
            <Link
              href="/properties"
              className="inline-block w-full sm:w-auto px-8 py-3.5 bg-white text-red-700 font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-colors rounded-md"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
