import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "../data/products";
import type { Category, Product } from "../types";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import StitchLine from "./StitchLine";

type FilterValue = "All" | Category;
type SortValue = "Featured" | "Name (A–Z)";

const FILTERS: FilterValue[] = ["All", ...categories];
const SORTS: SortValue[] = ["Featured", "Name (A–Z)"];

interface ShopProps {
  searchOpen: boolean;
  onCloseSearch: () => void;
  activeFilter: FilterValue | null;
  onFilterApplied: () => void;
}

export default function Shop({ searchOpen, onCloseSearch, activeFilter, onFilterApplied }: ShopProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("All");
  const [sort, setSort] = useState<SortValue>("Featured");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (activeFilter) {
      setFilter(activeFilter);
      onFilterApplied();
    }
  }, [activeFilter, onFilterApplied]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => (filter === "All" ? true : p.category === filter));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === "Name (A–Z)") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Featured") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [query, filter, sort]);

  return (
    <section id="collections" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
            The full collection
          </span>
          <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
            Find Something Meaningful
            <StitchLine className="absolute left-0 -bottom-2 w-full" color="#D69A22" width={300} />
          </h2>
          <p className="font-body text-brown mt-5 leading-relaxed">
            Every piece here is made especially for you — personalized gifts for every celebration.
          </p>
        </div>

        {/* Search bar — toggled open from navbar */}
        <AnimatePresence>
          {(searchOpen || query) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="relative mt-8 max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown" />
                <input
                  autoFocus={searchOpen}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-full pl-10 pr-10 py-3 rounded-full border border-beige bg-sand/30 focus:bg-cream outline-none font-body text-sm transition-colors"
                />
                {(query || searchOpen) && (
                  <button
                    aria-label="Close search"
                    onClick={() => {
                      setQuery("");
                      onCloseSearch();
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown hover:text-olive"
                  >
                    ×
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full font-body text-xs sm:text-sm font-medium border transition-colors ${
                  filter === f
                    ? "bg-olive text-cream border-olive"
                    : "bg-transparent text-brown border-beige hover:border-olive"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal size={14} className="text-brown" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
              aria-label="Sort products"
              className="font-body text-sm border border-beige rounded-full px-3.5 py-2 bg-transparent outline-none text-brown"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <p className="font-body text-brown text-center py-16">
              No products match "{query}". Try a different search or filter.
            </p>
          ) : (
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onViewDetails={setActiveProduct} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
    </section>
  );
}
