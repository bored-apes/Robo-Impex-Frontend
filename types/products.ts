export interface Product {
  id: string;
  slug: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  currency: string;
  images: string[];
  videos?: string[];
  categories: string[];
  tags: string[];
  rating: number;
  ratingCount: number;
  inStock: boolean;
  brand: string;
  modelNumber: string;
  warranty: string;
  specifications?: Specifications;
  variants: Variants;
  similar: string[];
}

export interface Specifications {
  screwDiameter: string;
  automation: string;
  computerized: string;
  machineWeight: string;
  certification: string;
  dieHead: string;
  screwLDRatio: string;
  maxOutput: string;
  mainMotor: string;
  inverterBrand: string;
  trademark: string;
  transportPackage: string;
  specification: string;
  origin: string;
  hsCode: string;
}

export interface Variants {
  model?: string[];
  output?: string[];
  layers?: string[];
  width?: string[];
  capacity?: string[];
  filmWidth?: string[];
  screwSize?: string[];
  thickness?: string[];
  clampingForce?: string[];
  injectionVolume?: string[];
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data?: Product | Product[] | null;
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  tags?: string;
  minPrice?: number;
  maxPrice?: number;
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

export type Filters = {
  category: string;
  priceRange: number[];
  inStock: boolean;
  rating: number;
};

export type ProductFiltersProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
};

export interface foundProduct {
  id: string;
  slug: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  currency: string;
  images: string[];
  categories: string[];
  tags: string[];
  rating: number;
  ratingCount: number;
  inStock: boolean;
  brand: string;
  modelNumber: string;
  warranty: string;
  variants: Variants;
  similar: string[];
  specifications?: Specifications; 
}

export interface Variants {
  filmWidth?: string[];
  thickness?: string[];
}


export interface ProductResponse {
  data: ProductData[]
  pagination: Pagination
}

export interface ProductData {
  id: number
  name: string
  description: string
  type: string
  category: string
  base_price: number
  gst_rate: number
  min_order_qty: number
  stock_quantity: number
  image_url: any
  status: string
  created_at: string
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}
