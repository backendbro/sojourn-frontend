export default ({
  review,
}: {
  review: { message: string; name: string; rating: number };
}) => {
  return (
    <div className="w-full md:w-[95%] flex flex-col items-center relative h-[400px] md:h-[350px]">
      <div className="w-[150px] h-[150px] md:w-[120px] md:h-[120px] rounded-full bg-cover bg-no-repeat bg-[url(/assets/imgs/review-image.jfif)]  absolute top-[-60px] isolate left-1/2 -translate-x-1/2"></div>
      <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-between px-5 pt-28 md:pt-20 pb-7">
        <div className="w-full h-[200px] rounded-xl flex flex-col items-center  px-5 py-2">
          <p className="text-[16px]">"{review.message} "</p>
        </div>
        <h4 className="text-primary font-[500]">- {review.name}</h4>
      </div>
    </div>
  );
};
