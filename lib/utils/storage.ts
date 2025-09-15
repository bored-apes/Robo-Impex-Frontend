type ProductInput = {
  id: string
  name: string
  price: number
  images?: string[]
}

export type Variant = Record<string, unknown>

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  variant: Variant
  qty: number
}

export type WishlistItem = {
  id: string
  name: string
  price: number
  image?: string
  slug?: string
}

export type RecentlyViewedItem = {
  id: string
  name: string
  price: number
  image?: string
  viewedAt: string
}

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export const cartStorage = {
  getItems: (): CartItem[] => {
    if (typeof window === "undefined") return []
    const items = safeParseJson<CartItem[]>(localStorage.getItem("cart"))
    return items ?? []
  },

  setItems: (items: CartItem[]): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("cart", JSON.stringify(items))
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to save cart:", error)
    }
  },

  addItem: (product: ProductInput, variant: Variant = {}, quantity: number = 1): void => {
    const items = cartStorage.getItems()
    const existingIndex = items.findIndex(
      (item) => item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant),
    )

    if (existingIndex >= 0) {
      items[existingIndex].qty += quantity
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        variant,
        qty: quantity,
      })
    }

    cartStorage.setItems(items)
  },

  removeItem: (id: string, variant: Variant = {}): void => {
    const items = cartStorage.getItems()
    const filtered = items.filter(
      (item) => !(item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant)),
    )
    cartStorage.setItems(filtered)
  },

  updateQuantity: (id: string, variant: Variant = {}, quantity: number): void => {
    const items = cartStorage.getItems()
    const index = items.findIndex((item) => item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant))

    if (index >= 0) {
      if (quantity <= 0) {
        items.splice(index, 1)
      } else {
        items[index].qty = quantity
      }
      cartStorage.setItems(items)
    }
  },

  getItemCount: (): number => {
    return cartStorage.getItems().reduce((total, item) => total + item.qty, 0)
  },

  clear: (): void => {
    cartStorage.setItems([])
  },
}

export const wishlistStorage = {
  getItems: (): WishlistItem[] => {
    if (typeof window === "undefined") return []
    const items = safeParseJson<WishlistItem[]>(localStorage.getItem("wishlist"))
    return items ?? []
  },

  setItems: (items: WishlistItem[]): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("wishlist", JSON.stringify(items))
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to save wishlist:", error)
    }
  },

  addItem: (product: ProductInput): void => {
    const items = wishlistStorage.getItems()
    const exists = items.find((item) => item.id === product.id)

    if (!exists) {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      })
      wishlistStorage.setItems(items)
    }
  },

  removeItem: (id: string): void => {
    const items = wishlistStorage.getItems()
    const filtered = items.filter((item) => item.id !== id)
    wishlistStorage.setItems(filtered)
  },

  isInWishlist: (id: string): boolean => {
    return wishlistStorage.getItems().some((item) => item.id === id)
  },

  clear: (): void => {
    wishlistStorage.setItems([])
  },
}

export const recentlyViewedStorage = {
  getItems: (): RecentlyViewedItem[] => {
    if (typeof window === "undefined") return []
    const items = safeParseJson<RecentlyViewedItem[]>(localStorage.getItem("recentlyViewed"))
    return items ?? []
  },

  addItem: (product: ProductInput): void => {
    const items = recentlyViewedStorage.getItems()
    const filtered = items.filter((item) => item.id !== product.id)

    filtered.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      viewedAt: new Date().toISOString(),
    })

    const limited = filtered.slice(0, 10)

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("recentlyViewed", JSON.stringify(limited))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to save recently viewed:", error)
      }
    }
  },
}


