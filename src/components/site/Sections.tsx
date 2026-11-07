import {
  Boxes,
  Check,
  Layers,
  MapPin,
  MessageCircle,
  Package,
  PackageOpen,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import trio from "@/assets/mix_trio.jpg.asset.json";
import displayShop from "@/assets/display_tienda.jpg.asset.json";
import displayBags from "@/assets/display_bolsas.jpg.asset.json";
import master from "@/assets/caja_master.jpg.asset.json";
import pv1 from "@/assets/punto_venta_1.jpg.asset.json";
import pv2 from "@/assets/punto_venta_2.jpg.asset.json";
import pv3 from "@/assets/punto_venta_3.jpg.asset.json";
import { PRESENTATION, PRODUCTS, whatsappLink, type Product } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { CtaLink, Photo, SectionHeading } from "./ui";

export function About() {
  return (
    <section id="marca" aria-labelledby="marca-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative">
          <Photo
            src={trio.url}
            alt="Las tres variedades de ChokoloMix: Tropical, Natural y Enchilado"
            className="w-full rounded-3xl object-cover shadow-soft"
            loading="lazy"
          />
          <div className="absolute -bottom-6 -right-2 rounded-2xl bg-wine px-6 py-5 text-wine-foreground shadow-lift md:-right-6">
            <p className="font-display text-3xl font-extrabold">3 mezclas</p>
            <p className="text-sm text-wine-foreground/70">Un sabor para cada momento</p>
          </div>
        </div>
        <div>
          <SectionHeading
            id="marca-title"
            eyebrow="Conoce ChokoloMix"
            title="Mucho más que un snack."
          >
            En ChokoloMix creemos que cada momento merece algo delicioso. Por eso ofrecemos mezclas
            de frutos secos y snacks que combinan diferentes sabores, texturas y experiencias.
          </SectionHeading>
          <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {[
              {
                icon: Sparkles,
                t: "Sabores y texturas",
                d: "Frutos secos, fruta deshidratada y dulce.",
              },
              {
                icon: PackageOpen,
                t: "Empaque resellable",
                d: "Práctico para llevar a donde quieras.",
              },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="border-t border-border py-5">
                <dt className="flex items-center gap-2 font-display text-lg font-bold text-wine">
                  <Icon className="size-5 text-primary" aria-hidden /> {t}
                </dt>
                <dd className="mt-1 text-muted-foreground">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

const toneClass: Record<Product["tone"], string> = {
  leaf: "bg-leaf text-primary-foreground",
  gold: "bg-gold text-wine",
  primary: "bg-primary text-primary-foreground",
};

function ProductCard({ p }: { p: Product }) {
  return (
    <article
      aria-labelledby={`p-${p.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-wine/25 hover:shadow-soft"
    >
      <div className="relative overflow-hidden">
        <Photo
          src={p.image}
          alt={`Empaque ${p.name} de ChokoloMix`}
          className="aspect-[5/4] w-full object-cover duration-[600ms] group-hover:scale-[1.03]"
          loading="lazy"
        />
        <span
          className={cn(
            "eyebrow absolute left-4 top-4 rounded-full px-3 py-1.5",
            toneClass[p.tone],
          )}
        >
          {p.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 id={`p-${p.id}`} className="text-3xl font-extrabold text-wine">
          {p.name}
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
        <p id={`ing-${p.id}`} className="eyebrow mt-6 text-wine/70">
          Ingredientes
        </p>
        <ul aria-labelledby={`ing-${p.id}`} className="mt-3 flex flex-wrap gap-2">
          {p.ingredients.map((ing) => (
            <li
              key={ing}
              className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
            >
              {ing}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-wine">
          <Package className="size-4 text-primary" aria-hidden /> {PRESENTATION}
        </p>
        <CtaLink
          href={whatsappLink(`Hola ChokoloMix, me gustaría recibir información sobre ${p.name}.`)}
          variant="wine"
          className="mt-6 w-full"
        >
          <MessageCircle className="size-4" aria-hidden /> Pedir información de {p.name}
        </CtaLink>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section
      id="productos"
      aria-labelledby="productos-title"
      className="bg-cream-deep py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="productos-title"
          eyebrow="Nuestros productos"
          title="Tres mezclas, tres personalidades."
          center
        >
          Frutos secos, fruta y snacks en una bolsa resellable lista para cualquier momento.
        </SectionHeading>
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ACTIVE = ["Durango", "Vicente Guerrero", "Nombre de Dios", "Guadalupe Victoria"];
const UPCOMING = ["Torreón", "Gómez Palacio", "Lerdo", "Cuencamé", "Canatlán"];

export function Distribution() {
  return (
    <section
      id="distribucion"
      aria-labelledby="distribucion-title"
      className="bg-wine-gradient py-20 text-wine-foreground md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="distribucion-title"
          eyebrow="Distribución"
          title="Dos canales para llevar ChokoloMix a tu negocio."
          light
        >
          ChokoloMix llega a sus clientes a través de dos modalidades: canal detalle por ruta y
          canal mayoreo.
        </SectionHeading>

        {/* Canal detalle */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-wine-foreground/15 bg-wine-foreground/5 p-7 md:p-10">
            <div className="flex items-center gap-3">
              <Truck className="size-6 text-gold" aria-hidden />
              <h3 className="text-2xl font-bold">Canal detalle (ruta)</h3>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-gold">Presencia actual</p>
                <ul className="mt-4 space-y-3">
                  {ACTIVE.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-lg">
                      <MapPin className="size-4 text-gold" aria-hidden /> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-wine-foreground/75">Por aperturar</p>
                <ul className="mt-4 space-y-3">
                  {UPCOMING.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-lg text-wine-foreground/80">
                      <span
                        aria-hidden
                        className="size-2 rounded-full border border-wine-foreground/60"
                      />{" "}
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8 rounded-3xl bg-gold p-7 text-wine md:p-10">
            <Store className="size-8" aria-hidden />
            <div>
              <p className="font-display text-7xl font-extrabold leading-none md:text-8xl">+300</p>
              <p className="mt-2 text-lg font-semibold">puntos de venta</p>
              <p className="mt-4 text-wine/80">Minisúpers, misceláneas y fruterías.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 md:gap-6">
          {[pv1, pv2, pv3].map((img, i) => (
            <div key={img.url} className="overflow-hidden rounded-2xl">
              <Photo
                src={img.url}
                alt={`Exhibidor de ChokoloMix en punto de venta ${i + 1}`}
                className="aspect-[4/5] w-full scale-[1.18] object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Canal mayoreo */}
        <div className="mt-20 flex items-center gap-3">
          <Boxes className="size-6 text-gold" aria-hidden />
          <h3 className="text-2xl font-bold">Canal mayoreo</h3>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-3xl bg-card text-card-foreground">
            <Photo
              src={displayShop.url}
              alt="Display de ChokoloMix en tienda"
              className="aspect-[16/11] w-full object-cover"
              loading="lazy"
            />
            <div className="p-7">
              <p className="eyebrow text-primary">Display</p>
              <h4 className="mt-2 text-2xl font-bold text-wine">
                Caja impulsora con 6 bolsas de 43 g
              </h4>
              <ul className="mt-5 space-y-2">
                {["2 Mix Natural", "2 Mix Tropical", "2 Mix Enchilado"].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="size-4 text-leaf" aria-hidden /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl bg-card text-card-foreground">
            <div className="grid grid-cols-2">
              <Photo
                src={displayBags.url}
                alt="Display con las tres variedades"
                className="aspect-[4/5] w-full object-cover md:aspect-[8/11]"
                loading="lazy"
              />
              <Photo
                src={master.url}
                alt="Caja master de ChokoloMix"
                className="aspect-[4/5] w-full object-cover md:aspect-[8/11]"
                loading="lazy"
              />
            </div>
            <div className="p-7">
              <p className="eyebrow text-primary">Caja master</p>
              <h4 className="mt-2 text-2xl font-bold text-wine">10 displays por caja</h4>
              <p className="mt-4 flex items-center gap-2 text-muted-foreground">
                <Layers className="size-4 text-leaf" aria-hidden /> Caja de cartón de 50 × 30 × 15
                cm
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Why() {
  const items = [
    { t: "Variedad de sabores", d: "Natural, Tropical y Enchilado: clásico, frutal e intenso." },
    {
      t: "Presentaciones prácticas",
      d: "Bolsa resellable de 43 g, display de 6 bolsas y caja master.",
    },
    { t: "Opciones de distribución", d: "Canal detalle por ruta y canal mayoreo." },
    { t: "Más de 300 puntos de venta", d: "Minisúpers, misceláneas y fruterías en Durango." },
  ];
  return (
    <section aria-labelledby="por-que-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          id="por-que-title"
          eyebrow="¿Por qué ChokoloMix?"
          title="Cuatro razones para tenerlo en tu tienda."
        />
        <ol className="grid gap-x-10 sm:grid-cols-2">
          {items.map(({ t, d }, i) => (
            <li key={t} className="border-t-2 border-wine/15 py-7">
              <span className="font-display text-sm font-bold text-primary tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl font-bold text-wine">{t}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
