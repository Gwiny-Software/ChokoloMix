import { Phone } from "lucide-react";
import logo from "@/assets/chokolo_logo.png.asset.json";
import bear from "@/assets/chokolo_bear.png.asset.json";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  NAV,
  PHONE_DISPLAY,
  PRODUCTS,
  whatsappLink,
} from "@/lib/brand";
import { CtaLink, FacebookIcon, InstagramIcon, WhatsAppIcon } from "./ui";

export function Contact() {
  return (
    <section id="contacto" className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-7 py-14 text-primary-foreground md:px-16 md:py-20">
        <img
          src={bear.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-6 hidden h-[115%] opacity-90 md:block"
        />
        <div className="relative max-w-xl">
          <p className="eyebrow text-gold">Contacto</p>
          <h2 className="mt-4 text-5xl font-extrabold leading-none md:text-7xl">¡Hablemos de negocios!</h2>
          <ul className="mt-10 space-y-4 text-lg">
            <li>
              <a href="tel:+526182751730" className="inline-flex items-center gap-3 hover:underline">
                <Phone className="size-5" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:underline">
                <InstagramIcon className="size-5" /> @CHOKOLO_SNACKS
              </a>
            </li>
            <li>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:underline">
                <FacebookIcon className="size-5" /> CHOKOLO DULCES & SNACKS
              </a>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink href={whatsappLink("Hola ChokoloMix, me gustaría más información.")} variant="light" size="lg">
              <WhatsAppIcon className="size-5" /> Contactar por WhatsApp
            </CtaLink>
            <CtaLink href={INSTAGRAM_URL} variant="ghostLight" size="lg">
              <InstagramIcon className="size-5" /> Instagram
            </CtaLink>
            <CtaLink href={FACEBOOK_URL} variant="ghostLight" size="lg">
              <FacebookIcon className="size-5" /> Facebook
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-wine text-wine-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="inline-block rounded-2xl bg-background p-3">
            <img src={logo.url} alt="ChokoloMix" className="h-20 w-auto" loading="lazy" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-wine-foreground/70">
            Mezclas de frutos secos y snacks desde Durango, México, para disfrutar y compartir.
          </p>
        </div>
        <FooterCol title="Navegación">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-gold">{n.label}</a>
            </li>
          ))}
        </FooterCol>
        <FooterCol title="Productos">
          {PRODUCTS.map((p) => (
            <li key={p.id}>
              <a href="#productos" className="hover:text-gold">{p.name}</a>
            </li>
          ))}
          <li>
            <a href="#distribucion" className="hover:text-gold">Display y caja master</a>
          </li>
        </FooterCol>
        <FooterCol title="Contacto">
          <li><a href="tel:+526182751730" className="hover:text-gold">{PHONE_DISPLAY}</a></li>
          <li><a href={whatsappLink("Hola ChokoloMix")} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp</a></li>
          <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a></li>
          <li><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Facebook</a></li>
          <li className="text-wine-foreground/60">Durango, México</li>
        </FooterCol>
      </div>
      <div className="border-t border-wine-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-wine-foreground/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} ChokoloMix — Dulces & Snacks.</p>
          <details className="md:text-right">
            <summary className="cursor-pointer hover:text-gold">Aviso de privacidad</summary>
            <p className="mt-2 max-w-md text-left">
              Los datos que compartes en el formulario se envían directamente por WhatsApp a Chokolo
              Mix y se usan únicamente para dar seguimiento a tu solicitud comercial.
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-gold">{title}</p>
      <ul className="mt-5 space-y-3 text-sm text-wine-foreground/80">{children}</ul>
    </div>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hola ChokoloMix, me gustaría más información.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
