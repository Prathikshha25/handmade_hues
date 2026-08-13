# Handmade Hues

A premium, responsive website for Handmade Hues — a handmade gifting brand selling bouquets,
personalized gifts, cards, accessories and gift hampers.

Built with React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide Icons.

All product photography in `public/images/` is real Handmade Hues product photography — no
stock, no AI-generated, no placeholder images.

## Getting started locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173` by default.

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production build outputs to `dist/`.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repository.
3. Vercel auto-detects the Vite framework preset:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**.

No environment variables or backend are required — the shopping bag and wishlist are stored in
the browser via `localStorage`, and "Send Enquiry" opens a pre-filled WhatsApp message instead of
a real checkout.

## Project structure

```
src/
  components/   Reusable UI components (Navbar, Hero, Shop, ProductModal, CartDrawer, ...)
  context/      React context for cart and wishlist state (localStorage-backed)
  data/         Product catalog
  hooks/        Small reusable hooks (e.g. Escape-key handling)
  types/        Shared TypeScript types
public/images/  Real product photography, referenced by the catalog
```

## Notes

- Contact details (Instagram handle, WhatsApp number, email) in the Contact and Footer sections
  are placeholders — replace them with real details before going live.
- Prices are illustrative sample prices for this showcase project, not real business pricing.
