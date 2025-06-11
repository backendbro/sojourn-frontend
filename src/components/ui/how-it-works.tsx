"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { useMediaQuery } from "@react-hook/media-query";

export default () => {
  const matches = useMediaQuery("screen and (max-width: 750px)");

  return (
    <div className="w-full p-8 min-h-[200px] flex flex-col items-center mt-[110px] lg:px-20 lg:mt-[100px]">
      <div className="mb-10">
        <h3 className="heading-4 font-sans text-[#310000] ">How it works!</h3>
      </div>
      <Carousel
        opts={{ slidesToScroll: matches ? 1 : 2 }}
        className="w-full lg:w-3/4"
      >
        <CarouselContent className="-ml-1 w-full">
          <CarouselItem className="pl-1 sm:pl-10 basis-full sm:basis-1/2">
            <div className="p-1">
              <div className=" w-full">
                <div className="div-block-16">
                  <div className="uui-layout91_item">
                    <img
                      sizes="(max-width: 479px) 100vw, 64px"
                      srcSet="
                            https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d29b6bdcbbee50a4de89_map-p-500.png 500w,
                            https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d29b6bdcbbee50a4de89_map.png       512w
                          "
                      width="20px"
                      alt="Integration icon"
                      src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d29b6bdcbbee50a4de89_map.png"
                      loading="lazy"
                      className="uui-layout91_icon"
                    />
                    <div className="uui-space-xsmall-2"></div>
                    <h3 className="uui-heading-xxsmall font-sans">
                      Select a Destination
                    </h3>
                    <div className="uui-space-xsmall-2"></div>
                    <div className="uui-space-xxsmall">
                      <div className="div-block-12">
                        <div className="div-block-13">
                          <img
                            src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                            loading="lazy"
                            width="22px"
                            sizes="(max-width: 479px) 100vw, 3vw"
                            alt=""
                            srcSet="
                                  https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                                  https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                                "
                            className="mb-[-10px] sm:mb-[0px]"
                          />
                          <img
                            src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                            loading="lazy"
                            sizes="(max-width: 479px) 100vw, 3vw"
                            srcSet="
                                  https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                                  https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                                "
                            alt=""
                            width="22px"
                          />
                        </div>
                        <div className="div-block-14">
                          <div className="combine-text-size-regular font-sans">
                            Use our website to choose your desired destination.
                            <br />‍<br />
                            Use the street view to see the neighbourhood of
                            desired destination.
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:pl-10 basis-full sm:basis-1/2">
            <div className="p-1">
              <div className="w-full">
                <div className="uui-layout91_item">
                  <img
                    sizes="(max-width: 479px) 100vw, 64px"
                    srcSet="
                          https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d0f3c7cc28078257b986_booking-p-500.png 500w,
                          https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d0f3c7cc28078257b986_booking.png       512w
                        "
                    alt="Integration icon"
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d0f3c7cc28078257b986_booking.png"
                    loading="lazy"
                    className="uui-layout91_icon"
                  />
                  <div className="uui-space-xsmall-2"></div>
                  <h3 className="uui-heading-xxsmall font-sans">
                    Choose an Apartment and Make a Reservation
                  </h3>
                  <div className="uui-space-xxsmall"></div>
                  <div className="div-block-12">
                    <div className="div-block-13">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        width="22px"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        alt=""
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        className="mb-[-10px] sm:mb-[0px]"
                      />

                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        width="22px"
                        srcSet="
                        
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        alt=""
                        className="mb-[-12px] sm:mb-[3px]"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        alt=""
                        width="22px"
                      />
                    </div>
                    <div className="div-block-14">
                      <div className="combine-text-size-regular font-sans">
                        Select your preferred apartment based on your
                        preferences.
                        <br />‍<br />
                        Use the area view to move through the apartment to get
                        more insight.
                        <br />‍<br />
                        Enter your desired dates and complete the reservation
                        process.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:pl-10 basis-full sm:basis-1/2">
            <div className="p-1">
              <div className="w-full">
                <div className="uui-layout91_item">
                  <img
                    sizes="(max-width: 479px) 100vw, 64px"
                    srcSet="
                          https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d0495ad20b03d0d4bc42_payment-method-p-500.png 500w,
                          https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d0495ad20b03d0d4bc42_payment-method.png       512w
                        "
                    alt="Integration icon"
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d0495ad20b03d0d4bc42_payment-method.png"
                    loading="lazy"
                    className="uui-layout91_icon"
                  />
                  <div className="uui-space-xsmall-2"></div>
                  <h3 className="uui-heading-xxsmall font-sans">
                    Payment Method
                  </h3>
                  <div className="uui-space-xxsmall">
                    <div className="uui-space-xsmall-2"></div>
                  </div>
                  <div className="div-block-12">
                    <div className="div-block-13">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        width="22px"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        alt=""
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        className="mb-[-10px] sm:mt-[-3px]"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        alt=""
                        width="22px"
                        className="mb-[-10px] sm:mt-[-7px]"
                      />
                    </div>
                    <div className="div-block-14">
                      <div className="combine-text-size-regular font-sans">
                        Choose your preferred payment method.
                        <br />‍<br />
                        We accept credit/debit cards, Sojourn credit, crypto.
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:pl-10 basis-full sm:basis-1/2">
            <div className="p-1">
              <div className="w-full">
                <div className="uui-layout91_item">
                  <img
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d0408bd70e3eb2cfe29e_check-in.png"
                    loading="lazy"
                    alt="Integration icon"
                    className="uui-layout91_icon"
                  />
                  <div className="uui-space-xsmall-2"></div>
                  <h3 className="uui-heading-xxsmall font-sans">
                    Enjoy your stay
                  </h3>
                  <div className="uui-space-xxsmall">
                    <div className="uui-space-xsmall-2"></div>
                  </div>
                  <div className="div-block-12">
                    <div className="div-block-13">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        width="22px"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        alt=""
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        className="mb-[-10px] sm:mb-[0px]"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        width="22px"
                        alt=""
                      />
                    </div>
                    <div className="div-block-14">
                      <div className="combine-text-size-regular font-sans">
                        Upon confirmation, you&#x27;ll receive check-in
                        instructions via email.
                        <br />‍<br />
                        Arrive at your chosen apartment, check in smoothly, and
                        start enjoying your stay!
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:pl-10 basis-full sm:basis-1/2">
            <div className="p-1">
              <div className="w-full">
                <div className="uui-layout91_item">
                  <img
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647d040570b01ab8bfea885_check-out.png"
                    loading="lazy"
                    alt="Integration icon"
                    className="uui-layout91_icon"
                  />
                  <div className="uui-space-xsmall-2"></div>
                  <h3 className="uui-heading-xxsmall font-sans">Check out</h3>
                  <div className="uui-space-xxsmall"></div>
                  <div className="div-block-12">
                    <div className="div-block-13">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        width="22px"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        alt=""
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        className="mb-[-10px] sm:mb-[0px]"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, 3vw"
                        srcSet="
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked-p-500.png 500w,
                              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6648c1c38f13a8a189c8d87b_checked.png       512w
                            "
                        alt=""
                        width="22px"
                      />
                    </div>
                    <div className="div-block-14">
                      <div className="combine-text-size-regular font-sans">
                        Leave the apartment in the same condition as you found
                        it.
                        <br />‍<br />
                        Use the check-out time extension option if you require a
                        check-out time extension or contact support.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:pl-10 basis-full sm:basis-1/2">
            <div className="p-1">
              <div className="w-full">
                <div className="uui-layout91_item">
                  <img
                    sizes="(max-width: 479px) 100vw, 64px"
                    srcSet="
                          https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bfe524d8282aa621fc509_thumb-up%20(1)-p-500.png 500w,
                          https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bfe524d8282aa621fc509_thumb-up%20(1).png       512w
                        "
                    alt="Integration icon"
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bfe524d8282aa621fc509_thumb-up%20(1).png"
                    loading="lazy"
                    className="uui-layout91_icon"
                  />
                  <div className="div-block-15">
                    <a
                      href="#"
                      className="button-primary-big-green w-button font-sans"
                    >
                      Try it out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          color="#DE5353"
          className="absolute border-0  top-[100%] mt-12 left-0 lg:mt-0 lg:-left-28 lg:top-1/2 md:w-[100px] md:h-[100px]"
        />
        <CarouselNext
          color="#DE5353"
          className="absolute border-0   top-[100%] mt-12 right-0 lg:top-1/2 lg:mt-0 lg:-right-32 md:w-[100px] md:h-[100px]"
        />
      </Carousel>
    </div>
  );
};
