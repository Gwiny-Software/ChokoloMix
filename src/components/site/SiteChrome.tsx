import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Cookie } from "lucide-react";
import { whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { WhatsAppIcon, cta } from "./ui";

const CONSENT_KEY = "chokolo-cookie-notice";
const CONSENT_VERSION = 1;
export const COOKIE_SETTINGS_EVENT = "chokolo:cookie-settings";

function readConsent(): boolean {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const v = JSON.parse(raw) as { v?: number };
    return v.v === CONSENT_VERSION;
  } catch {
    return false;
  }
}

function saveConsent() {
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ v: CONSENT_VERSION, choice: "necessary", at: new Date().toISOString() }),
    );
  } catch {
    // Storage blocked (private mode): the notice simply shows again next visit.
  }
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Progress bar, back-to-top, WhatsApp button and cookie notice shared by every page. */
export function SiteChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerH, setBannerH] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Mark that JS runs so image fade-ins may start hidden.
  useEffect(() => {
    document.documentElement.dataset["js"] = "";
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setShowTop(y > 700);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setBannerOpen(!readConsent());
    const reopen = () => setBannerOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  // Keep the floating buttons above the notice while it is open.
  useEffect(() => {
    const el = bannerRef.current;
    if (!bannerOpen || !el) {
      setBannerH(0);
      return;
    }
    const ro = new ResizeObserver(() => setBannerH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [bannerOpen]);

  function toTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("header a[href='/']")?.focus({ preventScroll: true });
  }

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
        <div
          className="scroll-progress h-full bg-primary"
          style={{ ["--progress" as string]: progress }}
        />
      </div>

      <div
        className="fixed right-5 z-40 flex flex-col items-center gap-3 transition-[bottom] duration-200"
        style={{ bottom: `calc(1.25rem + ${bannerH}px)` }}
      >
        <button
          type="button"
          onClick={toTop}
          aria-label="Volver arriba"
          tabIndex={showTop ? 0 : -1}
          aria-hidden={!showTop}
          className={cn(
            "grid size-12 place-items-center rounded-full border border-wine/15 bg-card text-wine shadow-soft transition-[opacity,transform,background-color,color] duration-200 hover:bg-wine hover:text-wine-foreground active:scale-95",
            showTop ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          <ArrowUp className="size-5" aria-hidden />
        </button>
        <a
          href={whatsappLink("Hola ChokoloMix, me gustaría más información.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
          className="grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          <WhatsAppIcon className="size-7" />
        </a>
      </div>

      {bannerOpen && (
        <div
          ref={bannerRef}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:right-auto sm:bottom-4 sm:left-4 sm:max-w-md sm:p-0 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-soft">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-wine">
              <Cookie className="size-5 text-primary" aria-hidden /> Cookies
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Este sitio no usa cookies de publicidad ni de análisis. Solo guardamos en tu navegador
              que ya viste este aviso. Más detalles en la{" "}
              <Link
                to="/cookies"
                className="font-semibold text-primary underline underline-offset-2"
              >
                Política de cookies
              </Link>
              .
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className={cn(cta({ variant: "wine" }), "flex-1 sm:flex-none")}
                onClick={() => {
                  saveConsent();
                  setBannerOpen(false);
                }}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
