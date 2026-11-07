import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Layout";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/brand";

const TITLE = "Términos y condiciones — ChokoloMix";
const DESC =
  "Condiciones de uso del sitio web de ChokoloMix, pedidos, propiedad intelectual y alérgenos.";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      current="/terminos"
      title="Términos y condiciones"
      intro={
        <p>
          Al usar este sitio aceptas estas condiciones. Si no estás de acuerdo con ellas, te pedimos
          no utilizarlo.
        </p>
      }
    >
      <h2>1. Quiénes somos</h2>
      <p>
        ChokoloMix — Dulces &amp; Snacks es un negocio de Durango, México, que elabora y distribuye
        mezclas de frutos secos y snacks. Puedes contactarnos al{" "}
        <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
      </p>

      <h2>2. Uso del sitio</h2>
      <p>
        Este sitio es informativo: presenta nuestros productos, canales de distribución y una forma
        de contactarnos. Te comprometes a usarlo de forma lícita, a no intentar dañarlo, alterarlo
        ni acceder a partes no públicas, y a no enviar información falsa o de terceros sin su
        autorización.
      </p>

      <h2>3. Productos, pedidos y precios</h2>
      <p>
        Las imágenes y descripciones son ilustrativas; la presentación del empaque puede variar. En
        este sitio no se realizan compras ni pagos. Los pedidos, precios, existencias, entregas y
        condiciones comerciales se acuerdan directamente con ChokoloMix por WhatsApp o teléfono, y
        solo son válidos cuando los confirmamos.
      </p>

      <h2>4. Alérgenos</h2>
      <p>
        Nuestras mezclas contienen frutos secos (nuez y almendra) y algunas contienen cacahuate y
        dulces de chocolate. Si tienes alguna alergia o intolerancia, revisa siempre la etiqueta del
        empaque antes de consumirlas.
      </p>

      <h2>5. Propiedad intelectual</h2>
      <p>
        La marca ChokoloMix, el logotipo, el personaje del osito Chokolo, las fotografías, los
        textos y el diseño de este sitio pertenecen a ChokoloMix o se usan con autorización de sus
        titulares. No puedes copiarlos, modificarlos ni usarlos con fines comerciales sin nuestro
        permiso por escrito. Los distribuidores autorizados pueden usar las imágenes de producto
        para promocionar ChokoloMix, previo acuerdo con nosotros.
      </p>
      <p>
        Instagram, Facebook y WhatsApp son marcas de Meta Platforms, Inc.; aparecen solo para
        indicar dónde encontrarnos. Las tipografías Bricolage Grotesque y Manrope se usan bajo la
        licencia SIL Open Font License 1.1.
      </p>

      <h2>6. Enlaces a terceros</h2>
      <p>
        Los enlaces a WhatsApp, Instagram y Facebook te llevan a servicios de terceros con sus
        propias condiciones y políticas de privacidad, de las que ChokoloMix no es responsable.
      </p>

      <h2>7. Responsabilidad</h2>
      <p>
        Procuramos que la información del sitio sea correcta y esté actualizada, pero puede contener
        errores o cambiar sin previo aviso. No garantizamos que el sitio esté disponible sin
        interrupciones.
      </p>

      <h2>8. Datos personales</h2>
      <p>
        El tratamiento de los datos que compartes se rige por el{" "}
        <Link to="/privacidad">Aviso de privacidad</Link> y la{" "}
        <Link to="/cookies">Política de cookies</Link>.
      </p>

      <h2>9. Ley aplicable</h2>
      <p>
        Estas condiciones se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier
        controversia, las partes se someten a los tribunales competentes de Durango, Durango, sin
        perjuicio de los derechos que te reconoce la Ley Federal de Protección al Consumidor.
      </p>

      <h2>10. Cambios</h2>
      <p>
        Podemos actualizar estas condiciones. La versión vigente es siempre la publicada en esta
        página.
      </p>
    </LegalPage>
  );
}
