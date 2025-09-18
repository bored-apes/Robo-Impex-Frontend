import type { PaginationParams, ProductResponse } from "@/types/products"
import api from "../axios"

export async function getProducts(params?: PaginationParams): Promise<ProductResponse> {
  try {
    const queryParams = new URLSearchParams()

    // Add basic pagination
    queryParams.append("page", String(params?.page || 1))
    queryParams.append("pageSize", String(params?.pageSize || 20))

    // Add search parameter
    if (params?.search) {
      queryParams.append("search", params.search)
    }

    // Handle array parameters for categories, types, and statuses
    if (params?.category && Array.isArray(params.category)) {
      params.category.forEach((cat) => queryParams.append("category", cat))
    } else if (params?.category && typeof params.category === "string") {
      queryParams.append("category", params.category)
    }

    if (params?.type && Array.isArray(params.type)) {
      params.type.forEach((type) => queryParams.append("type", type))
    } else if (params?.type && typeof params.type === "string") {
      queryParams.append("type", params.type)
    }

    if (params?.status && Array.isArray(params.status)) {
      params.status.forEach((status) => queryParams.append("status", status))
    } else if (params?.status && typeof params.status === "string") {
      queryParams.append("status", params.status)
    }

    // Add price range parameters
    if (params?.minPrice !== undefined && params.minPrice > 0) {
      queryParams.append("minPrice", String(params.minPrice))
    }
    if (params?.maxPrice !== undefined && params.maxPrice < 100000) {
      queryParams.append("maxPrice", String(params.maxPrice))
    }

    // Add stock filter
    if (params?.inStock !== undefined) {
      queryParams.append("inStock", String(params.inStock))
    }

    // Add sorting parameters
    if (params?.sortBy) {
      queryParams.append("sortBy", params.sortBy)
    }
    if (params?.sortOrder) {
      queryParams.append("sortOrder", params.sortOrder)
    }

    const response = await api.get(`/products?${queryParams.toString()}`)

    return {
      success: true,
      message: "Products fetched successfully",
      data: response.data,
    }
  } catch (error) {
    console.error("API Error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch products",
    }
  }
}

export async function getProductById(id: string): Promise<ProductResponse> {
  try {
    const response = await api.get(`/products/${id}`)
    return {
      success: true,
      message: "Product fetched successfully",
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch product",
    }
  }
}
