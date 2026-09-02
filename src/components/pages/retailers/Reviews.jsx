import ReviewScrollEffect from "@/components/reuseable-animated-component/reviews-pop-out/ReviewScrollEffect";
import { customerReviews } from "@/data/reviews";
import React from "react";

const Reviews = () => {
  return (
    <div>
      <ReviewScrollEffect reviews={customerReviews} />
    </div>
  );
};

export default Reviews;
