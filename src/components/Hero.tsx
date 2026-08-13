import { motion } from "framer-motion";
import StitchLine from "./StitchLine";

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden grain-overlay">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block font-body text-xs sm:text-sm tracking-[0.2em] uppercase text-teal font-semibold">
            Handmade • Personal • Thoughtful
          </span>

          <h1 className="font-display text-olive font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mt-5">
            Every Stitch
            <br />
            Holds a{" "}
            <span className="relative inline-block">
              Memory
              <StitchLine className="absolute left-0 -bottom-1 w-full" color="#D69A22" width={220} />
            </span>
          </h1>

          <p className="font-body text-brown text-base sm:text-lg mt-7 max-w-md leading-relaxed">
            Handmade bouquets, personalized gifts, curated hampers and meaningful keepsakes
            crafted with care for every kind of celebration.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <a
              href="#collections-intro"
              className="px-7 py-3.5 rounded-full bg-olive text-cream font-body font-medium text-sm tracking-wide hover:bg-brown transition-colors shadow-soft"
            >
              Explore Collections
            </a>
            <a
              href="#customized-gifts"
              className="px-7 py-3.5 rounded-full border border-olive text-olive font-body font-medium text-sm tracking-wide hover:bg-olive hover:text-cream transition-colors"
            >
              Get a Customized Gift
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 sm:-inset-6 border border-terracotta/40 rounded-[2rem] -z-10" aria-hidden="true" />
          <div className="aspect-[4/5] w-full rounded-[1.75rem] overflow-hidden shadow-lift">
            <img
              src="/images/bouquet-sunflower-rose-2.jpg"
              alt="A handmade bouquet of red roses and a sunflower, wrapped in Korean-style paper with a yellow ribbon"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-mustard rounded-2xl shadow-card px-5 py-4 max-w-[190px]">
            <p className="font-display text-lg text-olive leading-snug font-semibold">Made especially for you</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
