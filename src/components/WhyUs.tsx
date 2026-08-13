import { motion } from "framer-motion";
import { HeartHandshake, Fingerprint, Sparkles, Gift } from "lucide-react";

const FEATURES = [
  {
    icon: HeartHandshake,
    title: "Handmade With Love",
    description: "Every piece is made by hand, start to finish — no mass production.",
  },
  {
    icon: Fingerprint,
    title: "Personalized",
    description: "Names, messages and details chosen by you, built into the gift itself.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful Details",
    description: "Small touches — a stitch, a note, a wrap style — chosen with intention.",
  },
  {
    icon: Gift,
    title: "Beautifully Presented",
    description: "Wrapped and packaged so the gift feels complete the moment it's opened.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center sm:text-left"
            >
              <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mx-auto sm:mx-0">
                <feature.icon size={22} className="text-sage" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl text-olive font-semibold mt-4">{feature.title}</h3>
              <p className="font-body text-sm text-brown mt-1.5 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
