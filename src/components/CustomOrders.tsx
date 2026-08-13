import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Lightbulb, ListChecks, Scissors, Smile } from "lucide-react";
import StitchLine from "./StitchLine";

const STEPS = [
  { number: "01", title: "Share Your Idea", icon: Lightbulb },
  { number: "02", title: "Choose Your Details", icon: ListChecks },
  { number: "03", title: "We Handcraft It", icon: Scissors },
  { number: "04", title: "Make Someone Smile", icon: Smile },
];

const REQUIRED_FIELDS = ["occasion", "recipient", "productType", "name", "customMessage"];

export default function CustomOrders() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, boolean> = {};
    REQUIRED_FIELDS.forEach((key) => {
      if (!values[key]?.trim()) nextErrors[key] = true;
    });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="customized-gifts" className="py-20 sm:py-28 bg-sand/40 grain-overlay">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-semibold">
            Customized gifts
          </span>
          <h2 className="font-display text-olive font-semibold text-4xl sm:text-5xl mt-3 relative inline-block">
            Make It Yours
            <StitchLine className="absolute left-0 -bottom-2 w-full" color="#C0603C" width={240} />
          </h2>
          <p className="font-body text-brown mt-5 leading-relaxed">
            Have an idea in mind? Tell us what you imagine and we'll help turn it into a handmade
            gift, made especially for you. Customized for your occasion — birthdays,
            anniversaries, farewells, bachelorette parties, graduations, and everything in
            between.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {["Farewell", "Anniversary", "Bachelorette Party"].map((tag) => (
              <span
                key={tag}
                className="font-body text-xs font-medium px-3 py-1.5 rounded-full bg-burgundy text-cream"
              >
                {tag} — customized gifts available
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-cream rounded-2xl border border-beige p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-terracotta font-semibold">{step.number}</span>
                <step.icon size={22} className="text-sage" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl text-olive font-semibold mt-3">{step.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-cream rounded-3xl border border-beige shadow-card p-6 sm:p-10 max-w-3xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto">
                <Check size={26} className="text-sage" />
              </div>
              <h3 className="font-display text-2xl text-olive font-semibold mt-5">
                Your idea is in our hands
              </h3>
              <p className="font-body text-brown mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you for sharing what you imagine. We'll be in touch soon to talk through the
                details and bring it to life.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setValues({});
                }}
                className="mt-6 px-6 py-2.5 rounded-full border border-olive text-olive font-body text-sm font-medium hover:bg-olive hover:text-cream transition-colors"
              >
                Submit another idea
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <Field label="Occasion" required error={errors.occasion}>
                <select
                  value={values.occasion ?? ""}
                  onChange={(e) => setField("occasion", e.target.value)}
                  className={inputClass(errors.occasion)}
                >
                  <option value="">Select an occasion</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Farewell</option>
                  <option>Bachelorette Party</option>
                  <option>Friendship</option>
                  <option>Graduation</option>
                  <option>Valentine's Day</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Recipient" required error={errors.recipient}>
                <input
                  type="text"
                  placeholder="Who is this for?"
                  value={values.recipient ?? ""}
                  onChange={(e) => setField("recipient", e.target.value)}
                  className={inputClass(errors.recipient)}
                />
              </Field>

              <Field label="Product type" required error={errors.productType}>
                <select
                  value={values.productType ?? ""}
                  onChange={(e) => setField("productType", e.target.value)}
                  className={inputClass(errors.productType)}
                >
                  <option value="">Select a product type</option>
                  <option>Handmade Bouquet</option>
                  <option>Personalized Gift</option>
                  <option>Handmade Jewelry</option>
                  <option>Celebration Gift</option>
                  <option>Something else</option>
                </select>
              </Field>

              <Field label="Preferred colors">
                <input
                  type="text"
                  placeholder="e.g. sage green, cream"
                  value={values.preferredColors ?? ""}
                  onChange={(e) => setField("preferredColors", e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <Field label="Your name" required error={errors.name}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={values.name ?? ""}
                  onChange={(e) => setField("name", e.target.value)}
                  className={inputClass(errors.name)}
                />
              </Field>

              <Field label="Preferred date">
                <input
                  type="date"
                  value={values.preferredDate ?? ""}
                  onChange={(e) => setField("preferredDate", e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Custom message" required error={errors.customMessage}>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you'd like it to say"
                    value={values.customMessage ?? ""}
                    onChange={(e) => setField("customMessage", e.target.value)}
                    className={inputClass(errors.customMessage) + " resize-none"}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Additional instructions">
                  <textarea
                    rows={2}
                    placeholder="Anything else we should know?"
                    value={values.additionalInstructions ?? ""}
                    onChange={(e) => setField("additionalInstructions", e.target.value)}
                    className={inputClass(false) + " resize-none"}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Photo upload (optional)">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setField("photoUpload", e.target.files?.[0]?.name ?? "")}
                    className="w-full font-body text-xs text-brown file:mr-3 file:py-2 file:px-3.5 file:rounded-full file:border-0 file:bg-sage file:text-cream file:text-xs file:font-medium file:cursor-pointer"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-olive text-cream font-body text-sm font-medium hover:bg-brown transition-colors"
                >
                  Submit Custom Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border px-3.5 py-2.5 font-body text-sm bg-sand/40 focus:bg-cream outline-none transition-colors ${
    hasError ? "border-terracotta" : "border-beige"
  }`;
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-body text-sm text-brown block mb-1.5">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </label>
      {children}
      {error && <p className="text-terracotta text-xs font-body mt-1">This field is required.</p>}
    </div>
  );
}
