import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { LEGAL, LEGAL_UPDATED } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Footer } from "./Contact";
import { Header } from "./Header";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}

/** Shared shell for the privacy, terms and cookie pages. */
export function LegalPage({
  title,
  intro,
  current,
  children,
}: {
  title: string;
  intro: ReactNode;
  current: (typeof LEGAL)[number]["to"];
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-7xl px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="Documentos legales" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {LEGAL.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    aria-current={l.to === current ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 text-sm font-semibold transition-colors lg:rounded-xl",
                      l.to === current
                        ? "bg-wine text-wine-foreground"
                        : "text-wine/80 hover:bg-secondary hover:text-wine",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Legal</p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.02] font-extrabold text-balance text-wine md:text-6xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Última actualización: {LEGAL_UPDATED}
            </p>
            <div className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</div>
            <div className="legal mt-12">{children}</div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
