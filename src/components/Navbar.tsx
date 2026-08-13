import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useEscapeKey } from "../hooks/useEscapeKey";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections-intro" },
  { label: "Customized Gifts", href: "#customized-gifts" },
  { label: "Occasions", href: "#occasions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onSearchClick: () => void;
  onWishlistClick: () => void;
}

export default function Navbar({ onSearchClick, onWishlistClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const { ids } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEscapeKey(menuOpen, () => setMenuOpen(false));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-card border-b border-beige"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        <a href="#home" className="font-display text-2xl sm:text-3xl text-olive font-semibold tracking-wide">
          Handmade Hues
        </a>

        <ul className="hidden lg:flex items-center gap-8 font-body text-sm font-medium text-brown">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 transition-colors hover:text-olive after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-terracotta after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search products"
            onClick={onSearchClick}
            className="p-2 rounded-full text-olive hover:bg-sand transition-colors"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>
          <button
            aria-label={`Wishlist, ${ids.length} items`}
            onClick={onWishlistClick}
            className="relative p-2 rounded-full text-olive hover:bg-sand transition-colors"
          >
            <Heart size={20} strokeWidth={1.75} />
            {ids.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-cream text-[10px] leading-none rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                {ids.length}
              </span>
            )}
          </button>
          <button
            aria-label={`Shopping bag, ${itemCount} items`}
            onClick={openDrawer}
            className="relative p-2 rounded-full text-olive hover:bg-sand transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-sage text-cream text-[10px] leading-none rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full text-olive hover:bg-sand transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-cream border-t border-beige"
          >
            <ul className="flex flex-col px-6 py-4 gap-1 font-body text-brown">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 border-b border-beige/70 last:border-none text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
