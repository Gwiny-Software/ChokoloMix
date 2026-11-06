import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

export const cta = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-lift hover:-translate-y-0.5 hover:brightness-110",
        wine: "bg-wine text-wine-foreground hover:-translate-y-0.5 hover:bg-primary",
        outline:
          "border border-foreground/20 text-foreground hover:border-primary hover:text-primary",
        light: "bg-wine-foreground text-wine hover:-translate-y-0.5 hover:bg-gold",
        ghostLight:
          "border border-wine-foreground/30 text-wine-foreground hover:bg-wine-foreground/10",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground hover:-translate-y-0.5 hover:brightness-110",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base py-3.5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof cta>;

export function CtaLink({ className, variant, size, ...props }: CtaProps) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(cta({ variant, size }), className)}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  light,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("reveal max-w-2xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow", light ? "text-gold" : "text-primary")}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 text-4xl font-extrabold leading-[1.02] md:text-6xl",
          light ? "text-wine-foreground" : "text-wine",
        )}
      >
        {title}
      </h2>
      {children && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            light ? "text-wine-foreground/75" : "text-muted-foreground",
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.42 1.32-1.96 1.37-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.1.2-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.62-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}
