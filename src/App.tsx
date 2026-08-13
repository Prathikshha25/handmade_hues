import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import Shop from "./components/Shop";
import CustomOrders from "./components/CustomOrders";
import Occasions from "./components/Occasions";
import WhyUs from "./components/WhyUs";
import HowItWorks from "./components/HowItWorks";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistPanel from "./components/WishlistPanel";
import type { Category } from "./types";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState<Category | "All" | null>(null);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-cream font-body text-brown">
          <a
            href="#home"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-cream text-olive px-4 py-2 rounded-full"
          >
            Skip to content
          </a>

          <Navbar
            onSearchClick={() => {
              setSearchOpen(true);
              document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
            }}
            onWishlistClick={() => setWishlistOpen(true)}
          />

          <main>
            <Hero />
            <Collections onSelectCategory={(category) => setPendingFilter(category)} />
            <Shop
              searchOpen={searchOpen}
              onCloseSearch={() => setSearchOpen(false)}
              activeFilter={pendingFilter}
              onFilterApplied={() => setPendingFilter(null)}
            />
            <CustomOrders />
            <Occasions />
            <WhyUs />
            <HowItWorks />
            <About />
            <FAQ />
            <Contact />
          </main>

          <Footer />
          <CartDrawer />
          <WishlistPanel open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
