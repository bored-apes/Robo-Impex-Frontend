import type { PaginationParams, ProductResponse } from "@/types/products"
import api from "../axios"

export async function getProducts(params?: PaginationParams): Promise<ProductResponse> {
  try {
    const queryParams = new URLSearchParams()

    queryParams.append("page", String(params?.page || 1))
    queryParams.append("pageSize", String(params?.pageSize || 20))

    if (params?.search) {
      queryParams.append("search", params.search)
    }

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

    if (params?.minPrice !== undefined && params.minPrice > 0) {
      queryParams.append("minPrice", String(params.minPrice))
    }
    if (params?.maxPrice !== undefined && params.maxPrice < 100000) {
      queryParams.append("maxPrice", String(params.maxPrice))
    }

    if (params?.inStock !== undefined) {
      queryParams.append("inStock", String(params.inStock))
    }

    if (params?.sortBy) {
      queryParams.append("sortBy", params.sortBy)
    }
    if (params?.sortOrder) {
      queryParams.append("sortOrder", params.sortOrder)
    }

    const response = await api.get(`/product?${queryParams.toString()}`)

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
    const response = await api.get(`/product/${id}`)
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
