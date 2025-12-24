
export interface Product {
  id: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  images: string[];
  videos?: string[];
  categories: string[];
  tags: string[];
  rating: number;
  ratingCount: number;
  inStock: boolean;
  specifications?: Specifications;
  variants?: Variants;
  stockQuantity?:number;
  minQuantityOrder?:number;
}

export interface Specifications {
  [key: string]: string;
}

export interface Variants {
  [key: string]: string[];
}

export enum ProductTypeEnum {
  IC = "IC",
  Microcontroller = "Microcontroller",
  Sensor = "Sensor",
  Module = "Module",
  DevBoard = "DevBoard",
  PCB = "PCB",
  Connector = "Connector",
  PowerSupply = "PowerSupply",
  Display = "Display",
}

export enum ProductCategoryEnum {
  Semiconductor = "Semiconductor",
  IoT = "IoT",
  Robotics = "Robotics",
  Power = "Power",
  Industrial = "Industrial",
}

export enum ProductStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
  OutOfStock = "OutOfStock",
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data?:
    | {
        data: APIProduct[];
        pagination: {
          page: number;
          pageSize: number;
          total: number;
          totalPages: number;
        };
      }
    | APIProduct
    | null;
}

export interface ProductCardProps {
  product: Product;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  variant?: Record<string, string>;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Filters {
  category: string[];
  type: string[];
  status: string[];
  priceRange: [number, number];
  inStock: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string | string[];
  type?: string | string[];
  status?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type ProductFiltersProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
};

export interface APIProduct {
  id: number;
  name: string;
  description: string | null;
  type: ProductTypeEnum | null;
  category: ProductCategoryEnum | null;
  base_price: number | null;
  gst_rate: number | null;
  min_order_qty: number | null;
  stock_quantity: number | null;
  status: ProductStatusEnum;
  created_at: string;
  average_rating?:number;
  total_ratings?:number;
  ratingCount?: number;
  minQuantityOrder?:number;
  specifications?: Specifications;
  variants?: Variants;
  images: string[];
}

export interface WishlistAddItem {
  id: string
  name: string
  price: number
  image?: string
  stockQuantity: number
  minQuantityOrder: number
}