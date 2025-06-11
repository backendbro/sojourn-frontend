import { Card, CardContent } from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

export default () => {
  return (
    <section className="w-full flex flex-col px-8 min-h-[750px] py-24 bg-secondary space-y-10 sm:px-20 sm:space-y-10 sm:justify-center sm:min-h-[700px] sm:py-10">
      <h3 className="text-center font-[500] text-[35px] text-[#000000] font-sans sm:text-left max-w-[1400px] mx-auto">
        Stories from Our Comfort
      </h3>
      <p className="text-center text-[20px] text-[#2c2c2c] font-sans  sm:text-left max-w-[1400px] mx-auto">
        Here is what our visitors and guests have been saying
      </p>
      <div>
        <Carousel className="w-full max-w-[1400px] mx-auto">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => {
              const styles = [
                "rounded-tl-[50px]",
                "rounded-tr-[50px]",
                "rounded-bl-[50px]",
                "rounded-br-[50px]",
              ];
              const flexDirections = [
                "items-start",
                "items-end",
                "items-start",
                "items-end",
                "items-start",
              ];
              const colors = [
                "bg-[#F0AE2F]",
                "bg-[#BBBB53]",
                "bg-[#9E372A]",
                "bg-[#0f4865]",
              ];
              const value = index % 4;
              return (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className={`p-1 ${styles[value]} ${colors[value]} w-full h-[230px] text-white px-10 flex flex-col ${flexDirections[value]} justify-center  space-y-4`}
                  >
                    <h4 className="text-center sm:text-left">Hello XYZ</h4>
                    <div className="w-full">
                      <p className="text-white font-[400] text-[13px] sm:text-[12px]">
                        "Our family was traveling via bullet train between
                        cities in Poland with our luggage - the location for
                        this Apartment made that so easy. Sojourn price was
                        fantastic. "
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute border-0 w-[100px] h-[100px] top-[100%] mt-20 left-0 bg-red-50 ease duration-300 hover:bg-red-200 md:left-1/3" />
          <CarouselNext className="absolute border-0 w-[100px] h-[100px] top-[100%] mt-20 right-0 bg-red-50 ease duration-300 hover:bg-red-200 md:right-1/3" />
        </Carousel>
      </div>
    </section>
  );
};
