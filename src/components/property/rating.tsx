import StarIcon from "../svgs/StarIcon";

export default ({
  rating = 4.5,
  numberOfComments = 14,
}: {
  rating?: number;
  numberOfComments?: number;
}) => {
  const reviewsText =
    numberOfComments > 1
      ? "reviews"
      : numberOfComments === 0
      ? "reviews"
      : "review";

  return (
    <div className="flex items-center">
      <StarIcon size={14} />
      <span className="font-semibold text-sm md:text-md">{rating}</span>
      <span className="mx-1 text-sm md:text-md text-gray-400">
        ({numberOfComments} {reviewsText})
      </span>
    </div>
  );
};
