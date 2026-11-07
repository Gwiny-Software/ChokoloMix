import { Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/chokolo_logo.png.asset.json";
import bear from "@/assets/chokolo-contact-mascot.png.asset.json";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LEGAL,
  NAV,
  PHONE_DISPLAY,
  PHONE_TEL,
  PRODUCTS,
  whatsappLink,
} from "@/lib/brand";
import { CtaLink, FacebookIcon, InstagramIcon, WhatsAppIcon, textLink } from "./ui";

const NEW_TAB = <span className="sr-only"> (se abre en una pestaña nueva)</span>;

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-7 py-14 text-primary-foreground md:px-16 md:py-20">
        <img
          src={bear.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 hidden h-[95%] w-[42%] object-contain object-bottom opacity-90 md:block lg:-bottom-[16%] lg:-right-[18%] lg:h-[140%] lg:w-auto lg:max-w-none"
        />
        <div className="relative max-w-xl">
          <p className="eyebrow text-gold">Contacto</p>
          <h2
            id="contacto-title"
            className="mt-4 text-[2.75rem] leading-none font-extrabold text-balance md:text-7xl"
          >
            ¡Hablemos de negocios!
          </h2>
          <ul className="mt-10 space-y-4 text-lg">
            <li>
              <a href={PHONE_TEL} className={`inline-flex items-center gap-3 ${textLink}`}>
                <Phone className="size-5" aria-hidden /> <span className="sr-only">Teléfono: </span>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 ${textLink}`}
              >
                <InstagramIcon className="size-5" /> <span className="sr-only">Instagram: </span>
                @CHOKOLO_SNACKS
                {NEW_TAB}
              </a>
            </li>
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 ${textLink}`}
              >
                <FacebookIcon className="size-5" /> <span className="sr-only">Facebook: </span>
                CHOKOLO DULCES & SNACKS
                {NEW_TAB}
              </a>
            </li>
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink
              href={whatsappLink("Hola ChokoloMix, me gustaría más información.")}
              variant="light"
              size="lg"
            >
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
  const link = `transition-colors hover:text-gold ${textLink}`;
  return (
    <footer className="bg-wine text-wine-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <a
            href="/"
            className="inline-block rounded-2xl bg-background p-3"
            aria-label="ChokoloMix, ir al inicio"
          >
            <img src={logo.url} alt="" className="h-20 w-auto" loading="lazy" />
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-wine-foreground/80">
            Mezclas de frutos secos y snacks desde Durango, México, para disfrutar y compartir.
          </p>
        </div>
        <FooterCol title="Navegación">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className={link}>
                {n.label}
              </a>
            </li>
          ))}
        </FooterCol>
        <FooterCol title="Productos">
          {PRODUCTS.map((p) => (
            <li key={p.id}>
              <a href="/#productos" className={link}>
                {p.name}
              </a>
            </li>
          ))}
          <li>
            <a href="/#distribucion" className={link}>
              Display y caja master
            </a>
          </li>
        </FooterCol>
        <FooterCol title="Contacto">
          <li>
            <a href={PHONE_TEL} className={link}>
              {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a
              href={whatsappLink("Hola ChokoloMix")}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              WhatsApp{NEW_TAB}
            </a>
          </li>
          <li>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={link}>
              Instagram{NEW_TAB}
            </a>
          </li>
          <li>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={link}>
              Facebook{NEW_TAB}
            </a>
          </li>
          <li className="text-wine-foreground/75">Durango, México</li>
        </FooterCol>
      </div>
      <div className="border-t border-wine-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-wine-foreground/75 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} ChokoloMix — Dulces & Snacks. Todos los derechos
            reservados.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className={`cursor-pointer ${link}`}
                  onClick={() => window.dispatchEvent(new Event("chokolo:cookie-settings"))}
                >
                  Preferencias de cookies
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow font-sans text-gold">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-wine-foreground/85">{children}</ul>
    </div>
  );
}
