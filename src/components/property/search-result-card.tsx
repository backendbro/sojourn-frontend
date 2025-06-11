import { Star } from "lucide-react";
import Image from "next/image";
import { PropertyCardType } from "./recommended-properties";
import useQueryString from "@/hooks/useQueryString";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useCurrency from "@/hooks/useCurrency";
import Spinner from "../svgs/Spinner";

export default ({
  title,
  city,
  country,
  price,
  id,
  photos,
  reviews = [],
}: PropertyCardType) => {
  const { router, params } = useQueryString();

  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

  const normalizeDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const checkIn = params.get("check-in")
    ? normalizeDate(params.get("check-in") as string)
    : tomorrow;
  const checkOut = params.get("check-out")
    ? normalizeDate(params.get("check-out") as string)
    : dayAfterTomorrow;

  const { exchangeRate, error, loading } = useCurrency();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const symbol = currency === "NGN" ? "₦" : "$";

  const estimatedPrice =
    symbol === "$" ? (price / exchangeRate).toFixed(2) : price;

  let averageRating = 1;

  reviews.forEach((review) => {
    averageRating += +review.rating;
  });

  if (reviews.length)
    averageRating = Math.round(averageRating / reviews.length);

  const reviewsText =
    reviews.length > 1
      ? "reviews"
      : reviews.length === 0
      ? "reviews"
      : "review";

  return (
    <div className="w-full md:w-[95%] h-[350px] recommmeded-property-box-shadow overflow-hidden">
      <div className="w-full h-[170px] relative overflow-hidden">
        <Image src={photos[0]} alt="property_image" fill />
      </div>
      <div className="p-3 space-y-1">
        <h4 className="m-0 p-0 text-[16] font-[700] capitalize truncate">
          {title}
        </h4>
        <p className="m-0 p-0 text-[#292D32] font-[400] text-[12px] capitalize">
          {city}, {country}
        </p>
        <div className="w-full flex">
          {new Array(averageRating === 0 ? 5 : averageRating)
            .fill(0)
            .map((v) => (
              <Star key={v} color="#C40A0D" size={14} fill="#C40A0D" />
            ))}
        </div>
        <div className="w-full flex">
          <span className="font-[600] text-[12px]">{averageRating}</span>
          <span className="text-[#A4A4A4] font-[400] text-[12px]">
            ({reviews.length} {reviewsText})
          </span>
        </div>
        <hr />
        <div className="w-full flex justify-between py-4">
          {loading ? (
            <Spinner color="red" size={20} />
          ) : (
            <p className="text-[16px] font-[700] text-[#292D32]">
              {`${symbol}${estimatedPrice}`}
              <span className="text-[#A4A4A4] font-[400] text-[12px]">
                /night
              </span>
            </p>
          )}
          <button
            onClick={() => {
              router.push(
                `/properties/${id}?check-in=${checkIn?.toISOString()}&check-out=${checkOut?.toISOString()}`
              );
            }}
            className="text-white bg-primary rounded-md px-2 text-[12px] font-[700]"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};
