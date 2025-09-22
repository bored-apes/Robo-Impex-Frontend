export interface Enquiry {
  id: number
  user_id?: number
  product_id?: number
  quantity?: number
  message?: string
  created_at: Date
}

export interface CreateEnquiryRequest {
  productId: number
  userId: number | null
  quantity: number
  message: string
}

export interface EnquiryApiResponse {
  success: boolean
  message: string
  data?: Enquiry
}
