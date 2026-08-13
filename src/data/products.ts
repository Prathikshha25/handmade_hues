import type { Product, Category, CustomizationField } from "../types";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Farewell",
  "Bachelorette Party",
  "Friendship",
  "Graduation",
  "Valentine's Day",
  "Other",
];

function universalCustomization(category: Category): CustomizationField[] {
  return [
    {
      type: "select",
      key: "occasion",
      label: "Occasion",
      options: OCCASIONS,
      required: true,
    },
    {
      type: "text",
      key: "giftType",
      label: "Gift type",
      placeholder: category,
    },
    {
      type: "text",
      key: "colorTheme",
      label: "Color / theme preference",
      placeholder: "e.g. warm tones, pastel, minimal",
    },
    {
      type: "textarea",
      key: "personalMessage",
      label: "Personal message",
      placeholder: "What would you like included or written?",
    },
    {
      type: "text",
      key: "nameOrText",
      label: "Name / text to be added",
      placeholder: "e.g. a name, initials, or short phrase",
    },
    {
      type: "photo",
      key: "photoUpload",
      label: "Upload a photo (optional)",
    },
    {
      type: "textarea",
      key: "otherRequirements",
      label: "Other customization requirements",
      placeholder: "Anything else we should know?",
    },
  ];
}

export const products: Product[] = [
  {
    id: "sunflower-rose-bouquet",
    name: "Sunflower & Rose Bouquet",
    category: "Handmade Bouquets",
    images: ["/images/bouquet-sunflower-rose-1.jpg", "/images/bouquet-sunflower-rose-3.jpg"],
    shortDescription: "Red roses gathered around a single sunflower, wrapped by hand.",
    description:
      "A cheerful, sun-bright arrangement of deep red roses framed by baby's breath and a single sunflower at its heart, finished in soft Korean wrap and a curled ribbon. Made especially for you for birthdays, thank-yous, or any day that deserves a little warmth.",
    customization: universalCustomization("Handmade Bouquets"),
    featured: true,
  },
  {
    id: "crochet-tulip-bouquet",
    name: "Crochet Tulip Bouquet",
    category: "Handmade Bouquets",
    images: ["/images/bouquet-crochet-tulip.jpg"],
    shortDescription: "A single hand-crocheted tulip that never wilts.",
    description:
      "Stitched by hand from soft yarn, this single crochet tulip is wrapped in paper and finished with a satin bow. A keepsake bouquet, customized for your occasion, for someone who'll still have it long after fresh flowers fade.",
    customization: universalCustomization("Handmade Bouquets"),
  },
  {
    id: "rose-white-red-bouquet",
    name: "Red & White Rose Bouquet",
    category: "Handmade Bouquets",
    images: ["/images/bouquet-rose-white-red.jpg"],
    shortDescription: "Deep red and ivory roses with baby's breath, wrapped in kraft.",
    description:
      "A moody, romantic pairing of deep red and ivory roses set among sprigs of baby's breath, wrapped in warm kraft paper. Understated and elegant for anniversaries or quiet celebrations.",
    customization: universalCustomization("Handmade Bouquets"),
  },
  {
    id: "crochet-bow-keychain",
    name: "Crochet Bow Keychain",
    category: "Handmade Jewelry",
    images: ["/images/accessory-crochet-bow-keychain.jpg"],
    shortDescription: "A tiny hand-crocheted bow on a gold-tone keyring.",
    description:
      "A small handmade bow, crocheted stitch by stitch in deep maroon yarn and mounted on a gold-tone keyring clasp. A sweet everyday-carry gift for friends, siblings, or yourself — personalized gifts for every celebration.",
    customization: universalCustomization("Handmade Jewelry"),
  },
  {
    id: "pink-flower-bracelet",
    name: "Flower Vine Bracelet",
    category: "Handmade Jewelry",
    images: ["/images/accessory-pink-flower-bracelet.jpg"],
    shortDescription: "A delicate vine-and-blossom bracelet with stone detailing.",
    description:
      "A delicate rose-gold toned bracelet shaped like a flowering vine, set with stones along its length. Comes boxed and ready to gift for birthdays or anniversaries.",
    customization: universalCustomization("Handmade Jewelry"),
  },
  {
    id: "infinity-necklace",
    name: "Infinity Necklace",
    category: "Handmade Jewelry",
    images: ["/images/accessory-infinity-necklace.jpg"],
    shortDescription: "A fine chain necklace with a crystal-set infinity pendant.",
    description:
      "A fine gold-tone chain necklace with a crystal-lined infinity pendant at its centre. Simple, wearable, and a quiet way to say 'always'.",
    customization: universalCustomization("Handmade Jewelry"),
  },
  {
    id: "rose-gold-watch",
    name: "Classic Watch",
    category: "Handmade Jewelry",
    images: ["/images/accessory-rose-gold-watch.jpg"],
    shortDescription: "A classic rose gold-tone wristwatch with a link strap.",
    description:
      "A classic digital wristwatch finished in warm rose gold, with a comfortable link strap. A dependable, everyday gift for someone who appreciates the classics — suited for every gender.",
    customization: universalCustomization("Handmade Jewelry"),
  },
  {
    id: "purple-silk-saree",
    name: "Silk Saree",
    category: "Celebration Gifts",
    images: ["/images/gift-silk-saree.jpg"],
    shortDescription: "A deep purple silk saree with a woven gold border.",
    description:
      "A rich, deep-purple silk saree with a densely woven gold zari border and a scattering of small motifs across the body. A thoughtful, traditional gift for milestone celebrations.",
    customization: universalCustomization("Celebration Gifts"),
  },
  {
    id: "valentine-surprise-hamper",
    name: "Surprise Gift Hamper",
    category: "Celebration Gifts",
    images: ["/images/hamper-valentine-box.jpg"],
    shortDescription: "A themed hamper with a handwritten card, keychains, treats and photos.",
    description:
      "A fully curated surprise hamper — a handwritten letter, a decorated photo frame insert, keychains, a mini keepsake box and a few treats, all packed into one box with shredded paper filling. Customized for your occasion — anniversaries, farewells, or 'just because' surprises.",
    customization: universalCustomization("Celebration Gifts"),
    featured: true,
  },
  {
    id: "red-ribbon-gift-box",
    name: "Ribbon Gift Box",
    category: "Celebration Gifts",
    images: ["/images/hamper-red-ribbon-box.jpg"],
    shortDescription: "A classic gift box finished with a hand-tied ribbon bow.",
    description:
      "A clean gift box wrapped with a wide ribbon and finished in a full, hand-tied bow — the box itself, ready to be filled with whatever you'd like inside. A simple, elegant base for any celebration.",
    customization: universalCustomization("Celebration Gifts"),
  },
  {
    id: "personalized-letter-gift",
    name: "Personalized Letter & Photo Gift",
    category: "Personalized Gifts",
    images: ["/images/card-letter-photo-1.jpg", "/images/card-letter-photo-2.jpg"],
    shortDescription: "A handwritten letter, name art and printed photos, ribbon-tied.",
    description:
      "A handwritten letter on illustrated stationery, paired with hand-lettered name art, a heart-branch drawing and a small set of printed photos, all tied together with satin ribbon. Made especially for you — every element is written and assembled by hand for one specific person.",
    customization: universalCustomization("Personalized Gifts"),
    featured: true,
  },
  {
    id: "personalized-scrapbook",
    name: "Personalized Scrapbook",
    category: "Personalized Gifts",
    images: ["/images/card-scrapbook.jpg"],
    shortDescription: "A hand-decorated fold-out scrapbook of notes, memories and photos.",
    description:
      "A fold-out scrapbook, hand-lettered and decorated with cut-paper details, pockets of handwritten notes, and space for a calendar or timeline of memories. Built page by page around the person it's for — customized for your occasion, from friendship to farewell.",
    customization: universalCustomization("Personalized Gifts"),
  },
  {
    id: "birthday-memory-board",
    name: "Personalized Memory Board",
    category: "Personalized Gifts",
    images: ["/images/gift-memory-board.jpg"],
    shortDescription: "A fold-out photo collage board with handwritten notes and stickers.",
    description:
      "A large fold-out board built around a collage of printed photos, handwritten notes and hand-drawn stickers. A heartfelt keepsake gift, built entirely around the memories you share with the recipient.",
    customization: universalCustomization("Personalized Gifts"),
  },
];

export const categories: Category[] = [
  "Handmade Bouquets",
  "Personalized Gifts",
  "Handmade Jewelry",
  "Celebration Gifts",
];

export const occasions = OCCASIONS;

export const getProductById = (id: string) => products.find((p) => p.id === id);
