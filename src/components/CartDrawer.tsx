import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import { useEscapeKey } from "../hooks/useEscapeKey";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, clearCart } = useCart();
  useEscapeKey(isDrawerOpen, closeDrawer);

  const sendEnquiry = () => {
    const lines = items.map((item) => {
      const product = getProductById(item.productId);
      const custom = Object.entries(item.customization)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      return `• ${product?.name ?? "Item"} × ${item.quantity}${custom ? ` (${custom})` : ""}`;
    });
    const message = `Hi Handmade Hues! I'd like to enquire about:\n\n${lines.join("\n")}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
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
              <h2 className="font-display text-xl text-olive font-semibold">Your Enquiry Bag</h2>
              <button
                aria-label="Close bag"
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-sand text-olive transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
              {items.length === 0 ? (
                <p className="font-body text-brown text-sm text-center py-16">
                  Your bag is empty. Find something meaningful in the collection.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const occasion = item.customization.occasion;
                    return (
                      <li key={item.lineId} className="flex gap-3 border-b border-beige/70 pb-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-sand shrink-0">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-olive truncate">{product.name}</p>
                          {occasion && (
                            <p className="font-body text-xs text-teal mt-0.5">For: {occasion}</p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-beige rounded-full">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                                className="p-1.5 text-olive hover:bg-sand rounded-full transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center font-body text-xs">{item.quantity}</span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                                className="p-1.5 text-olive hover:bg-sand rounded-full transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              aria-label={`Remove ${product.name}`}
                              onClick={() => removeItem(item.lineId)}
                              className="p-1.5 text-terracotta hover:bg-sand rounded-full transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 sm:px-6 py-5 border-t border-beige space-y-3">
                <button
                  onClick={sendEnquiry}
                  className="w-full py-3.5 rounded-full bg-sage text-cream font-body text-sm font-medium hover:bg-teal transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={17} /> Send Enquiry
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-brown font-body text-xs hover:text-terracotta transition-colors"
                >
                  Clear bag
                </button>
                <p className="text-[11px] font-body text-brown/80 text-center leading-relaxed">
                  This sends your enquiry via WhatsApp — no payment or pricing is handled here.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
