import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Check } from "lucide-react";
import StitchLine from "./StitchLine";
import InstagramIcon from "./InstagramIcon";

const CONTACT_LINKS = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@_.handmade._.hues",
    href: "https://www.instagram.com/_.handmade._.hues/",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 96777 87874",
    href: "https://wa.me/919677787874",
  },
];

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: Record<string, boolean> = {};

    if (!values.name.trim()) nextErrors.name = true;
    if (!values.message.trim()) nextErrors.message = true;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-sand grain-overlay">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14">
        <div>
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
            Get in touch
          </span>

          <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
            Let's Create Something Meaningful
            <StitchLine
              className="absolute left-0 -bottom-2 w-full"
              color="#B9826F"
              width={300}
            />
          </h2>

          <p className="font-body text-brown mt-5 leading-relaxed max-w-md">
            Have a question, or an idea for a custom gift? Reach out — we'd
            love to hear about it.
          </p>

          <ul className="mt-8 space-y-4">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                <a
  href={link.href}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 group"
>
                  <span className="w-10 h-10 rounded-full bg-cream border border-beige flex items-center justify-center group-hover:border-terracotta transition-colors">
                    <link.icon
                      size={17}
                      className="text-olive"
                      strokeWidth={1.75}
                    />
                  </span>

                  <span>
                    <p className="font-body text-sm font-medium text-olive">
                      {link.label}
                    </p>

                    <p className="font-body text-xs text-brown">
                      {link.value}
                    </p>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-cream rounded-3xl border border-beige shadow-card p-6 sm:p-8"
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto">
                <Check size={26} className="text-sage" />
              </div>

              <h3 className="font-display text-2xl text-olive font-semibold mt-5">
                Message sent
              </h3>

              <p className="font-body text-brown mt-2 leading-relaxed">
                Thanks for reaching out — we'll get back to you soon.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setValues({
                    name: "",
                    message: "",
                  });
                  setErrors({});
                }}
                className="mt-6 px-6 py-2.5 rounded-full border border-olive text-olive font-body text-sm font-medium hover:bg-olive hover:text-cream transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-body text-sm text-brown block mb-1.5">
                  Name
                </label>

                <input
                  type="text"
                  value={values.name}
                  onChange={(e) =>
                    setValues((v) => ({
                      ...v,
                      name: e.target.value,
                    }))
                  }
                  className={`w-full rounded-lg border px-3.5 py-2.5 font-body text-sm bg-sand/40 focus:bg-cream outline-none transition-colors ${
                    errors.name
                      ? "border-terracotta"
                      : "border-beige"
                  }`}
                />

                {errors.name && (
                  <p className="text-terracotta text-xs font-body mt-1">
                    Please enter your name.
                  </p>
                )}
              </div>

              <div>
                <label className="font-body text-sm text-brown block mb-1.5">
                  Message
                </label>

                <textarea
                  rows={4}
                  value={values.message}
                  onChange={(e) =>
                    setValues((v) => ({
                      ...v,
                      message: e.target.value,
                    }))
                  }
                  className={`w-full rounded-lg border px-3.5 py-2.5 font-body text-sm bg-sand/40 focus:bg-cream outline-none transition-colors resize-none ${
                    errors.message
                      ? "border-terracotta"
                      : "border-beige"
                  }`}
                />

                {errors.message && (
                  <p className="text-terracotta text-xs font-body mt-1">
                    Please enter a message.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-olive text-cream font-body text-sm font-medium hover:bg-brown transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}