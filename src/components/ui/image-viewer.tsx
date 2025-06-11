"use client";

import { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  function next() {
    if (currentImageIndex >= images.length) return;
    setCurrentImageIndex((index) => index + 1);
  }

  function previous() {
    if (currentImageIndex <= 0) return;
    setCurrentImageIndex((index) => index - 1);
  }

  function keyPress(event: { key: string; stopPropagation: () => void }) {
    if (event.key === "ArrowLeft" && currentImageIndex > 0) {
      event.stopPropagation();
      setCurrentImageIndex((index) => index - 1);
    } else if (
      event.key === "ArrowRight" &&
      currentImageIndex < images.length - 1
    ) {
      event.stopPropagation();
      setCurrentImageIndex((index) => index + 1);
    } else {
      event.stopPropagation();
      return;
    }
  }

  useEffect(() => {
    const imageIndex = images.indexOf(url);
    setCurrentImageIndex(imageIndex);
  }, [url]);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);

    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [currentImageIndex]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-full h-full sm:max-w-[1024px]  flex items-center justify-center fixed sm:h-[550px] bg-white border-0">
        {currentImageIndex > 0 && (
          <div
            onClick={previous}
            className="absolute cursor-pointer top-[80%] sm:top-1/2 left-14 md:-translate-x-1/2 flex items-center justify-center p-2 bg-[#222] rounded-full ease duration-300 hover:bg-black hover:left-12"
          >
            <ChevronLeft size={50} color="white" />
          </div>
        )}
        <div className="w-full sm:w-4/5 h-1/2 sm:h-full bg-white relative">
          <Image
            src={images[currentImageIndex]}
            alt="property listing"
            fill
            className="rounded-xl ease duration-300 group-hover:scale-[1.05] "
          />
        </div>
        {currentImageIndex < images.length - 1 && (
          <div
            onClick={next}
            className="absolute top-[80%] sm:top-1/2 -right-3 cursor-pointer -translate-x-1/2 flex items-center justify-center p-2 bg-[#222] rounded-full ease duration-300 hover:bg-black hover:-right-5"
          >
            <ChevronRight size={50} color="white" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
