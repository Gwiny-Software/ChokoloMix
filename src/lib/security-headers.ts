/**
 * HTTP security headers for every response the server renders.
 *
 * - CSP blocks injected scripts (XSS) — only same-origin scripts and inline
 *   scripts carrying the per-request nonce run.
 * - frame-ancestors / X-Frame-Options block clickjacking. The Lovable editor is
 *   the only outside origin allowed to frame the site.
 * - nosniff blocks MIME sniffing.
 */

const FRAME_ANCESTORS = "'self' https://lovable.dev https://*.lovable.dev";

export function buildCsp(nonce?: string): string {
  const script = nonce ? `'self' 'nonce-${nonce}'` : "'self'";
  return [
    "default-src 'self'",
    `script-src ${script}`,
    // React and Radix set inline style attributes; styles cannot run code.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${FRAME_ANCESTORS}`,
    "upgrade-insecure-requests",
  ].join("; ");
}

export const STATIC_SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

export function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/** Adds the static headers (and a nonce-less CSP if none was set) to a response. */
export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(STATIC_SECURITY_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v);
  }
  // Dev serves Vite's inline HMR scripts, so the CSP only applies to production builds.
  if (import.meta.env.PROD && !headers.has("Content-Security-Policy"))
    headers.set("Content-Security-Policy", buildCsp());
  headers.delete("X-Powered-By");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
