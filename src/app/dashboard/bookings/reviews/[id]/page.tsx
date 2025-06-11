"use client";

import Spinner from "@/components/svgs/Spinner";
import { createReview } from "@/http/api";
import { RootState } from "@/store";
import { CreateReview } from "@/types/reviews";
import { useMutation } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const reviews = [
  "The apartment was spotless and well-equipped. 🏠✨",
  "Great location, close to everything! Would book again. 📍",
  "The host was super friendly and accommodating. 😊",
  "Comfortable stay, but a bit noisy at night. 🔊",
  "Perfect for a weekend getaway! Highly recommended. 🌟",
  "Beautiful views and cozy atmosphere. Loved it! 🌄",
];

export default ({ params: { id } }: { params: { id: string } }) => {
  const userId = useSelector((state: RootState) => state.user.me.id);

  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["add-review"],
    mutationFn: createReview,
    onSuccess() {
      toast("Your review has been submitted successfuly.", {
        closeButton: true,
      });
      clearState();
    },
    onError() {
      toast(
        "Sorry, we could not submit your review that time, Please try again",
        {
          closeButton: true,
        }
      );
    },
  });

  const [rating, setRating] = useState(0);

  const [selectedReview, setSelectedReview] = useState("");

  function clearState() {
    setSelectedReview("");
    setRating(0);
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedReview(e.target.value);
  };

  // Function to select a review
  const handleSelectReview = (review: string) => {
    setSelectedReview(review);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!rating || !selectedReview) {
      toast("please fill all fields", { closeButton: true });
      return;
    }
    const review: CreateReview = {
      message: selectedReview,
      rating,
      userId,
      bookingId: id,
    };
    mutation.mutate(review);
  }

  return (
    <div className="w-full py-[80px] px-8 flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full md:w-2/3 p-2 space-y-4">
        <h4 className="text-lg">Please submit a review for the listing.</h4>
        <ul className="w-full grid md:grid-cols-2 gap-y-2 md:gap-2 list-none p-0">
          {reviews.map((review, index) => (
            <li key={index}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectReview(review);
                }}
                className={`p-2.5 w-full text-left rounded-md border cursor-pointer ${
                  selectedReview === review
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                {review}
              </button>
            </li>
          ))}
        </ul>
        <div className="w-full flex items-center space-x-2">
          {new Array(5).fill(0).map((_, idx: number) => {
            const color = rating >= idx + 1 ? "gold" : "gray";
            return (
              <Star
                className="cursor-pointer"
                onClick={() => {
                  setRating(idx + 1);
                }}
                key={idx}
                fill={color}
                color={color}
                size={40}
              />
            );
          })}
        </div>
        <textarea
          className="resize-none w-full border rounded-md h-[250px] p-3 text-lg"
          value={selectedReview}
          onChange={handleChange}
        />
        <div className="w-full flex justify-end">
          <button className="flex items-center justify-center text-md rounded-full bg-primary text-white font-semibold px-4 py-3 ease duration-300 hover:bg-red-800">
            {mutation.isPending ? (
              <Spinner color="white" size={20} />
            ) : (
              <span>Submit your review</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
