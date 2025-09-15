import { PaginationParams, ProductResponse } from "@/types/products";
import api from "../axios";

// GET /products?page=1&pageSize=20 - Fetch products with pagination
export async function getProducts(params?: PaginationParams): Promise<ProductResponse> {
  try {
    const response = await api.get("/products", { params });
    return {
      success: true,
      message: response.data.message || "Products fetched successfully",
      data: response.data.products || response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}

// GET /products/getproductbyId/:id - Get product by ID
export async function getProductById(id: string): Promise<ProductResponse> {
  try {
    const response = await api.get(`/products/${id}`);
    return {
      success: true,
      message: response.data.message || "Product fetched successfully",
      data: response.data.product || response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}
