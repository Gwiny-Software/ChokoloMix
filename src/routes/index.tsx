import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About, Distribution, Products, Why } from "@/components/site/Sections";
import { Distributor } from "@/components/site/Distributor";
import { Contact } from "@/components/site/Contact";
import { SiteLayout } from "@/components/site/Layout";

const TITLE = "ChokoloMix — Dulces & Snacks | Mezclas de frutos secos en Durango";
const DESC =
  "Mix Natural, Mix Tropical y Mix Enchilado en bolsa resellable de 43 g. Más de 300 puntos de venta en Durango. Conviértete en distribuidor.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Products />
      <Distribution />
      <Why />
      <Distributor />
      <Contact />
    </SiteLayout>
  );
}
