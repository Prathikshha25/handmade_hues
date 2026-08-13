export type Category =
  | "Handmade Bouquets"
  | "Personalized Gifts"
  | "Handmade Jewelry"
  | "Celebration Gifts";

export type Occasion =
  | "Birthday"
  | "Anniversary"
  | "Farewell"
  | "Bachelorette Party"
  | "Friendship"
  | "Graduation"
  | "Valentine's Day"
  | "Other";

export type CustomizationField =
  | { type: "text"; key: string; label: string; placeholder?: string; required?: boolean }
  | { type: "textarea"; key: string; label: string; placeholder?: string; required?: boolean }
  | { type: "select"; key: string; label: string; options: string[]; required?: boolean }
  | { type: "photo"; key: string; label: string; required?: boolean };

export interface Product {
  id: string;
  name: string;
  category: Category;
  images: string[];
  shortDescription: string;
  description: string;
  customization: CustomizationField[];
  featured?: boolean;
}

export interface CartCustomization {
  [key: string]: string;
}

export interface CartItem {
  lineId: string;
  productId: string;
  quantity: number;
  customization: CartCustomization;
}
