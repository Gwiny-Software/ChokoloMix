import natural from "@/assets/mix_natural.jpg.asset.json";
import tropical from "@/assets/mix_tropical.jpg.asset.json";
import enchilado from "@/assets/mix_enchilado.jpg.asset.json";

export const PHONE_DISPLAY = "618 275 17 30";
export const WHATSAPP_NUMBER = "526182751730";
export const INSTAGRAM_URL = "https://www.instagram.com/chokolo_snacks/";
export const FACEBOOK_URL =
  "https://www.facebook.com/people/Chokolo-Dulces-Snacks/61589474303030/";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: "#marca", label: "Marca" },
  { href: "#productos", label: "Productos" },
  { href: "#distribucion", label: "Distribución" },
  { href: "#distribuidores", label: "Distribuidores" },
  { href: "#contacto", label: "Contacto" },
];

export type Product = {
  id: string;
  name: string;
  tag: string;
  description: string;
  ingredients: string[];
  image: string;
  tone: "gold" | "leaf" | "primary";
};

export const PRODUCTS: Product[] = [
  {
    id: "natural",
    name: "Mix Natural",
    tag: "Clásico",
    description:
      "Una combinación de sabores y texturas para quienes disfrutan de una mezcla clásica y deliciosa.",
    ingredients: ["Nuez", "Almendra", "Arándano", "Cacahuate horneado natural", "Luneta"],
    image: natural.url,
    tone: "leaf",
  },
  {
    id: "tropical",
    name: "Mix Tropical",
    tag: "Frutal",
    description:
      "Una mezcla con un toque picante que combina ingredientes frutales y frutos secos.",
    ingredients: ["Nuez", "Almendra", "Piña deshidratada", "Arándano", "Tamarindo enchilado"],
    image: tropical.url,
    tone: "gold",
  },
  {
    id: "enchilado",
    name: "Mix Enchilado",
    tag: "Intenso",
    description: "Una combinación con personalidad, sabores intensos y un toque enchilado.",
    ingredients: ["Nuez", "Arándano enchilado", "Cacahuate tostado", "Piña", "Mango deshidratado"],
    image: enchilado.url,
    tone: "primary",
  },
];

export const PRESENTATION = "Bolsa Stand Up Pouch resellable de 43 g";
