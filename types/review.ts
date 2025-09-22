export interface Review {
  id: number
  productId: number
  userId: number
  rating: number
  comment: string
  created_at: string
  updated_at: string
  user: {
    firstname: string
    lastname: string
  }
  product: {
    name: string
  }
}

export interface ReviewsResponse {
  data: Review[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface CreateReviewRequest {
  productId: number
  userId: number
  rating: number
  comment: string
}

export interface ReviewApiResponse {
  success: boolean
  message: string
  data?: Review
}

