import { CreateReviewRequest, ReviewApiResponse, ReviewsResponse } from "@/types/review";
import api from "../axios"

export const reviewService = {
  async getProductReviews(
    productId: number,
    page = 1,
    pageSize = 10,
  ): Promise<{ success: boolean; message: string; data?: ReviewsResponse }> {
    try {
      const response = await api.get(`/review/product/${productId}/reviews`, {
        params: { page, pageSize },
      })
      return {
        success: true,
        message: "Reviews fetched successfully",
        data: response.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch reviews",
      }
    }
  },

  async createReview(reviewData: CreateReviewRequest): Promise<ReviewApiResponse> {
    try {
      const response = await api.post("/review/create", reviewData)
      return {
        success: true,
        message: "Review submitted successfully",
        data: response.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to submit review",
      }
    }
  },
}
