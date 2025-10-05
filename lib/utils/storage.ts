type ProductInput = {
  id: string;
  name: string;
  price: number;
  images?: string[];
};

export type Variant = Record<string, unknown>;

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  variant: Variant;
  qty: number;
  stockQuantity: number;
  minQuantityOrder: number;
};

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  stockQuantity: number;
  minQuantityOrder: number;
};

export type RecentlyViewedItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  viewedAt: string;
};

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getFirstImage(input: any): string | undefined {
  if (input?.images && Array.isArray(input.images) && input.images[0])
    return input.images[0] as string;
  if (typeof input?.image === "string" && input.image.length > 0)
    return input.image as string;
  return undefined;
}

function normalizeCartItems(items: any[] | null): CartItem[] {
  if (!Array.isArray(items)) return [];
  const normalized = items.map((i) => {
    const img = i?.image ?? getFirstImage(i);
    const qty = Number.isFinite(i?.qty) && i.qty > 0 ? i.qty : 1;
    return {
      id: String(i?.id ?? ""),
      name: String(i?.name ?? "Unknown Product"),
      price: Number(i?.price ?? 0),
      image: img,
      variant: typeof i?.variant === "object" && i.variant ? i.variant : {},
      qty,
      minQuantityOrder: i?.minQuantityOrder || 1,
      stockQuantity: i?.stockQuantity || 0,
    } as CartItem;
  });
  return normalized;
}

function normalizeWishlistItems(items: any[] | null): WishlistItem[] {
  if (!Array.isArray(items)) return [];
  const normalized = items.map((i) => {
    const img = i?.image ?? getFirstImage(i);
    return {
      id: String(i?.id ?? ""),
      name: String(i?.name ?? "Unknown Product"),
      price: Number(i?.price ?? 0),
      image: img,
    } as WishlistItem;
  });
  return normalized;
}

export const cartStorage = {
  getItems: (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const raw = safeParseJson<any[]>(localStorage.getItem("cart"));
    const normalized = normalizeCartItems(raw);
    try {
      localStorage.setItem("cart", JSON.stringify(normalized));
    } catch {}
    return normalized;
  },

  setItems: (items: CartItem[]): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("cart", JSON.stringify(normalizeCartItems(items)));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to save cart:", error);
    }
  },

  addItem: (product: any, variant: Variant = {}, quantity = 1): void => {
    const items = cartStorage.getItems();

    const desiredVariant =
      typeof variant === "object" && variant ? variant : {};
    const existingIndex = items.findIndex(
      (item) =>
        item.id === String(product?.id) &&
        JSON.stringify(item.variant) === JSON.stringify(desiredVariant)
    );

    const image = getFirstImage(product);
    const base = {
      id: String(product?.id ?? ""),
      name: String(product?.name ?? "Unknown Product"),
      price: Number(product?.price ?? 0),
      image,
      minQuantityOrder: product?.minQuantityOrder || 1,
      stockQuantity: product?.stockQuantity || 0,
      variant: desiredVariant,
    };

    if (existingIndex >= 0) {
      items[existingIndex].qty += Number.isFinite(quantity) ? quantity : 1;
    } else {
      items.push({
        ...base,
        qty: Number.isFinite(quantity)
          ? quantity
          : Number(product?.qty ?? 1) || 1,
      });
    }

    cartStorage.setItems(items);
  },

  removeItem: (id: string, variant: Variant = {}): void => {
    const items = cartStorage.getItems();
    const filtered = items.filter(
      (item) =>
        !(
          item.id === id &&
          JSON.stringify(item.variant) === JSON.stringify(variant)
        )
    );
    cartStorage.setItems(filtered);
  },

  updateQuantity: (
    id: string,
    variant: Variant = {},
    quantity: number
  ): void => {
    const items = cartStorage.getItems();
    const index = items.findIndex(
      (item) =>
        item.id === id &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (index >= 0) {
      if (quantity <= 0) {
        items.splice(index, 1);
      } else {
        items[index].qty = quantity;
      }
      cartStorage.setItems(items);
    }
  },

  getItemCount: (): number => {
    return cartStorage.getItems().reduce((total, item) => total + item.qty, 0);
  },

  clear: (): void => {
    cartStorage.setItems([]);
  },
};

export const wishlistStorage = {
  getItems: (): WishlistItem[] => {
    if (typeof window === "undefined") return [];
    const raw = safeParseJson<any[]>(localStorage.getItem("wishlist"));
    const normalized = normalizeWishlistItems(raw);
    try {
      localStorage.setItem("wishlist", JSON.stringify(normalized));
    } catch {}
    return normalized;
  },

  setItems: (items: WishlistItem[]): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        "wishlist",
        JSON.stringify(normalizeWishlistItems(items))
      );
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to save wishlist:", error);
    }
  },

  addItem: (product: any): void => {
    const items = wishlistStorage.getItems();
    const id = String(product?.id ?? "");
    const exists = items.find((item) => item.id === id);

    if (!exists) {
      const image = getFirstImage(product);
      items.push({
        id,
        name: String(product?.name ?? "Unknown Product"),
        price: Number(product?.price ?? 0),
        image,
        minQuantityOrder: product?.minQuantityOrder || 1,
        stockQuantity: product?.stockQuantity || 0,
      });
      wishlistStorage.setItems(items);
    }
  },

  removeItem: (id: string): void => {
    const items = wishlistStorage.getItems();
    const filtered = items.filter((item) => item.id !== id);
    wishlistStorage.setItems(filtered);
  },

  isInWishlist: (id: string): boolean => {
    return wishlistStorage.getItems().some((item) => item.id === id);
  },

  clear: (): void => {
    wishlistStorage.setItems([]);
  },
};

export const recentlyViewedStorage = {
  getItems: (): RecentlyViewedItem[] => {
    if (typeof window === "undefined") return [];
    const items = safeParseJson<RecentlyViewedItem[]>(
      localStorage.getItem("recentlyViewed")
    );
    return items ?? [];
  },

  addItem: (product: ProductInput): void => {
    const items = recentlyViewedStorage.getItems();
    const filtered = items.filter((item) => item.id !== product.id);

    filtered.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      viewedAt: new Date().toISOString(),
    });

    const limited = filtered.slice(0, 10);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("recentlyViewed", JSON.stringify(limited));
      } catch (error) {
        console.error("Failed to save recently viewed:", error);
      }
    }
  },
};
