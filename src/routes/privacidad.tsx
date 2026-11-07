import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Layout";
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/brand";

const TITLE = "Aviso de privacidad — ChokoloMix";
const DESC =
  "Cómo ChokoloMix trata los datos personales que compartes en la solicitud comercial, y cómo ejercer tus derechos ARCO.";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: PrivacyPage,
});

// TODO(cliente): sustituir "el titular del negocio ChokoloMix" por el nombre o
// razón social del responsable y, si existe, añadir un correo para solicitudes ARCO.
function PrivacyPage() {
  const arco = whatsappLink("Hola ChokoloMix, quiero ejercer mis derechos ARCO sobre mis datos.");
  return (
    <LegalPage
      current="/privacidad"
      title="Aviso de privacidad"
      intro={
        <p>
          Este aviso explica qué datos personales recabamos en este sitio, para qué los usamos y
          cómo puedes ejercer tus derechos, conforme a la Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares.
        </p>
      }
    >
      <h2>1. Responsable</h2>
      <p>
        El responsable del tratamiento de tus datos es el titular del negocio ChokoloMix — Dulces
        &amp; Snacks, con domicilio en Durango, Durango, México. Puedes contactarnos por teléfono al{" "}
        <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> o por{" "}
        <a href={arco} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        .
      </p>

      <h2>2. Datos que recabamos</h2>
      <p>Cuando llenas la solicitud comercial nos compartes:</p>
      <ul>
        <li>Nombre.</li>
        <li>Nombre del negocio y tipo de negocio.</li>
        <li>Ciudad.</li>
        <li>Número de teléfono.</li>
        <li>El mensaje que decidas escribir (opcional).</li>
      </ul>
      <p>
        No solicitamos datos personales sensibles, financieros ni patrimoniales. Te pedimos no
        incluir este tipo de información en el mensaje.
      </p>

      <h2>3. Cómo llegan tus datos</h2>
      <p>
        Este sitio no guarda tus datos en ninguna base de datos. Al pulsar «Enviar solicitud», el
        formulario abre WhatsApp con un mensaje ya escrito, y eres tú quien decide enviarlo. A
        partir de ese momento los datos viajan por WhatsApp, un servicio de Meta Platforms sujeto a
        su propia política de privacidad.
      </p>

      <h2>4. Finalidades</h2>
      <h3>Finalidades necesarias</h3>
      <ul>
        <li>Responder tu solicitud para vender o distribuir productos ChokoloMix.</li>
        <li>Contactarte para darte información de productos, presentaciones y condiciones.</li>
        <li>Dar seguimiento a pedidos y a la relación comercial que, en su caso, iniciemos.</li>
      </ul>
      <h3>Finalidades secundarias</h3>
      <p>
        No usamos tus datos para publicidad, perfiles comerciales ni envío de promociones. Si en el
        futuro quisiéramos hacerlo, te pediremos tu consentimiento antes.
      </p>

      <h2>5. Consentimiento</h2>
      <p>
        Al marcar la casilla del formulario y enviar el mensaje por WhatsApp nos das tu
        consentimiento para tratar tus datos con las finalidades necesarias descritas arriba. Puedes
        revocarlo en cualquier momento con el procedimiento del punto 8.
      </p>

      <h2>6. Transferencias</h2>
      <p>
        No vendemos ni transferimos tus datos a terceros. Solo los compartiríamos si una autoridad
        competente lo requiere conforme a la ley.
      </p>

      <h2>7. Datos técnicos y cookies</h2>
      <p>
        Como cualquier sitio web, el servidor que aloja esta página registra datos técnicos
        (dirección IP, navegador, fecha y hora de visita) para su funcionamiento y seguridad. No
        usamos cookies de publicidad ni de análisis. Consulta la{" "}
        <Link to="/cookies">Política de cookies</Link>.
      </p>

      <h2>8. Derechos ARCO y revocación</h2>
      <p>
        Tienes derecho a Acceder a tus datos, Rectificarlos, Cancelarlos u Oponerte a su uso
        (derechos ARCO), así como a revocar tu consentimiento. Para ejercerlos envíanos tu solicitud
        por{" "}
        <a href={arco} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        o llámanos al <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>, indicando:
      </p>
      <ul>
        <li>Tu nombre y un medio para responderte.</li>
        <li>El derecho que quieres ejercer y los datos a los que se refiere.</li>
        <li>Un documento que acredite tu identidad o la de tu representante.</li>
      </ul>
      <p>
        Te responderemos en un plazo máximo de 20 días hábiles y, si procede, haremos efectivo el
        cambio dentro de los 15 días hábiles siguientes. Si consideras que tu derecho no fue
        atendido, puedes acudir a la autoridad de protección de datos personales competente.
      </p>

      <h2>9. Conservación</h2>
      <p>
        Conservamos tus datos mientras dure la relación comercial y el tiempo que exijan las
        obligaciones legales aplicables. Después los eliminamos de nuestros registros.
      </p>

      <h2>10. Cambios a este aviso</h2>
      <p>
        Publicaremos cualquier cambio en esta misma página, con su fecha de actualización al inicio.
      </p>
    </LegalPage>
  );
}
