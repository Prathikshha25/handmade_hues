import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "../types";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="group bg-cream border border-beige rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-shadow duration-300 flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <button
          onClick={() => onViewDetails(product)}
          className="block w-full h-full"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </button>
        <button
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={() => toggle(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-cream/90 backdrop-blur-sm shadow-card hover:scale-110 transition-transform"
        >
          <Heart
            size={17}
            strokeWidth={1.75}
            className={wishlisted ? "fill-terracotta text-terracotta" : "text-olive"}
          />
        </button>
        {product.images.length > 1 && (
          <span className="absolute bottom-3 left-3 bg-cream/90 backdrop-blur-sm text-[10px] font-body px-2 py-1 rounded-full text-brown">
            {product.images.length} photos
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-[11px] uppercase tracking-[0.14em] text-teal font-semibold">
            {product.category}
          </span>
          <span className="font-body text-[10px] uppercase tracking-wide text-olive font-semibold bg-mustard/30 px-2 py-0.5 rounded-full">
            Customizable
          </span>
        </div>
        <h3 className="font-display text-xl text-olive font-semibold mt-1.5 leading-snug">{product.name}</h3>
        <p className="font-body text-sm text-brown mt-1.5 line-clamp-2 flex-1">{product.shortDescription}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 py-2.5 rounded-full border border-olive text-olive font-body text-xs sm:text-sm font-medium hover:bg-olive hover:text-cream transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 py-2.5 rounded-full bg-sage text-cream font-body text-xs sm:text-sm font-medium hover:bg-teal transition-colors"
          >
            Customize
          </button>
        </div>
      </div>
    </motion.div>
  );
}
