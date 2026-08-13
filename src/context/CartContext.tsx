import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, CartCustomization } from "../types";

interface CartContextValue {
  items: CartItem[];
  addItem: (productId: string, quantity: number, customization: CartCustomization) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "handmade-hues-cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — ignore, cart still works in-session
    }
  }, [items]);

  const addItem = (productId: string, quantity: number, customization: CartCustomization) => {
    const lineId = `${productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setItems((prev) => [...prev, { lineId, productId, quantity, customization }]);
    setDrawerOpen(true);
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.lineId === lineId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (lineId: string) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
