import type { OrderStatusEnum } from "./enums"

export interface Order {
  id: number
  user_id?: number
  product_id?: number
  quantity?: number
  base_price?: number
  gst_rate?: number
  gst_amount?: number
  final_price?: number
  razorpay_order_id?: string
  razorpay_payment_id?: string
  status: OrderStatusEnum
  transport_id?: number
  created_at: Date
}
