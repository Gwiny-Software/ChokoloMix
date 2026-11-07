import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/chokolo_logo.png.asset.json";
import { NAV, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { CtaLink, WhatsAppIcon } from "./ui";

const ORDER_MSG = "Hola ChokoloMix, me gustaría hacer un pedido.";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // While the menu is open: lock page scroll, close on Escape or when the
  // viewport grows to desktop, and keep Tab focus inside the menu.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(
        Boolean,
      ) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled || open ? "bg-background/95 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <a
        href="#contenido"
        className="sr-only rounded-full bg-wine px-5 py-3 font-semibold text-wine-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="/" aria-label="ChokoloMix, ir al inicio" className="flex items-center rounded-lg">
          <img src={logo.url} alt="" className="h-12 w-auto sm:h-14" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative py-1 text-sm font-semibold text-wine/80 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:text-primary hover:after:scale-x-100"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CtaLink href={whatsappLink(ORDER_MSG)} variant="wine">
            <WhatsAppIcon className="size-4" /> Hacer pedido
          </CtaLink>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="grid size-11 place-items-center rounded-full bg-wine text-wine-foreground transition-[background-color,transform] duration-150 hover:bg-primary active:scale-95 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      <div
        ref={panelRef}
        id="menu-movil"
        hidden={!open}
        className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background px-6 pt-4 pb-10 lg:hidden"
      >
        <nav aria-label="Menú móvil">
          <ul className="flex flex-col">
            {NAV.map((n, i) => (
              <li
                key={n.href}
                className="animate-in fade-in slide-in-from-top-1 fill-mode-both duration-300"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-5 font-display text-3xl font-bold text-wine transition-colors hover:text-primary"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaLink
            href={whatsappLink(ORDER_MSG)}
            variant="whatsapp"
            size="lg"
            className="mt-8 w-full"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon className="size-5" /> Hacer pedido por WhatsApp
          </CtaLink>
        </nav>
      </div>
    </header>
  );
}
