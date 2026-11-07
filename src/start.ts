import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

import { renderErrorPage } from "./lib/error-page";
import { buildCsp, createNonce } from "./lib/security-headers";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// A fresh nonce per request: the router stamps it on its own inline scripts and
// the CSP only lets scripts with that nonce (or from this origin) run.
// Dev keeps no CSP so Vite's HMR and the Lovable preview tooling keep working.
const securityMiddleware = createMiddleware().server(async ({ next }) => {
  const nonce = createNonce();
  if (import.meta.env.PROD) {
    setResponseHeader("Content-Security-Policy", buildCsp(nonce));
  }
  return next({ context: { nonce } });
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, securityMiddleware, csrfMiddleware],
}));
