async function serve(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "www.kjzyz.com") {
    url.hostname = "kjzyz.com";
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  if (/^\/ai-subscription-guide(?:\.html)?\/?$/.test(url.pathname)) {
    return new Response("文章已删除", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // The previous deployment published these files. Older edge caches may still hold them.
  const path = url.pathname.replace(/%([a-f0-9]{2})/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  if (/^\/(?:README\.md|wrangler\.toml|\.gitignore|tests|functions)(?:\/|$)/i.test(path)) {
    const page = await context.env.ASSETS.fetch(new URL("/404.html", url));
    return new Response(context.request.method === "HEAD" ? null : page.body, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  return context.next();
}

export async function onRequest(context) {
  const original = await serve(context);
  const response = new Response(original.body, original);
  response.headers.set("Strict-Transport-Security", "max-age=2592000");
  response.headers.set("Content-Security-Policy", "frame-ancestors 'none'");
  response.headers.set("Content-Security-Policy-Report-Only", [
    "default-src 'self'",
    "script-src 'self' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://cdn.simpleicons.org",
    "connect-src 'self' https://cloudflareinsights.com",
    "object-src 'none'",
    "base-uri 'self'",
    "report-uri /csp-report",
  ].join("; "));
  return response;
}
