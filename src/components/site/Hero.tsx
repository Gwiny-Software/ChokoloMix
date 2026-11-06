import { ArrowRight, MapPin, Store } from "lucide-react";
import bear from "@/assets/chokolo_bear.png.asset.json";
import { PRODUCTS } from "@/lib/brand";
import { CtaLink } from "./ui";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[44rem] rounded-full bg-cream-deep"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="reveal">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-2 text-primary">
            <MapPin className="size-3.5" /> Durango, México
          </p>
          <h1 className="mt-7 text-5xl font-extrabold leading-[0.95] text-wine sm:text-6xl xl:text-[5.5rem]">
            El sabor que <span className="text-primary">conquista</span> cada momento.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Descubre Chokolo Mix, mezclas irresistibles de frutos secos y snacks creadas para
            disfrutar, compartir y llevar contigo a donde quieras.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#productos" size="lg">
              Conoce nuestros productos <ArrowRight className="size-4" />
            </CtaLink>
            <CtaLink href="#distribuidores" variant="outline" size="lg">
              <Store className="size-4" /> Quiero distribuir Chokolo Mix
            </CtaLink>
          </div>
          <dl className="mt-12 flex gap-10 border-t border-border pt-8">
            <div>
              <dt className="text-sm text-muted-foreground">Puntos de venta</dt>
              <dd className="font-display text-4xl font-extrabold text-wine">+300</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Variedades</dt>
              <dd className="font-display text-4xl font-extrabold text-wine">3</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Por bolsa</dt>
              <dd className="font-display text-4xl font-extrabold text-wine">43 g</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <div className="absolute inset-[8%] rounded-[3rem] bg-wine-gradient shadow-soft" />
          <img
            src={bear.url}
            alt="Osito Chokolo disfrutando una bolsa de Chokolo Mix"
            className="animate-float absolute left-1/2 top-[2%] h-[62%] -translate-x-1/2 drop-shadow-2xl"
          />
          <div className="absolute inset-x-[4%] bottom-[4%] grid grid-cols-3 gap-3">
            {PRODUCTS.map((p, i) => (
              <figure
                key={p.id}
                className="reveal overflow-hidden rounded-2xl border-4 border-card bg-card shadow-soft"
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                <img src={p.image} alt={`Bolsa ${p.name}`} className="aspect-[4/5] w-full object-cover" />
                <figcaption className="px-2 py-2 text-center text-xs font-bold text-wine">
                  {p.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
