import { FACEBOOK_URL, INSTAGRAM_URL, SITE_URL, canonical } from "@/lib/brand";
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
    links: canonical("/").links,
    meta: [
      ...canonical("/").meta,
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ChokoloMix",
          alternateName: "Chokolo Dulces & Snacks",
          url: SITE_URL,
          logo: `${SITE_URL}/images/chokolo_logo.png`,
          telephone: "+52 618 275 1730",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Durango",
            addressRegion: "Durango",
            addressCountry: "MX",
          },
          sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
        }),
      },
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
