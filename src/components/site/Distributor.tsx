import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { CtaLink, SectionHeading, WhatsAppIcon, cta } from "./ui";

const BUSINESS_TYPES = ["Minisúper", "Miscelánea", "Frutería", "Distribuidor", "Otro"] as const;

const schema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(80),
  negocio: z.string().trim().min(2, "Escribe el nombre de tu negocio").max(100),
  ciudad: z.string().trim().min(2, "Escribe tu ciudad").max(60),
  telefono: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{10,18}$/, "Escribe un teléfono válido de 10 dígitos"),
  tipo: z.enum(BUSINESS_TYPES, { errorMap: () => ({ message: "Selecciona un tipo de negocio" }) }),
  mensaje: z.string().trim().max(600, "Máximo 600 caracteres").optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function Distributor() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as keyof Errors] ??= i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const v = parsed.data;
    const msg = [
      "Hola Chokolo Mix, quiero ser distribuidor.",
      `Nombre: ${v.nombre}`,
      `Negocio: ${v.negocio}`,
      `Ciudad: ${v.ciudad}`,
      `Teléfono: ${v.telefono}`,
      `Tipo de negocio: ${v.tipo}`,
      v.mensaje ? `Mensaje: ${v.mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setTimeout(() => setStatus("done"), 700);
  }

  return (
    <section id="distribuidores" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Conviértete en distribuidor" title="¿Te gustaría vender Chokolo Mix?">
            Estamos buscando nuevos socios comerciales que quieran llevar nuestros productos a más
            personas. Si tienes una tienda, negocio o estás interesado en distribuir nuestros snacks,
            queremos conocerte.
          </SectionHeading>
          <div className="reveal mt-9">
            <CtaLink
              href={whatsappLink("Hola Chokolo Mix, quiero ser distribuidor.")}
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon className="size-5" /> Quiero ser distribuidor
            </CtaLink>
          </div>
        </div>

        <div className="reveal rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          {status === "done" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
              <CheckCircle2 className="size-16 text-leaf" />
              <h3 className="mt-6 text-3xl font-extrabold text-wine">¡Gracias por tu interés!</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Abrimos WhatsApp con tus datos listos. Solo envía el mensaje y nuestro equipo se
                pondrá en contacto contigo.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className={cn(cta({ variant: "outline" }), "mt-8")}
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <h3 className="text-2xl font-bold text-wine sm:col-span-2">Solicitud comercial</h3>
              <Field label="Nombre" name="nombre" error={errors.nombre} autoComplete="name" />
              <Field label="Nombre del negocio" name="negocio" error={errors.negocio} autoComplete="organization" />
              <Field label="Ciudad" name="ciudad" error={errors.ciudad} autoComplete="address-level2" />
              <Field label="Número de teléfono" name="telefono" type="tel" error={errors.telefono} autoComplete="tel" />
              <label className="block text-sm font-semibold text-wine sm:col-span-2">
                Tipo de negocio
                <select name="tipo" defaultValue="" className={field} aria-invalid={!!errors.tipo}>
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {errors.tipo && <span className="mt-1 block text-xs text-destructive">{errors.tipo}</span>}
              </label>
              <label className="block text-sm font-semibold text-wine sm:col-span-2">
                Mensaje <span className="font-normal text-muted-foreground">(opcional)</span>
                <textarea name="mensaje" rows={4} maxLength={600} className={field} placeholder="Cuéntanos sobre tu negocio" />
                {errors.mensaje && <span className="mt-1 block text-xs text-destructive">{errors.mensaje}</span>}
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(cta({ size: "lg" }), "sm:col-span-2")}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Enviar solicitud
                  </>
                )}
              </button>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Al enviar se abrirá WhatsApp con tu solicitud lista para mandar.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-wine">
      {label}
      <input name={name} type={type} autoComplete={autoComplete} className={field} aria-invalid={!!error} />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
