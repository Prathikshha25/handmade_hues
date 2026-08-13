import { motion } from "framer-motion";
import {
  Cake,
  HeartHandshake,
  PlaneTakeoff,
  PartyPopper,
  Users,
  GraduationCap,
  Heart,
  Sparkles,
} from "lucide-react";
import StitchLine from "./StitchLine";

const COLORS = [
  { bg: "bg-sage", text: "text-cream", subtext: "text-cream/80" },
  { bg: "bg-terracotta", text: "text-cream", subtext: "text-cream/80" },
  { bg: "bg-teal", text: "text-cream", subtext: "text-cream/80" },
  { bg: "bg-mustard", text: "text-olive", subtext: "text-olive/75" },
  { bg: "bg-burgundy", text: "text-cream", subtext: "text-cream/80" },
];

const OCCASION_CARDS = [
  { label: "Birthday", icon: Cake, description: "Customized for your occasion, down to the last detail." },
  {
    label: "Anniversary",
    icon: HeartHandshake,
    description: "Custom gifts available — made especially for the two of you.",
  },
  {
    label: "Farewell",
    icon: PlaneTakeoff,
    description: "Custom gifts available for goodbyes that deserve a proper send-off.",
  },
  {
    label: "Bachelorette Party",
    icon: PartyPopper,
    description: "Custom gifts available for the bride-to-be and her crew.",
  },
  { label: "Friendship", icon: Users, description: "Personalized gifts for every celebration, big or small." },
  { label: "Graduation", icon: GraduationCap, description: "Made especially for you, to mark the milestone." },
  { label: "Valentine's Day", icon: Heart, description: "Customized for your occasion — thoughtful, not clichéd." },
  { label: "Other", icon: Sparkles, description: "Any occasion at all — tell us what you have in mind." },
];

export default function Occasions() {
  return (
    <section id="occasions" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
            Shop by occasion
          </span>
          <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
            Made For Every Celebration
            <StitchLine className="absolute left-0 -bottom-2 w-full" color="#7B2E3A" width={300} />
          </h2>
          <p className="font-body text-brown mt-5 leading-relaxed">
            Personalized gifts for every celebration — customization is available across every
            occasion below.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mt-12">
          {OCCASION_CARDS.map((occasion, i) => {
            const palette = COLORS[i % COLORS.length];
            return (
              <motion.a
                key={occasion.label}
                href="#customized-gifts"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className={`group rounded-2xl ${palette.bg} p-5 sm:p-6 shadow-card hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[150px]`}
              >
                <occasion.icon size={24} className={`${palette.text} opacity-90`} strokeWidth={1.5} />
                <h3 className={`font-display text-lg sm:text-xl ${palette.text} font-semibold mt-4`}>
                  {occasion.label}
                </h3>
                <p className={`font-body text-xs ${palette.subtext} mt-1.5 leading-relaxed`}>
                  {occasion.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
