import type { CSSProperties } from "react";
import { ArrowRight, Store } from "lucide-react";
import bear from "@/assets/chokolo_bear.png.asset.json";
import { PRODUCTS } from "@/lib/brand";
import { CtaLink } from "./ui";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[44rem] rounded-full bg-cream-deep"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="enter eyebrow text-primary" style={step(0)}>
            Mezclas de frutos secos · Durango, México
          </p>
          <h1
            id="hero-title"
            className="enter mt-6 text-[2.75rem] leading-[0.95] font-extrabold text-balance text-wine sm:text-6xl xl:text-[5.5rem]"
            style={step(1)}
          >
            El sabor que <span className="text-primary">conquista</span> cada momento.
          </h1>
          <p
            className="enter mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
            style={step(2)}
          >
            ChokoloMix son mezclas de nuez, almendra, fruta deshidratada y dulce en bolsa resellable
            de 43 g, para tu tienda o para llevar contigo.
          </p>
          <div className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={step(3)}>
            <CtaLink href="#productos" size="lg" className="group">
              Ver los productos
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]"
                aria-hidden
              />
            </CtaLink>
            <CtaLink href="#distribuidores" variant="outline" size="lg">
              <Store className="size-4" aria-hidden /> Quiero distribuir ChokoloMix
            </CtaLink>
          </div>
          <dl
            className="enter mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8"
            style={step(4)}
          >
            <div>
              <dt className="text-sm text-muted-foreground">Puntos de venta</dt>
              <dd className="font-display text-3xl font-extrabold text-wine sm:text-4xl">+300</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Variedades</dt>
              <dd className="font-display text-3xl font-extrabold text-wine sm:text-4xl">3</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Por bolsa</dt>
              <dd className="font-display text-3xl font-extrabold text-wine sm:text-4xl">43 g</dd>
            </div>
          </dl>
        </div>

        <div className="enter relative mx-auto aspect-square w-full max-w-xl" style={step(2)}>
          <div className="absolute inset-[8%] rounded-[3rem] bg-wine-gradient shadow-soft" />
          <img
            src={bear.url}
            alt="Osito Chokolo con una bolsa de ChokoloMix"
            fetchPriority="high"
            className="absolute top-[2%] left-1/2 h-[62%] -translate-x-1/2 drop-shadow-2xl"
          />
          <ul className="absolute inset-x-[4%] bottom-[4%] grid grid-cols-3 gap-2 sm:gap-3">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <a
                  href="#productos"
                  className="block overflow-hidden rounded-2xl border-4 border-card bg-card shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={p.image}
                    alt={`Bolsa ${p.name}`}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[600ms] hover:scale-[1.03]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
