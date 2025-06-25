"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import { Metadata } from "next";
import Image from "next/image";
import Carousel from "react-multi-carousel";

export const metadata: Metadata = {
  title: "Refer a Host to Sojourn | Earn Rewards",
  description:
    "Refer property owners to Sojourn and earn rewards. Join our referral program today.",
  keywords:
    "refer a host Sojourn, Sojourn referral program, host referral rewards",
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
export default () => {
  const { width, height } = useWindowSize();

  const mobile = width < 768;

  const tablet = width > 768;

  return (
    // <div className="w-full flex flex-col-reverse md:flex-row min-h-[500px] mb-20 relative overflow-hidden my-6 max-w-[1400px]  mx-auto">
    //   <div className="w-full md:w-1/2 h-[300px] md:h-auto pb-4 refer-bg relative flex flex-col justify-center items-center">
    //     <div className="w-full h-full  absolute top-0 left-0 opacity-[.8] bg-white"></div>
    //     <div className="flex flex-col items-center md:items-left w-5/6 md:w-1/2 space-y-2 md:space-y-4">
    //       <div className="isolate text-[#810B0B] text-[48px] md:text-[78px] font-[900] leading-[75px]">
    //         Refer <br className="hidden md:block" /> & Earn
    //       </div>
    //       <p className="font-[700] md:font-[500] text-[16px] md:text-[24px]  isolate text-center md:text-left">
    //         Earn ₦1000 when you refer a guest
    //       </p>
    //       <Link
    //         href="/deals-and-offers"
    //         prefetch
    //         className="w-4/6 md:w-2/3 text-center py-3 px-2 md:p-2 rounded-md bg-primary font-[700] text-white isolate ease duration-300 hover:bg-red-800"
    //       >
    //         Find more deals and offers
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="w-full h-[350px] md:h-auto md:w-1/2 bg-primary relative overflow-hidden">
    //     <Image
    //       src="/assets/imgs/deals2.svg"
    //       alt="refer_and_earn_ad2"
    //       fill
    //       className="block md:hidden"
    //     />
    //   </div>
    //   <Image
    //     src="/assets/imgs/deals.svg"
    //     alt="refer_and_earn_ad"
    //     width={600}
    //     height={800}
    //     className="hidden md:block absolute top-0 md:top-[100px] left-[750px] -translate-x-1/2"
    //   />
    // </div>
    <div className="w-full flex flex-col-reverse md:flex-row h-auto mb-20 relative overflow-hidden my-6 max-w-[1400px]  mx-auto">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="earn-parent"
        dotListClass="custom-dot-list-style"
      >
        {tablet ? (
          <div className="hidden md:block w-full h-[700px] relative overflow-hidden">
            <Image
              src="/assets/imgs/refer.jpg"
              alt="refer_image"
              fill
              priority
            />
          </div>
        ) : null}
        {tablet ? (
          <div className="hidden md:block w-full h-[700px] relative overflow-hidden">
            <Image
              src="/assets/imgs/credit-desktop.jpeg"
              alt="refer_image"
              fill
              priority
            />
          </div>
        ) : null}
        {tablet ? (
          <div className="hidden md:block w-full h-[700px] relative overflow-hidden">
            <Image
              src="/assets/imgs/choose-desktop.jpg"
              alt="refer_image"
              fill
              priority
            />
          </div>
        ) : null}
        {mobile ? (
          <div className="block md:hidden w-full h-[410px] relative overflow-hidden">
            <Image
              src="/assets/imgs/refer-mobile.jpg"
              alt="refer_image"
              fill
              priority
            />
          </div>
        ) : null}
        {mobile ? (
          <div className="block md:hidden w-full h-[410px] relative overflow-hidden">
            <Image
              src="/assets/imgs/credit-mobile.jpeg"
              alt="refer_image"
              fill
              priority
            />
          </div>
        ) : null}
        {mobile ? (
          <div className="block md:hidden w-full h-[410px] relative overflow-hidden">
            <Image
              src="/assets/imgs/choose-mobile.jpg"
              alt="refer_image"
              fill
              priority
            />
          </div>
        ) : null}
      </Carousel>
    </div>
  );
};
