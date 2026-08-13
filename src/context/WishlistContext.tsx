import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface WishlistContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "handmade-hues-wishlist";

function loadWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => loadWishlist());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // storage unavailable — ignore, wishlist still works in-session
    }
  }, [ids]);

  const toggle = (productId: string) => {
    setIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => ids.includes(productId);

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
