import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // Add console logging for debugging
  console.log(`Middleware processing: ${url.pathname}`);
  
  // Allow these paths to be accessible
  if (
    url.pathname === "/" || 
    url.pathname === "/index.html" || 
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/_astro/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/public/") ||
    url.pathname.includes("favicon") ||
    // Allow CSS, JS, and other static assets
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.ico')
  ) {
    console.log(`Allowed: ${url.pathname}`);
    return next();
  }
  
  // Redirect all other paths to the home page
  console.log(`Redirecting: ${url.pathname} -> /`);
  return Response.redirect(new URL("/", context.request.url), 302);
}); 