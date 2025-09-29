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
                  {/* NOTE: Veil removed for Lite. Only show Coming Soon for Premium */}
                  {plan.name === "Premium" && (
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
              className="mt-16 text-center"
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
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-primary font-semibold hover:bg-primary/5 transition-all"
              >
                Learn more
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
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
              </m.div>{" "}
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
                  className="inline-flex items-center gap-2 bg-[#158215] px-8 py-4 rounded-full text-white font-semibold mt-8 transition-all hover:bg-[#158215]/90 hover:scale-105 shadow-lg group"
                >
                  Learn more about our impact
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </m.div>
          </div>
        </m.div>

        <Footer />
      </div>
    </LazyMotion>
  );
};

export default BecomeAHostPage;
