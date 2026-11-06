import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/chokolo_logo.png.asset.json";
import { NAV, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { CtaLink, WhatsAppIcon } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "bg-background/90 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" aria-label="Chokolo Mix — inicio" className="flex items-center">
          <img src={logo.url} alt="Chokolo Mix Dulces & Snacks" className="h-14 w-auto" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-wine/80 transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CtaLink href={whatsappLink("Hola Chokolo Mix, me gustaría hacer un pedido.")} variant="wine">
            <WhatsAppIcon className="size-4" /> Hacer pedido
          </CtaLink>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-wine text-wine-foreground lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Móvil"
          className="h-[calc(100dvh-5rem)] border-t border-border bg-background px-6 pt-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-5 font-display text-3xl font-bold text-wine"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaLink
            href={whatsappLink("Hola Chokolo Mix, me gustaría hacer un pedido.")}
            variant="whatsapp"
            size="lg"
            className="mt-8 w-full"
          >
            <WhatsAppIcon className="size-5" /> Hacer pedido por WhatsApp
          </CtaLink>
        </nav>
      )}
    </header>
  );
}
