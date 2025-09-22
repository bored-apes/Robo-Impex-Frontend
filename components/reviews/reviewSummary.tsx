"use client";

import { useState, useEffect } from "react";
import { Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { reviewService } from "@/lib/apiServices/review.service";
import type { Review } from "@/types/review";
import { StarRating } from "../shared/common/starRating";

interface ReviewSummaryProps {
  productId: number;
  className?: string;
}

interface RatingBreakdown {
  [key: number]: number;
}

export function ReviewSummary({ productId, className }: ReviewSummaryProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingBreakdown, setRatingBreakdown] = useState<RatingBreakdown>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  useEffect(() => {
    fetchReviewSummary();
  }, [productId]);

  const fetchReviewSummary = async () => {
    setLoading(true);

    try {
      const response = await reviewService.getProductReviews(
        productId,
        1,
        1000000
      );

      if (response.success && response.data) {
        const allReviews = response.data.data;
        setReviews(allReviews);
        setTotalReviews(allReviews.length);

        if (allReviews.length > 0) {
          // Calculate average rating
          const totalRating = allReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const avgRating = totalRating / allReviews.length;
          setAverageRating(Math.round(avgRating * 10) / 10);

          // Calculate rating breakdown
          const breakdown: RatingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
          allReviews.forEach((review) => {
            breakdown[review.rating] = (breakdown[review.rating] || 0) + 1;
          });
          setRatingBreakdown(breakdown);
        }
      }
    } catch (error) {
      console.error("Failed to fetch review summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${starSize} ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getPercentage = (count: number) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  if (loading) {
    return (
      <Card className={`animate-pulse ${className}`}>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-32"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-8 bg-muted rounded w-16"></div>
            <div className="h-6 bg-muted rounded w-24"></div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-4 bg-muted rounded w-8"></div>
              <div className="flex-1 h-2 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-8"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (totalReviews === 0) {
    return (
      <Card className={`border-l-4 border-l-primary ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="flex justify-center mb-3">
              {renderStars(0, "lg")}
            </div>
            <p className="text-muted-foreground">No reviews yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Be the first to review this product!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Customer Reviews
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary mb-1">
              {averageRating}
            </div>
            <StarRating
              rating={averageRating ?? 0}
              size="h-3 w-3 sm:h-4 sm:w-4 flex justify-center mb-1"
            />

            <p className="text-sm text-muted-foreground">
              {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm font-medium w-8">{rating}</span>
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <Progress
                  value={getPercentage(ratingBreakdown[rating])}
                  className="flex-1 h-2"
                />
                <span className="text-sm text-muted-foreground w-10 text-right">
                  {getPercentage(ratingBreakdown[rating])}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              {getPercentage(ratingBreakdown[5] + ratingBreakdown[4])}%
            </div>
            <p className="text-xs text-muted-foreground">Positive Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {Math.round(averageRating * 20)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall Satisfaction
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
