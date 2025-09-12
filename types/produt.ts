// export interface Product {
//     id: string
//     slug?: string
//     name: string
//     descriptionShort?: string
//     descriptionLong?: string
//     price: number
//     currency?: string
//     images: string[]
//     videos?: string[]
//     categories: string[]
//     tags: string[]
//     rating: number
//     ratingCount: number
//     inStock: boolean
//     brand?: string
//     modelNumber?: string
//     warranty?: string
//     specifications?: Record<string, string>
//     variants?: Record<string, string[]>
//     similar?: string[]
//   }
  export interface Product {
    id: string
    name: string
    price: number
    rating: number
    ratingCount: number
    images: string[]
    inStock: boolean
  }
  
  export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    qty: number
    variant?: Record<string, string>
  }
  
  export interface WishlistItem {
    id: string
    name: string
    price: number
    image: string
  }
  
  export interface LoginFormData {
    email: string
    password: string
  }
  
  export interface SignupFormData {
    firstname: string
    lastname: string
    email: string
    mobile: string
    password: string
    confirmPassword: string
  }
  