# ChokoloMix — Dulces & Snacks

Sitio web de **ChokoloMix**, mezclas de frutos secos y snacks de Durango, México:
Mix Natural, Mix Tropical y Mix Enchilado en bolsa resellable de 43 g.

El sitio presenta los productos y los canales de distribución, y recibe solicitudes de
distribuidores que se envían por WhatsApp. No guarda datos de los visitantes.

## Tecnología

- [TanStack Start](https://tanstack.com/start) (React 19, renderizado en servidor) con rutas por archivo
- Tailwind CSS 4
- Zod para validar el formulario
- Tipografías autoalojadas (Bricolage Grotesque y Manrope, licencia OFL)
- Despliegue en Cloudflare Workers mediante Nitro

## Desarrollo local

Requiere [Bun](https://bun.sh) (o Node.js 20+ con npm).

```sh
bun install
bun run dev        # servidor de desarrollo
bun run build      # build de producción en .output/
bun run test       # pruebas (Vitest)
bun run lint       # ESLint + Prettier
```

## Estructura

```
src/
  routes/              Páginas (/, /privacidad, /terminos, /cookies)
  components/site/     Secciones del sitio, encabezado, pie, banner de cookies
  lib/brand.ts         Datos de la marca: teléfono, redes, productos, menú
  lib/security-headers.ts  Cabeceras de seguridad y CSP
  start.ts             Middleware: errores, CSP con nonce, CSRF
  styles.css           Tema, tipografías y animaciones
```

Para cambiar teléfono, redes sociales, productos o el menú, edita `src/lib/brand.ts`.

## Seguridad

Cada respuesta incluye Content-Security-Policy con nonce por petición, `X-Content-Type-Options:
nosniff`, protección contra clickjacking (`frame-ancestors`), HSTS, Referrer-Policy y
Permissions-Policy. La CSP solo se aplica en producción.

## Legal

- Aviso de privacidad: `/privacidad`
- Términos y condiciones: `/terminos`
- Política de cookies: `/cookies`

---

© ChokoloMix — Dulces & Snacks. Todos los derechos reservados. La marca, el logotipo, el osito
Chokolo y las fotografías son propiedad de ChokoloMix.
