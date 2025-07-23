"use client";

import BecomeAHost from "@/components/forms/become-a-host";
import Footer from "@/components/ui/footer";
import { Switch } from "@/components/ui/switch";
import { PLANS, WHY_HOST_WITH_SOJOURN } from "@/constants";
import { RootState } from "@/store";
import { CircleChevronRight, Rocket, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LazyMotion, domAnimation, m, Variants } from "framer-motion";

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideIn: Variants = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

interface AddHostProps {
  className?: string;
}

const AddHost: React.FC<AddHostProps> = ({ className = "" }) => (
  <Link
    href="/hosts/setup"
    className={
      className ||
      "group inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-white font-semibold transition-all hover:bg-primary/90 hover:scale-105"
    }
  >
    Create a Host account
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Link>
);

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const BecomeAHostPage: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user?.loggedIn ?? false
  );
  const isHostAlready = useSelector(
    (state: RootState) => state.user?.me?.host ?? false
  );
  const isLoggedInAndNotHost = isUserLoggedIn && !isHostAlready;
  const isLoggedInAndHostAndGuest = isUserLoggedIn && isHostAlready;

  const monthlyActiveCss = checked === false ? "text-primary" : "text-gray-400";
  const yearlyActiveCss = checked === true ? "text-primary" : "text-gray-400";

  const renderPlanButton = (plan: any) => {
    if (isLoggedInAndNotHost) {
      return (
        <AddHost
          className={`w-full justify-center ${
            plan.popular
              ? "bg-primary"
              : "bg-[#FFF1D7] text-primary hover:bg-primary hover:text-white"
          }`}
        />
      );
    }
    if (isLoggedInAndHostAndGuest) {
      return null;
    }
    return (
      <BecomeAHost>
        <button
          className={`w-full py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
            plan.popular
              ? "bg-primary text-white"
              : "bg-[#FFF1D7] text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </BecomeAHost>
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full overflow-hidden">
        {/* Hero Section */}
        <m.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="w-full px-4 md:px-10 relative"
        >
          <header className="w-full flex flex-col md:flex-row pb-5 overflow-hidden md:pb-0 min-h-[600px] md:h-[700px] relative rounded-[40px] bg-gradient-to-br from-[#FFF1D7] to-[#FFE4B5]">
            <m.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="w-full h-[500px] md:w-2/3 md:h-full relative z-10"
            >
              <div className="w-full h-full flex flex-col justify-center px-8 md:px-16 space-y-8 py-14 md:py-0">
                <m.h1
                  variants={slideIn}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[#810B0B] font-extrabold text-4xl md:text-6xl lg:text-7xl w-full md:w-4/5 leading-tight"
                >
                  Become a Host with Sojourn
                </m.h1>
                <m.p
                  variants={fadeIn}
                  className="text-xl md:text-2xl font-medium text-[#810B0B]/80 w-full md:w-4/5"
                >
                  Host with us for a well refined experience
                </m.p>
                <m.div variants={fadeIn}>
                  {isLoggedInAndNotHost ? (
                    <AddHost />
                  ) : isLoggedInAndHostAndGuest ? null : (
                    <BecomeAHost>
                      <div className="group inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-white font-semibold transition-all hover:bg-primary/90 hover:scale-105 cursor-pointer">
                        Sign Up as a Host
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </BecomeAHost>
                  )}
                </m.div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-[500px] md:w-1/3 bg-primary/90 md:h-full relative overflow-hidden rounded-l-[40px]"
            >
              <div className="absolute inset-0 bg-[url(/assets/imgs/blurred-circles.png)] bg-cover opacity-30 mix-blend-overlay" />
              <Image
                src="/assets/imgs/woman-smiling.png"
                alt="woman_smiling"
                width={600}
                height={600}
                priority
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-125 md:scale-150"
              />
            </m.div>
          </header>
        </m.div>

        {/* Partnership Section */}
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="w-full py-20 px-4 md:px-10 bg-white"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
            <m.div
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/imgs/shaking-hands.svg"
                alt="shaking_hands"
                width={500}
                height={500}
                className="transform hover:scale-105 transition-transform duration-500"
              />
            </m.div>
            <m.div
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-8"
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                At Sojourn, we believe in building meaningful partnerships with
                like-minded individuals and businesses who share our passion for
                providing exceptional accommodation experiences.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                If you own or manage a property that aligns with our commitment
                to quality, sustainability, and guest satisfaction, we invite
                you to join our network of esteemed partners.
              </p>
            </m.div>
          </div>
        </m.div>

        {/* Why Host Section */}
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="w-full bg-[#FFF1D7] py-20 px-4 md:px-10"
        >
          <div className="max-w-7xl mx-auto">
            <m.h2
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-[#310000] text-center mb-16"
            >
              Why Host with Sojourn?
            </m.h2>

            <m.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {WHY_HOST_WITH_SOJOURN.map((item, idx) => (
                <m.div
                  key={idx}
                  variants={fadeIn}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="bg-primary rounded-xl flex items-center justify-center w-14 h-14 mb-4">
                    <Image
                      src={item.icon}
                      alt={item.heading}
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{item.heading}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </m.div>

        {/* Plans Section */}
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="w-full py-20 px-4 md:px-10 bg-white"
        >
          <div className="max-w-7xl mx-auto text-center">
            <m.h2
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-[#310000] mb-6"
            >
              Flexible Subscriptions
            </m.h2>
            <m.p
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Choose a plan that works best for your hosting needs. Switch
              between plans anytime as your business grows.
            </m.p>

            <m.div
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-4 bg-[#FFF1D7] rounded-full p-2 mb-16"
            >
              <button
                onClick={() => setChecked(false)}
                className={`px-6 py-2 rounded-full transition-all ${
                  !checked ? "bg-primary text-white" : "hover:bg-white/50"
                }`}
              >
                Monthly
              </button>
              <div className="flex items-center gap-2">
                <span className={monthlyActiveCss}>Monthly</span>
                <Switch
                  checked={checked}
                  onCheckedChange={setChecked}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={yearlyActiveCss}>Yearly</span>
              </div>
              <button
                onClick={() => setChecked(true)}
                className={`px-6 py-2 rounded-full transition-all ${
                  checked ? "bg-primary text-white" : "hover:bg-white/50"
                }`}
              >
                Yearly <span className="text-sm">(Save 20%)</span>
              </button>
            </m.div>

            <m.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {PLANS.map((plan, idx) => (
                <m.div
                  key={idx}
                  variants={fadeIn}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={`bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden ${
                    plan.popular ? "border-2 border-primary" : ""
                  }`}
                >
                  {["Lite", "Premium"].includes(plan.name) && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {plan.popular && (
                    <div className="absolute top-6 right-6">
                      <div className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                        Popular
                      </div>
                    </div>
                  )}

                  <div className="text-left mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.desc}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-4xl font-bold">
                        {formatPrice(
                          checked
                            ? plan.price.annually.amount
                            : plan.price.monthly.amount
                        )}
                      </span>
                      <span className="text-gray-600 mb-1">/mo</span>
                    </div>
                    {checked && (
                      <div className="text-sm text-primary font-medium">
                        Save {plan.yearlySavings} yearly
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8 text-left">
                    {plan.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircleChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">{renderPlanButton(plan)}</div>
                </m.div>
              ))}
            </m.div>
          </div>
        </m.div>

        {/* Who Can Host Section */}
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="w-full py-20 px-4 md:px-10 bg-gradient-to-br from-primary/95 to-primary relative overflow-hidden"
        >
          {/* Animated House Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="floating-house" />
            <div className="floating-house delay-3" />
            <div className="floating-house delay-6" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <m.div
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Who can host with Sojourn?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Join our community of exceptional hosts who are redefining
                hospitality in Nigeria
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 21H21M3 21V11L12 2L21 11V21M3 21H9V15H15V21H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Homeowners
                </h3>
                <p className="text-white/80 leading-relaxed">
                  If you own a well-maintained, stylish, and comfortable
                  property in a prime location, we'd love to hear from you.
                  Whether it's a modern urban apartment, a charming countryside
                  villa, or a coastal retreat, we're eager to explore
                  partnership possibilities.
                </p>
              </m.div>

              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Property Managers
                </h3>
                <p className="text-white/80 leading-relaxed">
                  If you manage a portfolio of properties that meet our high
                  standards, partnering with Sojourn can open up new
                  opportunities to showcase your collection to a diverse and
                  discerning audience.
                </p>
              </m.div>
            </div>

            <m.div
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="mt-12 text-center"
            >
              {isLoggedInAndNotHost ? (
                <AddHost className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full text-primary font-semibold transition-all hover:bg-white/90 hover:scale-105 shadow-lg" />
              ) : isLoggedInAndHostAndGuest ? null : (
                <BecomeAHost>
                  <div className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full text-primary font-semibold transition-all hover:bg-white/90 hover:scale-105 shadow-lg cursor-pointer">
                    Sign up as a host
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </BecomeAHost>
              )}
            </m.div>
          </div>

          <style jsx>{`
            @keyframes floatHouse {
              0% {
                transform: translate(-100%, 20%) scale(0.8);
                opacity: 0;
              }
              20% {
                opacity: 0.3;
              }
              50% {
                transform: translate(0%, 0%) scale(1);
                opacity: 0.2;
              }
              80% {
                opacity: 0.3;
              }
              100% {
                transform: translate(100%, -20%) scale(0.8);
                opacity: 0;
              }
            }

            .floating-house {
              position: absolute;
              width: 300px;
              height: 300px;
              top: 30%;
              left: -300px;
              background-image: url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M150 50L50 150V250H250V150L150 50ZM150 50V100M50 150H250M100 250V200H200V250' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M120 120H180M120 160H180' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-size: contain;
              animation: floatHouse 15s linear infinite;
              opacity: 0;
              filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
            }

            .delay-3 {
              animation-delay: 5s;
              top: 50%;
            }

            .delay-6 {
              animation-delay: 10s;
              top: 70%;
            }
          `}</style>
        </m.div>

        {/* How to Become a Host Section */}
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="w-full py-20 px-4 md:px-10 bg-gradient-to-br from-white to-[#FFF1D7]/50"
        >
          <div className="max-w-7xl mx-auto">
            <m.div
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-primary font-medium mb-4 block">
                Simple Steps
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How to <span className="text-primary">Become</span> a Host
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our community of exceptional hosts who are redefining
                hospitality in Nigeria. Follow these simple steps to start your
                hosting journey.
              </p>
            </m.div>

            <m.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
            >
              {/* Connecting Lines - Desktop Only */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0" />

              {/* Step 1 */}
              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group z-10"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    1
                  </span>
                </div>
                <div className="text-center mt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 16L20 21M20 16L15 21M4 21C4 17.134 7.13401 14 11 14C12.0736 14 13.0907 14.2417 14 14.6736M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Create Your Account
                  </h3>
                  <p className="text-gray-600">
                    Sign up and complete your profile with all necessary
                    information to get started.
                  </p>
                </div>
              </m.div>

              {/* Step 2 */}
              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group z-10"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    2
                  </span>
                </div>
                <div className="text-center mt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 21H21M3 21V11L12 2L21 11V21M3 21H9V15H15V21H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">List Your Property</h3>
                  <p className="text-gray-600">
                    Add your property details, high-quality photos, and set your
                    pricing strategy.
                  </p>
                </div>
              </m.div>

              {/* Step 3 */}
              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group z-10"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    3
                  </span>
                </div>
                <div className="text-center mt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Get Verified</h3>
                  <p className="text-gray-600">
                    Complete our verification process to ensure trust and safety
                    in our community.
                  </p>
                </div>
              </m.div>

              {/* Step 4 */}
              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group z-10"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    4
                  </span>
                </div>
                <div className="text-center mt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <svg
                      className="w-8 h-8 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4V20M12 4L8 8M12 4L16 8M4 12H20M4 12L8 8M4 12L8 16M20 12L16 8M20 12L16 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Start Hosting</h3>
                  <p className="text-gray-600">
                    Welcome guests and start earning by providing exceptional
                    hospitality experiences.
                  </p>
                </div>
              </m.div>
            </m.div>

            <m.div
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-6 bg-white p-2 rounded-full shadow-lg">
                {isLoggedInAndNotHost ? (
                  <AddHost className="px-8 py-4" />
                ) : isLoggedInAndHostAndGuest ? null : (
                  <BecomeAHost>
                    <div className="inline-flex items-center gap-2 bg-primary px-8 py-4 rounded-full text-white font-semibold transition-all hover:bg-primary/90 hover:scale-105 cursor-pointer">
                      Start your hosting journey
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </BecomeAHost>
                )}
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary/5 transition-all"
                >
                  Learn more
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </m.div>
          </div>
        </m.div>

        {/* ESG Section */}
        <m.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="w-full py-20 px-4 md:px-10 bg-gradient-to-br from-[#E7F4E7] to-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#158215]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#158215]/10 rounded-full blur-3xl" />
                <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-8">
                    <Image
                      src="/assets/imgs/esg.png"
                      alt="ESG Commitment"
                      fill
                      className="object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#E7F4E7] rounded-2xl p-4 text-center">
                      <svg
                        className="w-8 h-8 text-[#158215] mx-auto mb-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 8C8 10 5 16 4 22M17 8C19.5 7.5 21.5 7.5 24 8M17 8V2M1 22H24M4 22C5 16 8 10 17 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm font-medium text-[#158215]">
                        Environmental Impact
                      </p>
                    </div>
                    <div className="bg-[#E7F4E7] rounded-2xl p-4 text-center">
                      <svg
                        className="w-8 h-8 text-[#158215] mx-auto mb-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm font-medium text-[#158215]">
                        Social Responsibility
                      </p>
                    </div>
                    <div className="bg-[#E7F4E7] rounded-2xl p-4 text-center">
                      <svg
                        className="w-8 h-8 text-[#158215] mx-auto mb-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm font-medium text-[#158215]">
                        Governance
                      </p>
                    </div>
                  </div>
                </div>
              </m.div>

              <m.div
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <span className="text-[#158215] font-medium mb-4 block">
                  Our ESG Commitment
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Transforming Travel with Purpose
                </h2>
                <div className="space-y-6">
                  <m.div
                    variants={fadeIn}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      Environmental Stewardship
                    </h3>
                    <p className="text-gray-600">
                      We're committed to reducing our environmental footprint
                      through sustainable practices and eco-friendly initiatives
                      across our properties.
                    </p>
                  </m.div>

                  <m.div
                    variants={fadeIn}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <h3 className="text-xl font-bold mb-2">Social Impact</h3>
                    <p className="text-gray-600">
                      Creating positive change in local communities through job
                      creation, cultural preservation, and inclusive hospitality
                      practices.
                    </p>
                  </m.div>

                  <m.div
                    variants={fadeIn}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      Responsible Governance
                    </h3>
                    <p className="text-gray-600">
                      Maintaining the highest standards of transparency, ethics,
                      and accountability in all our business operations.
                    </p>
                  </m.div>
                </div>

                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 bg-[#158215] px-8 py-4 rounded-full text-white font-semibold mt-8 transition-all hover:bg-[#158215]/90 hover:scale-105 shadow-lg group"
                >
                  Learn more about our impact
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </m.div>
            </div>
          </div>
        </m.div>

        <Footer />
      </div>
    </LazyMotion>
  );
};

export default BecomeAHostPage;
