import { canonical } from "@/lib/brand";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Layout";
import { COOKIE_SETTINGS_EVENT } from "@/components/site/SiteChrome";
import { cta } from "@/components/site/ui";

const TITLE = "Política de cookies — ChokoloMix";
const DESC = "Qué cookies y almacenamiento local usa el sitio de ChokoloMix y cómo gestionarlos.";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    links: canonical("/cookies").links,
    meta: [
      ...canonical("/cookies").meta,
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      current="/cookies"
      title="Política de cookies"
      intro={
        <p>
          Las cookies y el almacenamiento local son pequeños archivos que un sitio guarda en tu
          navegador. Este sitio usa lo mínimo indispensable y nada para publicidad ni análisis.
        </p>
      }
    >
      <h2>1. Qué usamos</h2>
      <div className="table-wrap">
        <table>
          <caption className="sr-only">Almacenamiento que usa el sitio</caption>
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Para qué</th>
              <th scope="col">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>chokolo-cookie-notice</code>
              </td>
              <td>Almacenamiento local, propio, necesario</td>
              <td>Recordar que ya viste el aviso de cookies para no mostrarlo en cada visita.</td>
              <td>Hasta que lo borres</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        El proveedor de alojamiento del sitio puede usar cookies técnicas estrictamente necesarias
        para proteger el servidor frente a tráfico malicioso. No sirven para identificarte ni para
        publicidad.
      </p>

      <h2>2. Lo que no usamos</h2>
      <ul>
        <li>Cookies de análisis o estadísticas (como Google Analytics).</li>
        <li>Cookies de publicidad o píxeles de redes sociales (como el píxel de Meta).</li>
        <li>
          Contenido incrustado de terceros. Las tipografías se sirven desde nuestro propio servidor.
        </li>
      </ul>

      <h2>3. ¿Necesitamos tu consentimiento?</h2>
      <p>
        El almacenamiento que usamos es estrictamente necesario para que el sitio funcione, por lo
        que no requiere tu consentimiento; aun así te lo informamos con el aviso de cookies. Si en
        el futuro añadimos cookies de análisis o publicidad, te pediremos permiso antes de
        activarlas y actualizaremos esta página.
      </p>

      <h2>4. Servicios de terceros</h2>
      <p>
        Al pulsar un enlace a WhatsApp, Instagram o Facebook sales de este sitio. Esos servicios
        pueden usar sus propias cookies según sus políticas, que puedes consultar en cada uno.
      </p>

      <h2>5. Cómo gestionarlas</h2>
      <p>
        Puedes borrar o bloquear las cookies y el almacenamiento local desde la configuración de tu
        navegador. Si lo haces, el aviso de cookies volverá a aparecer. También puedes volver a ver
        el aviso ahora:
      </p>
      <p>
        <button
          type="button"
          className={cta({ variant: "outline" })}
          onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
        >
          Ver aviso de cookies
        </button>
      </p>
      <p>
        Más información sobre tus datos en el <Link to="/privacidad">Aviso de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
