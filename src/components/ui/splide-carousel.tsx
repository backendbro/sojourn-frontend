"use client";

import { ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";

export default ({
  children,
  url,
  images,
}: {
  children: ReactNode;
  url: string;
  images: string[];
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [mainSplide, setMainSplide] = useState(null);
  const [thumbsSplide, setThumbsSplide] = useState(null);

  const mainOptions = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    height: "500px",
    start: currentImageIndex,
  };

  // Options for the thumbnail slider
  const thumbsOptions = {
    type: "slide",
    rewind: true,
    gap: "1rem",
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    cover: true,
    focus: "center",
    isNavigation: true,
    start: currentImageIndex,
  };

  // Synchronize the two carousels when both are mounted
  useEffect(() => {
    if (mainSplide && thumbsSplide) {
      // Set the thumbnails as navigation for the main slider
      //@ts-ignore
      mainSplide.sync(thumbsSplide);
      //@ts-ignore
      // thumbsSplide.mount();
    }
  }, [mainSplide, thumbsSplide]);

  useEffect(() => {
    const imageIndex = images.indexOf(url);
    setCurrentImageIndex(imageIndex);
  }, [url]);

  // Handle the mount of the main slider
  const handleMainMount = (splide: any) => {
    setMainSplide(splide);
  };

  // Handle the mount of the thumbnails slider
  const handleThumbsMount = (splide: any) => {
    setThumbsSplide(splide);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-full h-full sm:max-w-[1024px] md:w-[700px]  flex items-center justify-center fixed sm:h-[650px] bg-white border-0">
        <div className="w-full flex flex-col pt-8">
          {/* Main carousel */}
          <Splide
            options={mainOptions}
            onMounted={handleMainMount}
            className="px-10"
            aria-labelledby="main-carousel"
          >
            {images.map((image: string, idx: number) => (
              <SplideSlide key={idx}>
                <div className="flex items-center relative justify-center h-full ">
                  <Image
                    fill
                    src={image}
                    alt={`property_image_${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>

          {/* Thumbnail carousel */}
          <div className="mt-2">
            <Splide
              className="px-7"
              options={thumbsOptions}
              onMounted={handleThumbsMount}
            >
              {images.map((image: string, idx: number) => (
                <SplideSlide key={idx}>
                  <div className="flex items-center relative justify-center h-full ">
                    <Image
                      fill
                      src={image}
                      alt={`property_thumbnail_${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
