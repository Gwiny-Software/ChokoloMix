import { cva, type VariantProps } from "class-variance-authority";
import {
  useCallback,
  useState,
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
  type SVGProps,
} from "react";
import { cn } from "@/lib/utils";

// Buttons step up 1px on hover and sink with a slight scale on press.
// Hover only applies to fine pointers so touch screens don't keep a stuck state.
export const cta = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-center font-semibold transition-[transform,background-color,border-color,color,filter,box-shadow] duration-200 ease-[cubic-bezier(.2,.8,.2,1)] [@media(hover:hover)]:hover:-translate-y-px active:translate-y-px active:scale-[.985] active:duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-lift hover:brightness-110",
        wine: "bg-wine text-wine-foreground hover:bg-primary",
        outline:
          "border border-foreground/20 text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary",
        light: "bg-wine-foreground text-wine hover:bg-gold",
        ghostLight:
          "border border-wine-foreground/30 text-wine-foreground hover:border-wine-foreground/60 hover:bg-wine-foreground/10",
        whatsapp: "bg-whatsapp text-whatsapp-foreground hover:brightness-110",
      },
      size: {
        md: "px-5 py-2.5 text-sm",
        lg: "min-h-13 px-7 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof cta>;

export function CtaLink({ className, variant, size, children, ...props }: CtaProps) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(cta({ variant, size }), className)}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
    </a>
  );
}

/** Link look used in running text and footers: an underline that draws on hover. */
export const textLink =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-200 hover:bg-[length:100%_1px]";

/** An <img> that fades in once its file has loaded. */
export function Photo({ className, onLoad, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const ref = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <img
      ref={ref}
      decoding="async"
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn("img-load", loaded && "is-loaded", className)}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  light,
  center,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow", light ? "text-gold" : "text-primary")}>{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          "mt-4 text-[2.5rem] leading-[1.02] font-extrabold text-balance md:text-6xl",
          light ? "text-wine-foreground" : "text-wine",
        )}
      >
        {title}
      </h2>
      {children && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            light ? "text-wine-foreground/80" : "text-muted-foreground",
          )}
        >
          {children}
        </p>
      )}
    </div>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.42 1.32-1.96 1.37-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.1.2-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.62-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}
