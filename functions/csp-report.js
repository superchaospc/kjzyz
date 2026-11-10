// Keep only the directive and source category. URLs and samples can contain private data.
export async function onRequestPost({ request }) {
  const type = request.headers.get("Content-Type")?.split(";")[0];
  if (type !== "application/csp-report") return new Response(null, { status: 415 });
  const size = Number(request.headers.get("Content-Length"));
  if (size <= 0 || size > 8192) return new Response(null, { status: 413 });
  try {
    const report = (await request.json())["csp-report"];
    const directive = report?.["effective-directive"];
    if (typeof directive === "string" && /^[a-z-]{1,40}$/.test(directive)) {
      const blocked = report["blocked-uri"];
      const category = ["inline", "eval", "self", "data"].includes(blocked) ? blocked : "resource";
      console.warn("CSP report-only", directive, category);
    }
  } catch {
    return new Response(null, { status: 400 });
  }
  return new Response(null, { status: 204 });
}
