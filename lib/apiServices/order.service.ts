import type { Order } from "@/types/order";
import api from "../axios";
import { PaginationParams } from "@/types/products";

export interface CreateOrderData {
  user_id: number;
  product_id: number;
  quantity: number;
  base_price: number;
  gst_rate: number;
  gst_amount: number;
  final_price: number;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  transport_id?: number;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data?: any;          // keep for paginated {data, pagination}
  orders?: Order[];
  order?: Order;
}

export async function createOrder(
  orderData: CreateOrderData
): Promise<OrderResponse> {
  try {
    const response = await api.post("/order", orderData);
    return {
      success: true,
      message: "Order created successfully",
      order: response.data.order,
    };
  } catch (error) {
    console.error("Create order error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to create order" };
  }
}

export async function getAllOrders(): Promise<OrderResponse> {
  try {
    const response = await api.get("/order");
    return { success: true, message: "Orders fetched successfully", orders: response.data };
  } catch (error) {
    console.error("Get orders error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to fetch orders" };
  }
}

export async function getOrderByUserId(
  userId: number | null,
  params?: PaginationParams
): Promise<OrderResponse> {
  try {
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : "";
    const response = await api.get(`/order/user/${userId}${query}`);
    return {
      success: true,
      message: "Orders fetched successfully",
      data: response.data,      // contains {data: Order[], pagination: {...}}
    };
  } catch (error) {
    console.error("Get orders by user ID error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to fetch orders" };
  }
}

export async function getOrderById(orderId: string): Promise<Order> {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
}

export const orderService = {
  createOrder,
  getAllOrders,
  getOrderByUserId,
  getOrderById,
};
