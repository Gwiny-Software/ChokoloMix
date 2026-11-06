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
import { CtaLink, SectionHeading } from "./ui";

export function About() {
  return (
    <section id="marca" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div className="reveal relative">
          <img
            src={trio.url}
            alt="Las tres variedades de Chokolo Mix: Tropical, Natural y Enchilado"
            className="w-full rounded-3xl object-cover shadow-soft"
            loading="lazy"
          />
          <div className="absolute -bottom-6 -right-2 rounded-2xl bg-wine px-6 py-5 text-wine-foreground shadow-lift md:-right-6">
            <p className="font-display text-3xl font-extrabold">3 mezclas</p>
            <p className="text-sm text-wine-foreground/70">Un sabor para cada momento</p>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Conoce Chokolo Mix" title="Mucho más que un snack.">
            En Chokolo Mix creemos que cada momento merece algo delicioso. Por eso ofrecemos mezclas
            de frutos secos y snacks que combinan diferentes sabores, texturas y experiencias.
          </SectionHeading>
          <ul className="reveal mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Sparkles, t: "Sabores y texturas", d: "Frutos secos, fruta deshidratada y dulce." },
              { icon: PackageOpen, t: "Empaque resellable", d: "Práctico para llevar a donde quieras." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="rounded-2xl border border-border bg-card p-5">
                <Icon className="size-6 text-primary" />
                <p className="mt-3 font-display text-lg font-bold text-wine">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
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

function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <article
      className="reveal group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={p.image}
          alt={`Empaque ${p.name} de Chokolo Mix`}
          className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className={cn("eyebrow absolute left-4 top-4 rounded-full px-3 py-1.5", toneClass[p.tone])}>
          {p.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-3xl font-extrabold text-wine">{p.name}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
        <p className="eyebrow mt-6 text-wine/60">Ingredientes</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.ingredients.map((ing) => (
            <li key={ing} className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {ing}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-wine">
          <Package className="size-4 text-primary" /> {PRESENTATION}
        </p>
        <CtaLink
          href={whatsappLink(`Hola Chokolo Mix, me gustaría recibir información sobre ${p.name}.`)}
          variant="wine"
          className="mt-6 w-full"
        >
          <MessageCircle className="size-4" /> Solicitar información
        </CtaLink>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section id="productos" className="bg-cream-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Nuestros productos" title="Tres mezclas, tres personalidades." center>
          Frutos secos, fruta y snacks en una bolsa resellable lista para cualquier momento.
        </SectionHeading>
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
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
    <section id="distribucion" className="bg-wine-gradient py-20 text-wine-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Distribución" title="Un gran sabor, listo para llegar a más lugares." light>
          Chokolo Mix llega a sus clientes a través de dos modalidades: canal detalle por ruta y
          canal mayoreo.
        </SectionHeading>

        {/* Canal detalle */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="reveal rounded-3xl border border-wine-foreground/15 bg-wine-foreground/5 p-7 md:p-10">
            <div className="flex items-center gap-3">
              <Truck className="size-6 text-gold" />
              <h3 className="text-2xl font-bold">Canal detalle (ruta)</h3>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-gold">Presencia actual</p>
                <ul className="mt-4 space-y-3">
                  {ACTIVE.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-lg">
                      <MapPin className="size-4 text-gold" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-wine-foreground/60">Por aperturar</p>
                <ul className="mt-4 space-y-3">
                  {UPCOMING.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-lg text-wine-foreground/70">
                      <span className="size-2 rounded-full border border-wine-foreground/50" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="reveal flex flex-col justify-between rounded-3xl bg-gold p-7 text-wine md:p-10">
            <Store className="size-8" />
            <div>
              <p className="font-display text-7xl font-extrabold leading-none md:text-8xl">+300</p>
              <p className="mt-2 text-lg font-semibold">puntos de venta</p>
              <p className="mt-4 text-wine/75">Minisúpers, misceláneas y fruterías.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 md:gap-6">
          {[pv1, pv2, pv3].map((img, i) => (
            <img
              key={img.url}
              src={img.url}
              alt={`Exhibidor de Chokolo Mix en punto de venta ${i + 1}`}
              className="reveal aspect-[4/5] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          ))}
        </div>

        {/* Canal mayoreo */}
        <div className="mt-20 flex items-center gap-3">
          <Boxes className="size-6 text-gold" />
          <h3 className="text-2xl font-bold">Canal mayoreo</h3>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="reveal overflow-hidden rounded-3xl bg-card text-card-foreground">
            <img src={displayShop.url} alt="Display de Chokolo Mix en tienda" className="aspect-[16/11] w-full object-cover" loading="lazy" />
            <div className="p-7">
              <p className="eyebrow text-primary">Display</p>
              <h4 className="mt-2 text-2xl font-bold text-wine">Caja impulsora con 6 bolsas de 43 g</h4>
              <ul className="mt-5 space-y-2">
                {["2 Mix Natural", "2 Mix Tropical", "2 Mix Enchilado"].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="size-4 text-leaf" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article className="reveal overflow-hidden rounded-3xl bg-card text-card-foreground">
            <div className="grid grid-cols-2">
              <img src={displayBags.url} alt="Display con las tres variedades" className="aspect-[4/5] w-full object-cover md:aspect-[8/11]" loading="lazy" />
              <img src={master.url} alt="Caja master de Chokolo Mix" className="aspect-[4/5] w-full object-cover md:aspect-[8/11]" loading="lazy" />
            </div>
            <div className="p-7">
              <p className="eyebrow text-primary">Caja master</p>
              <h4 className="mt-2 text-2xl font-bold text-wine">10 displays por caja</h4>
              <p className="mt-4 flex items-center gap-2 text-muted-foreground">
                <Layers className="size-4 text-leaf" /> Caja de cartón de 50 × 30 × 15 cm
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
    { icon: Sparkles, t: "Variedad de sabores", d: "Natural, Tropical y Enchilado: clásico, frutal e intenso." },
    { icon: Package, t: "Presentaciones prácticas", d: "Bolsa resellable de 43 g, display y caja master." },
    { icon: Truck, t: "Opciones de distribución", d: "Canal detalle por ruta y canal mayoreo." },
    { icon: Store, t: "Más de 300 puntos de venta", d: "Minisúpers, misceláneas y fruterías." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="¿Por qué Chokolo Mix?" title="Razones para elegirnos." center />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }, i) => (
            <div
              key={t}
              className="reveal group rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-wine">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
