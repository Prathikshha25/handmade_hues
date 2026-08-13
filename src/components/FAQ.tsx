import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import StitchLine from "./StitchLine";

const FAQS = [
  {
    question: "Can I customize a product?",
    answer:
      "Yes — most products can be customized. Open any product's details to see the specific customization options available for it.",
  },
  {
    question: "Can I choose the colors?",
    answer:
      "For bouquets and several other products, yes. Color preference is one of the customization options where it applies.",
  },
  {
    question: "Can I add a personal message?",
    answer:
      "Absolutely. Cards, letters, hampers and personalized gifts all include a space for your own message.",
  },
  {
    question: "Can I upload a photo?",
    answer:
      "For personalized gifts and custom orders, yes — you'll find a photo upload option in the customization or custom order form.",
  },
  {
    question: "How long does customization take?",
    answer:
      "Since every piece is handmade to order, timelines vary by product and complexity. We'll confirm a timeline with you after your enquiry or custom request.",
  },
  {
    question: "Do you offer gift packaging?",
    answer: "Yes, every order is thoughtfully wrapped and presented — it's part of how we make each gift.",
  },
  {
    question: "How can I contact Handmade Hues?",
    answer: "You can reach us through Instagram, WhatsApp, or email — all listed in the Contact section below.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
            Good to know
          </span>
          <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
            Frequently Asked Questions
            <StitchLine className="absolute left-0 -bottom-2 w-full" color="#D6B866" width={280} />
          </h2>
        </div>

        <div className="mt-14 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="border border-beige rounded-2xl bg-sand/30 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="font-body text-sm sm:text-base font-medium text-olive">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-terracotta shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm text-brown px-5 sm:px-6 pb-5 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
