export interface Order {
  id: number;
  user_id?: number;
  product_id?: number;
  quantity?: number;
  base_price?: number;
  gst_rate?: number;
  gst_amount?: number;
  final_price?: number;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  payment_status: "Paid" | "Unpaid" | "Failed";
  shipping_status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  transport_id?: number;
  created_at: string;
}

export interface OrderWithProduct extends Order {
  product?: {
    id: number;
    name: string;
    image?: string;
    category?: string;
  };
}
