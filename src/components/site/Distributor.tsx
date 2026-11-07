import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { CtaLink, SectionHeading, WhatsAppIcon, cta } from "./ui";

export const BUSINESS_TYPES = [
  "Minisúper",
  "Miscelánea",
  "Frutería",
  "Tienda de Conveniencia",
  "Dulcería",
  "Distribuidor",
  "Otro",
] as const;

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
  privacidad: z.literal("si", {
    errorMap: () => ({ message: "Necesitamos tu consentimiento para contactarte" }),
  }),
});

const FIELD_ORDER = [
  "nombre",
  "negocio",
  "ciudad",
  "telefono",
  "tipo",
  "mensaje",
  "privacidad",
] as const;

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-150 hover:border-wine/40 focus:border-primary focus:ring-[3px] focus:ring-primary/20 focus:outline-none aria-[invalid=true]:border-destructive";

export function Distributor() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as keyof Errors] ??= i.message;
      });
      setErrors(errs);
      // Move keyboard and screen-reader focus to the first field with an error.
      const first = FIELD_ORDER.find((k) => errs[k]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    const v = parsed.data;
    const msg = [
      "Hola ChokoloMix, quiero ser distribuidor.",
      `Nombre: ${v.nombre}`,
      `Negocio: ${v.negocio}`,
      `Ciudad: ${v.ciudad}`,
      `Teléfono: ${v.telefono}`,
      `Tipo de negocio: ${v.tipo}`,
      v.mensaje ? `Mensaje: ${v.mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    // The text is URL-encoded and handed to WhatsApp; nothing is stored or
    // rendered as HTML on this site.
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 700);
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section id="distribuidores" aria-labelledby="distribuidores-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            id="distribuidores-title"
            eyebrow="Conviértete en distribuidor"
            title="¿Te gustaría vender ChokoloMix?"
          >
            Estamos buscando nuevos socios comerciales que quieran llevar nuestros productos a más
            personas. Si tienes una tienda, negocio o estás interesado en distribuir nuestros
            snacks, queremos conocerte.
          </SectionHeading>
          <div className="mt-9">
            <CtaLink
              href={whatsappLink("Hola ChokoloMix, quiero ser distribuidor.")}
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
            >
              <WhatsAppIcon className="size-5" /> Quiero ser distribuidor
            </CtaLink>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          {status === "done" ? (
            <div
              className="flex min-h-[420px] flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300"
              role="status"
            >
              <CheckCircle2 className="size-16 text-leaf" aria-hidden />
              <h3 ref={doneRef} tabIndex={-1} className="mt-6 text-3xl font-extrabold text-wine">
                ¡Gracias por tu interés!
              </h3>
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
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              aria-labelledby="form-title"
              className="grid gap-5 sm:grid-cols-2"
            >
              <h3 id="form-title" className="text-2xl font-bold text-wine sm:col-span-2">
                Solicitud comercial
              </h3>
              <p className="-mt-2 text-sm text-muted-foreground sm:col-span-2">
                Los campos marcados con <span aria-hidden>*</span>
                <span className="sr-only">asterisco</span> son obligatorios.
              </p>
              <p role="alert" className="sr-only">
                {errorCount > 0
                  ? `Revisa ${errorCount === 1 ? "1 campo" : `${errorCount} campos`} del formulario.`
                  : ""}
              </p>
              <Field label="Nombre" name="nombre" error={errors.nombre} autoComplete="name" />
              <Field
                label="Nombre del negocio"
                name="negocio"
                error={errors.negocio}
                autoComplete="organization"
              />
              <Field
                label="Ciudad"
                name="ciudad"
                error={errors.ciudad}
                autoComplete="address-level2"
              />
              <Field
                label="Número de teléfono"
                name="telefono"
                type="tel"
                inputMode="tel"
                error={errors.telefono}
                autoComplete="tel"
                hint="10 dígitos, por ejemplo 618 123 45 67"
              />
              <Control
                label="Tipo de negocio"
                error={errors.tipo}
                required
                className="sm:col-span-2"
              >
                {(p) => (
                  <select name="tipo" defaultValue="" className={field} {...p}>
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                )}
              </Control>
              <Control label="Mensaje" optional error={errors.mensaje} className="sm:col-span-2">
                {(p) => (
                  <textarea
                    name="mensaje"
                    rows={4}
                    maxLength={600}
                    className={field}
                    placeholder="Cuéntanos sobre tu negocio"
                    {...p}
                  />
                )}
              </Control>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground">
                  <input
                    type="checkbox"
                    name="privacidad"
                    value="si"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.privacidad}
                    aria-describedby={errors.privacidad ? "privacidad-error" : undefined}
                    className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-primary"
                  />
                  <span>
                    He leído el{" "}
                    <Link
                      to="/privacidad"
                      target="_blank"
                      className="font-semibold text-primary underline underline-offset-2 hover:text-wine"
                    >
                      Aviso de privacidad
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </Link>{" "}
                    y acepto que ChokoloMix use estos datos para responder a mi solicitud comercial.{" "}
                    <span aria-hidden>*</span>
                  </span>
                </label>
                {errors.privacidad && (
                  <p id="privacidad-error" className="mt-1 text-sm font-medium text-destructive">
                    {errors.privacidad}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
                className={cn(cta({ size: "lg" }), "sm:col-span-2")}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> Abriendo WhatsApp…
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden /> Enviar solicitud
                  </>
                )}
              </button>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Al enviar se abrirá WhatsApp con tu solicitud lista para mandar. Este sitio no
                guarda tus datos; WhatsApp es un servicio de Meta con su propia política de
                privacidad.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type ControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  required?: boolean;
};

function Control({
  label,
  error,
  hint,
  required,
  optional,
  className,
  children,
}: {
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-wine">
        {label}
        {required && <span aria-hidden> *</span>}
        {optional && <span className="font-normal text-muted-foreground"> (opcional)</span>}
      </label>
      {children({
        id,
        "aria-invalid": !!error,
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        ...(required ? { required: true, "aria-required": true } : {}),
      })}
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  error,
  hint,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  hint?: string;
  type?: string;
  inputMode?: "tel" | "text" | undefined;
  autoComplete?: string;
}) {
  return (
    <Control label={label} error={error} hint={hint} required>
      {(p) => (
        <input
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={field}
          {...p}
        />
      )}
    </Control>
  );
}
