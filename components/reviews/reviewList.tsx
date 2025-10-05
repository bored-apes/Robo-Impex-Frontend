"use client";

import { useState, useEffect } from "react";
import { Star, User, ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination } from "@/components/shared/common/pagination";
import { reviewService } from "@/lib/apiServices/review.service";
import type { Review } from "@/types/review";
import { useAuth } from "@/context/authContext";
import { motion } from "framer-motion";
import { StarRating } from "../shared/common/starRating";

interface ReviewListProps {
  productId: number;
  className?: string;
}

export function ReviewList({ productId, className }: ReviewListProps) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reviewsPerPage = 5;

  useEffect(() => {
    fetchReviews();
  }, [productId, currentPage]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await reviewService.getProductReviews(
        productId,
        currentPage,
        reviewsPerPage
      );

      if (response.success && response.data) {
        setReviews(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalReviews(response.data.pagination.total);
      } else {
        setError(response.message || "Failed to load reviews");
      }
    } catch (err) {
      setError("An error occurred while loading reviews");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">{error}</p>
        <Button
          variant="outline"
          onClick={fetchReviews}
          className="mt-4 bg-transparent"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
        <p className="text-muted-foreground">
          Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Customer Reviews ({totalReviews})
        </h3>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      {/* <AvatarImage
                        src={review.user.avatar || "/placeholder.svg"}
                      /> */}
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(review.user.firstname)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">
                          {review.user.firstname}
                        </h4>
                        {/* {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )} */}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isAuthenticated && user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Report Review</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {/* {review.title && (
                  <h5 className="font-medium mb-2">{review.title}</h5>
                )} */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {review.comment}
                </p>

             
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showInfo={false}
          />
        </div>
      )}
    </div>
  );
}
