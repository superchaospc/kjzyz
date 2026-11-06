export async function onRequest(context) {
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

  return context.next();
}
