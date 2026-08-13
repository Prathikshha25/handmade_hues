import { MessageCircle, Mail } from "lucide-react";
import InstagramIcon from "./InstagramIcon";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections-intro" },
  { label: "Customized Gifts", href: "#customized-gifts" },
  { label: "Occasions", href: "#occasions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="bg-olive text-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl font-semibold">Handmade Hues</h3>
          <p className="font-body text-sm text-cream/70 mt-3 leading-relaxed max-w-xs">
            Thoughtful gifts, handmade with care.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:bg-cream/10 transition-colors"
            >
              <InstagramIcon size={15} />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:bg-cream/10 transition-colors"
            >
              <MessageCircle size={15} />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label="Email"
              className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:bg-cream/10 transition-colors"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-body text-sm font-semibold uppercase tracking-wide text-cream/80">Quick Links</h4>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="font-body text-sm text-cream/70 hover:text-cream transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-sm font-semibold uppercase tracking-wide text-cream/80">
            A Little Note
          </h4>
          <p className="font-body text-sm text-cream/70 mt-4 leading-relaxed">
            Every product photo on this site is of an actual handmade piece — nothing here is
            AI-generated or stock imagery.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/15 py-5 text-center">
        <p className="font-body text-xs text-cream/60">© 2026 Handmade Hues. All rights reserved.</p>
      </div>
    </footer>
  );
}
