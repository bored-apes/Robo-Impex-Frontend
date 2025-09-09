export const cartStorage = {
  getItems: () => {
    if (typeof window === "undefined") return []
    try {
      const items = localStorage.getItem("cart")
      return items ? JSON.parse(items) : []
    } catch {
      return []
    }
  },

  setItems: (items) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("cart", JSON.stringify(items))
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      console.error("Failed to save cart:", error)
    }
  },

  addItem: (product, variant = {}, quantity = 1) => {
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

  removeItem: (id, variant = {}) => {
    const items = cartStorage.getItems()
    const filtered = items.filter(
      (item) => !(item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant)),
    )
    cartStorage.setItems(filtered)
  },

  updateQuantity: (id, variant = {}, quantity) => {
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

  getItemCount: () => {
    return cartStorage.getItems().reduce((total, item) => total + item.qty, 0)
  },

  clear: () => {
    cartStorage.setItems([])
  },
}

export const wishlistStorage = {
  getItems: () => {
    if (typeof window === "undefined") return []
    try {
      const items = localStorage.getItem("wishlist")
      return items ? JSON.parse(items) : []
    } catch {
      return []
    }
  },

  setItems: (items) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("wishlist", JSON.stringify(items))
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      console.error("Failed to save wishlist:", error)
    }
  },

  addItem: (product) => {
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

  removeItem: (id) => {
    const items = wishlistStorage.getItems()
    const filtered = items.filter((item) => item.id !== id)
    wishlistStorage.setItems(filtered)
  },

  isInWishlist: (id) => {
    return wishlistStorage.getItems().some((item) => item.id === id)
  },

  clear: () => {
    wishlistStorage.setItems([])
  },
}

export const recentlyViewedStorage = {
  getItems: () => {
    if (typeof window === "undefined") return []
    try {
      const items = localStorage.getItem("recentlyViewed")
      return items ? JSON.parse(items) : []
    } catch {
      return []
    }
  },

  addItem: (product) => {
    const items = recentlyViewedStorage.getItems()
    const filtered = items.filter((item) => item.id !== product.id)

    filtered.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      viewedAt: new Date().toISOString(),
    })

    // Keep only last 10 items
    const limited = filtered.slice(0, 10)

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("recentlyViewed", JSON.stringify(limited))
      } catch (error) {
        console.error("Failed to save recently viewed:", error)
      }
    }
  },
}
