import { useState } from "react";
import { ReviewSummary } from "../reviews/reviewSummary";
import { ReviewForm } from "../reviews/reviewForm";
import { Button } from "../ui/button";
import { ReviewList } from "../reviews/reviewList";

export function ReviewsTab({
  productId,
  refreshReviews,
  handleReviewSubmitted,
}: {
  productId: number;
  refreshReviews: number;
  handleReviewSubmitted: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ReviewSummary
            productId={productId}
            key={`summary-${refreshReviews}`}
          />
        </div>
        <div className="lg:col-span-2">
          <ReviewForm
            productId={productId}
            onReviewSubmitted={() => {
              handleReviewSubmitted();
            }}
          />
        </div>
      </div>

      <ReviewList productId={productId} key={`list-${refreshReviews}`} />
    </div>
  );
}
