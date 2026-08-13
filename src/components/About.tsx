import { motion } from "framer-motion";
import { Heart, Scissors, Package } from "lucide-react";
import StitchLine from "./StitchLine";

const POINTS = [
  { icon: Scissors, text: "Every piece made by hand, start to finish" },
  { icon: Heart, text: "Built around your names, messages and memories" },
  { icon: Package, text: "Thoughtfully packaged for every celebration" },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1 rounded-3xl bg-sage shadow-card p-10 sm:p-12 aspect-[4/5] flex flex-col justify-between grain-overlay"
        >
          <span className="font-display text-7xl sm:text-8xl text-cream/25 leading-none">"</span>
          <p className="font-display text-2xl sm:text-3xl text-cream leading-snug">
            A gift means more when it's made by hand, for one specific person.
          </p>
          <div className="space-y-4 mt-10">
            {POINTS.map((point) => (
              <div key={point.text} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-cream/15 flex items-center justify-center shrink-0">
                  <point.icon size={16} className="text-cream" strokeWidth={1.75} />
                </span>
                <p className="font-body text-sm text-cream/90">{point.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2"
        >
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
            About Handmade Hues
          </span>
          <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
            More Than a Gift
            <StitchLine className="absolute left-0 -bottom-2 w-full" color="#D69A22" width={220} />
          </h2>
          <p className="font-body text-brown mt-6 leading-relaxed">
            Handmade Hues began with a simple idea: that a gift means more when it's made by
            hand, for one specific person. Every bouquet, card, keepsake and hamper here is
            built around personalization — a name, a message, a memory — rather than picked off
            a shelf.
          </p>
          <p className="font-body text-brown mt-4 leading-relaxed">
            Whether it's a crocheted flower that never wilts, a scrapbook filled with inside
            jokes, or a hamper built around someone's favourite things, the goal is the same:
            something thoughtful, made with care, for every kind of person and every kind of
            celebration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
