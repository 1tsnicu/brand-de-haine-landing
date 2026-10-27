import { create } from "zustand";
import { Product, products } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  quickViewProduct: Product | null;
  
  // Actions
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  
  // Drawer controls
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  
  // QuickView modal controls
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  // Computed helpers
  getTotalCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    // Pre-seed with one item for realistic demonstration
    {
      product: products[0],
      size: "M",
      quantity: 1,
    },
  ],
  isDrawerOpen: false,
  quickViewProduct: null,

  addItem: (product, size) => {
    const selectedSize = size || product.sizes[0] || "ONE SIZE";
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex(
      (item) => item.product.id === product.id && item.size === selectedSize
    );

    if (existingIndex > -1) {
      const updated = [...currentItems];
      updated[existingIndex].quantity += 1;
      set({ items: updated, isDrawerOpen: true });
    } else {
      set({
        items: [...currentItems, { product, size: selectedSize, quantity: 1 }],
        isDrawerOpen: true,
      });
    }
  },

  removeItem: (productId, size) => {
    set({
      items: get().items.filter(
        (item) => !(item.product.id === productId && item.size === size)
      ),
    });
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set({ isDrawerOpen: !get().isDrawerOpen }),

  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  getTotalCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
}));

