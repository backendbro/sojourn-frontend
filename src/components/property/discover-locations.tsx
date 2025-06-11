import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const Discover = () => {
  return (
    <section className="w-full px-8 flex flex-col space-y-20 overflow-x-hidden mt-[100px] sm:px-14 lg:mt-[50px]">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-center font-[500] text-[#000000] text-[35px] sm:text-left">
          Discover our lovely properties
        </h2>
        <div className="text-[20px] text-[#2c2c2c] font-sans text-center sm:text-left">
          Find homes that would meet all your needs while staying
        </div>
      </div>
      <Carousel className="w-full h-full">
        <CarouselContent className="w-full -mt-1 h-full">
          <CarouselItem className="sm:pl-10 basis-full md:basis-1/2 lg:basis-1/3 pb-10">
            <div className="uui-team06_slide w-slide">
              <div className="uui-team06_item">
                <div className="uui-team06_image-wrapper">
                  <img
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d6363a04b09d9d0644430_bedimg.png"
                    loading="lazy"
                    alt=""
                    className="uui-team06_image"
                  />
                  <div className="label">
                    <div className="text-block-4">Town Home</div>
                    <div className="text-block-5">Apartments</div>
                  </div>
                </div>
                <div className="div-block-5">
                  <div className="uui-heading-tiny">
                    Comfortable, Economical rooms
                  </div>
                  <div className="uui-space-xsmall"></div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d566229a31294ec8a6722_sleeping-bed.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Private Bedroom</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662bc54d6fc8ad0b5ab_kitchen.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Kitchen</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662a527f12fd64f1e45_shower.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Bathroom</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662a0f18da65880b6b6_sofa.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Shared</div>
                    </div>
                  </div>
                </div>
                <div className="uui-space-xsmall"></div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:pl-10 basis-full md:basis-1/2 lg:basis-1/3  pb-10">
            <div className="uui-team06_slide w-slide">
              <div className="uui-team06_item">
                <div className="uui-team06_image-wrapper">
                  <img
                    srcSet="
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8952_Blog%2520Image-p-500.jpg 500w,
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8952_Blog%20Image.jpg         688w
                      "
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 69vw, (max-width: 991px) 44vw, 27vw"
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8952_Blog%20Image.jpg"
                    alt=""
                    className="uui-team06_image"
                  />
                  <div className="label">
                    <div className="text-block-4">SmartShare</div>
                    <div className="text-block-5">Apartments</div>
                  </div>
                </div>
                <div className="div-block-5">
                  <div className="uui-heading-tiny">
                    Comfortable, Economical rooms
                  </div>
                  <div className="uui-space-xsmall"></div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d566229a31294ec8a6722_sleeping-bed.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Private Bedroom</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662bc54d6fc8ad0b5ab_kitchen.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Kitchen</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662a527f12fd64f1e45_shower.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Bathroom</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662a0f18da65880b6b6_sofa.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Shared</div>
                    </div>
                  </div>
                  <div className="uui-space-xsmall"></div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:pl-10 basis-full md:basis-1/2 lg:basis-1/3  pb-10">
            <div className="uui-team06_slide w-slide">
              <div className="uui-team06_item">
                <div className="uui-team06_image-wrapper">
                  <img
                    srcSet="
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8952_Blog%2520Image-p-500.jpg 500w,
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8952_Blog%20Image.jpg         688w
                      "
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 69vw, (max-width: 991px) 44vw, 27vw"
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8952_Blog%20Image.jpg"
                    alt=""
                    className="uui-team06_image"
                  />
                  <div className="label">
                    <div className="text-block-4">Prime Inn</div>
                    <div className="text-block-5">Apartments</div>
                  </div>
                </div>
                <div className="div-block-5">
                  <div className="uui-heading-tiny">
                    Comfortable, Economical rooms
                  </div>
                  <div className="uui-space-xsmall"></div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d566229a31294ec8a6722_sleeping-bed.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Private Bedroom</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662bc54d6fc8ad0b5ab_kitchen.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Kitchen</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662a527f12fd64f1e45_shower.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Bathroom</div>
                    </div>
                  </div>
                  <div className="w-layout-vflex perks">
                    <div className="w-layout-hflex">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663d5662a0f18da65880b6b6_sofa.svg"
                        loading="lazy"
                        alt=""
                      />
                      <div className="text-block-5">Large Shared Shared</div>
                    </div>
                  </div>
                  <div className="uui-space-xsmall"></div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          color="#DE5353"
          className="absolute border-0 top-[100%] mt-7 left-0 flex lg:hidden md:w-[100px] md:h-[100px] lg:left-[90%]"
        />
        <CarouselNext
          color="#DE5353"
          className="absolute border-0 top-[100%] mt-7 right-0 flex md:w-[100px] md:h-[100px] lg:hidden"
        />
      </Carousel>
      <div className="uui-text-align-center">
        <div className="uui-max-width-large align-center">
          <a href="#" className="button-primary-big w-button font-sans">
            Explore all
          </a>
        </div>
      </div>
    </section>
  );
};

export default Discover;
