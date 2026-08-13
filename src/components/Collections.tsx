import { motion } from "framer-motion";
import { ArrowUpRight, Flower2, Gift, Gem, PartyPopper, Sparkles } from "lucide-react";
import type { Category } from "../types";
import StitchLine from "./StitchLine";

interface CollectionDef {
  category: Category | "Customized Gifts";
  description: string;
  href: string;
  icon: typeof Flower2;
  bg: string;
  text: string;
  subtext: string;
}

const COLLECTION_DEFS: CollectionDef[] = [
  {
    category: "Handmade Bouquets",
    description: "Fresh and crochet-forever arrangements, wrapped by hand.",
    href: "#collections",
    icon: Flower2,
    bg: "bg-sage",
    text: "text-cream",
    subtext: "text-cream/85",
  },
  {
    category: "Personalized Gifts",
    description: "Named, dated, and made around one person's story.",
    href: "#collections",
    icon: Gift,
    bg: "bg-terracotta",
    text: "text-cream",
    subtext: "text-cream/85",
  },
  {
    category: "Handmade Jewelry",
    description: "Small wearable keepsakes, crocheted and curated — for every gender.",
    href: "#collections",
    icon: Gem,
    bg: "bg-teal",
    text: "text-cream",
    subtext: "text-cream/85",
  },
  {
    category: "Celebration Gifts",
    description: "Curated boxes and pieces built for milestone celebrations.",
    href: "#collections",
    icon: PartyPopper,
    bg: "bg-burgundy",
    text: "text-cream",
    subtext: "text-cream/85",
  },
  {
    category: "Customized Gifts",
    description: "Customized for your occasion — tell us what you imagine.",
    href: "#customized-gifts",
    icon: Sparkles,
    bg: "bg-mustard",
    text: "text-olive",
    subtext: "text-olive/80",
  },
];

interface CollectionsProps {
  onSelectCategory: (category: Category) => void;
}

export default function Collections({ onSelectCategory }: CollectionsProps) {
  return (
    <section id="collections-intro" className="py-20 sm:py-28 bg-sand/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
            Browse by feeling
          </span>
          <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
            Find Something Meaningful
            <StitchLine className="absolute left-0 -bottom-2 w-full" color="#4E6E52" width={280} />
          </h2>
          <p className="font-body text-brown mt-5 leading-relaxed">
            Personalized gifts for every celebration — made especially for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {COLLECTION_DEFS.map((def, i) => (
            <motion.a
              key={def.category}
              href={def.href}
              onClick={(e) => {
                if (def.category !== "Customized Gifts") {
                  e.preventDefault();
                  onSelectCategory(def.category as Category);
                  document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group relative rounded-2xl overflow-hidden ${def.bg} p-7 sm:p-8 shadow-card hover:shadow-lift hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[220px]`}
            >
              <def.icon size={30} className={`${def.text} opacity-90`} strokeWidth={1.5} />
              <div>
                <h3 className={`font-display text-2xl ${def.text} font-semibold mt-6`}>{def.category}</h3>
                <p className={`font-body text-sm ${def.subtext} mt-1.5 leading-relaxed`}>{def.description}</p>
              </div>
              <ArrowUpRight
                size={20}
                className={`${def.text} absolute top-7 right-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1`}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
