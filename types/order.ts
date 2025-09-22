export interface Order {
  id: number
  user_id: number
  product_id: number
  quantity: number
  base_price: number
  gst_rate: number
  gst_amount: number
  final_price: number
  razorpay_order_id?: string | null
  razorpay_payment_id?: string | null
  payment_status: "Paid" | "Unpaid" | "Failed"
  shipping_status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  transport_id?: number | null
  created_at: string
}

export interface OrderWithProduct extends Order {
  product?: {
    id: number
    name: string
    image?: string
    category?: string
  }
}

export interface OrdersResponse {
  data: Order[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface OrdersApiResponse {
  data: Order[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
