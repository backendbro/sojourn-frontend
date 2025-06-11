"use client";

import Carousel from "react-multi-carousel";
import ReviewCard from "./review-card";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/http/api";
import Spinner from "../svgs/Spinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[100px]">
        <Spinner color="red" size={20} />
      </div>
    );
  }

  return data && data?.length ? (
    <section className="w-full flex flex-col items-center px-8 min-h-[750px] py-24 bg-[#FFF1D7]  sm:px-20 sm:justify-center sm:min-h-[700px] sm:py-16">
      <h3 className="text-center font-[600] text-[48px] text-[#000000] font-sans sm:text-left max-w-[1400px] mx-auto">
        <span className="text-primary">Stories</span> from Our Comfort
      </h3>
      <p className="font-[600] text-center text-[24px] mt-2 text-[#000000] font-sans  sm:text-left max-w-[1400px] mx-auto">
        Here is what our visitors and guests have been saying
      </p>
      <div className="w-full md:w-5/6 relative max-w-[1400px] mx-auto">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="review-parent"
          dotListClass="custom-dot-list-style"
        >
          {data.map(
            (
              item: { name: string; message: string; rating: number },
              idx: number
            ) => (
              <ReviewCard key={idx} review={item} />
            )
          )}
        </Carousel>
      </div>
    </section>
  ) : null;
};
