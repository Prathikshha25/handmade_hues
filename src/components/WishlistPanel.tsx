import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import { useEscapeKey } from "../hooks/useEscapeKey";

interface WishlistPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function WishlistPanel({ open, onClose }: WishlistPanelProps) {
  const { ids, toggle } = useWishlist();
  const { addItem } = useCart();
  useEscapeKey(open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-olive/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-cream shadow-lift flex flex-col"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-beige">
              <h2 className="font-display text-xl text-olive font-semibold">Your Wishlist</h2>
              <button
                aria-label="Close wishlist"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-sand text-olive transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
              {ids.length === 0 ? (
                <p className="font-body text-brown text-sm text-center py-16">
                  Nothing here yet — tap the heart on a product to save it.
                </p>
              ) : (
                <ul className="space-y-4">
                  {ids.map((id) => {
                    const product = getProductById(id);
                    if (!product) return null;
                    return (
                      <li key={id} className="flex gap-3 border-b border-beige/70 pb-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-sand shrink-0">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-olive truncate">{product.name}</p>
                          <p className="font-body text-xs text-teal mt-0.5">{product.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => addItem(product.id, 1, {})}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-sage text-cream text-xs font-body hover:bg-teal transition-colors"
                            >
                              <ShoppingBag size={12} /> Add to Bag
                            </button>
                            <button
                              onClick={() => toggle(id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-beige text-xs font-body text-brown hover:border-terracotta hover:text-terracotta transition-colors"
                            >
                              <Heart size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
