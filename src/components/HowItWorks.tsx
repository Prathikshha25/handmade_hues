import { motion } from "framer-motion";
import StitchLine from "./StitchLine";

const STEPS = ["Choose", "Personalize", "We Create", "Gift"];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-sand">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
          Simple, from start to finish
        </span>
        <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
          How It Works
          <StitchLine className="absolute left-0 -bottom-2 w-full" color="#6F9290" width={220} />
        </h2>

        <div className="relative mt-16 grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6">
          <div className="hidden sm:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-beige" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-cream border-2 border-terracotta flex items-center justify-center font-display text-lg text-terracotta font-semibold relative z-10">
                {i + 1}
              </div>
              <p className="font-body text-sm sm:text-base text-olive font-medium mt-3">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
