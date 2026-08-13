import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Heart, Check } from "lucide-react";
import type { Product, CartCustomization } from "../types";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useEscapeKey } from "../hooks/useEscapeKey";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState<CartCustomization>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setCustomization({});
    setErrors({});
    setJustAdded(false);
  }, [product]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEscapeKey(!!product, onClose);

  if (!product) return null;

  const setField = (key: string, value: string) => {
    setCustomization((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleAddToBag = () => {
    const nextErrors: Record<string, boolean> = {};
    product.customization.forEach((field) => {
      if (field.required && !customization[field.key]?.trim()) {
        nextErrors[field.key] = true;
      }
    });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    addItem(product.id, quantity, customization);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-olive/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-cream w-full sm:max-w-4xl max-h-[92vh] sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-beige shrink-0">
            <span className="font-display text-lg text-olive font-semibold">{product.name}</span>
            <button
              aria-label="Close"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-sand text-olive transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto grid sm:grid-cols-2 gap-0 sm:gap-8 px-5 sm:px-7 py-6">
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-sand">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {product.images.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === activeImage ? "border-terracotta" : "border-transparent"
                      }`}
                      aria-label={`Show photo ${i + 1} of ${product.name}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 sm:mt-0">
              <span className="font-body text-[11px] uppercase tracking-[0.14em] text-teal font-semibold">
                {product.category}
              </span>
              <h2 className="font-display text-3xl text-olive font-semibold mt-1">{product.name}</h2>
              <p className="font-body text-sm text-brown mt-3 leading-relaxed">{product.description}</p>

              {product.customization.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-body text-sm font-semibold text-olive uppercase tracking-wide">
                    Customize this gift
                  </h3>
                  {product.customization.map((field) => (
                    <div key={field.key}>
                      <label className="font-body text-sm text-brown block mb-1.5">
                        {field.label}
                        {field.required && <span className="text-terracotta"> *</span>}
                      </label>

                      {field.type === "text" && (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={customization[field.key] ?? ""}
                          onChange={(e) => setField(field.key, e.target.value)}
                          className={`w-full rounded-lg border px-3.5 py-2.5 font-body text-sm bg-sand/40 focus:bg-cream outline-none transition-colors ${
                            errors[field.key] ? "border-terracotta" : "border-beige"
                          }`}
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          placeholder={field.placeholder}
                          value={customization[field.key] ?? ""}
                          onChange={(e) => setField(field.key, e.target.value)}
                          rows={3}
                          className={`w-full rounded-lg border px-3.5 py-2.5 font-body text-sm bg-sand/40 focus:bg-cream outline-none transition-colors resize-none ${
                            errors[field.key] ? "border-terracotta" : "border-beige"
                          }`}
                        />
                      )}

                      {field.type === "select" && (
                        <select
                          value={customization[field.key] ?? field.options[0]}
                          onChange={(e) => setField(field.key, e.target.value)}
                          className="w-full rounded-lg border border-beige px-3.5 py-2.5 font-body text-sm bg-sand/40 focus:bg-cream outline-none transition-colors"
                        >
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.type === "photo" && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setField(field.key, e.target.files?.[0]?.name ?? "")}
                          className="w-full font-body text-xs text-brown file:mr-3 file:py-2 file:px-3.5 file:rounded-full file:border-0 file:bg-sage file:text-cream file:text-xs file:font-medium file:cursor-pointer"
                        />
                      )}

                      {errors[field.key] && (
                        <p className="text-terracotta text-xs font-body mt-1">This field is required.</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 mt-6">
                <span className="font-body text-sm text-brown">Quantity</span>
                <div className="flex items-center border border-beige rounded-full">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-olive hover:bg-sand rounded-full transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-body text-sm">{quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-olive hover:bg-sand rounded-full transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pb-2">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 py-3 rounded-full bg-olive text-cream font-body text-sm font-medium hover:bg-brown transition-colors flex items-center justify-center gap-2"
                >
                  {justAdded ? (
                    <>
                      <Check size={16} /> Added to Bag
                    </>
                  ) : (
                    "Add to Bag"
                  )}
                </button>
                <button
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => toggle(product.id)}
                  className="p-3 rounded-full border border-beige hover:bg-sand transition-colors"
                >
                  <Heart size={18} className={wishlisted ? "fill-terracotta text-terracotta" : "text-olive"} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
