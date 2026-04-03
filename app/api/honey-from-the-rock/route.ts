import { NextResponse } from "next/server";

// This route proxies requests to a configured backend.
// It does NOT serve any local dummy data.
export async function GET(request: Request) {
  try {
    const { NEXT_PUBLIC_BASE_URL } = process.env as any;
    const url = new URL(request.url);
    const search = url.search;

    const backendBase = NEXT_PUBLIC_BASE_URL || null;
    if (!backendBase) {
      return NextResponse.json(
        { error: "Backend base URL not configured (NEXT_PUBLIC_BASE_URL)" },
        { status: 502 },
      );
    }

    const base = backendBase.replace(/\/$/, "");

    const candidates = [
      `${base}/honey-from-the-rock${search}`,
      `${base}/honey-from-the-rocks${search}`,
      `${base}/hftr${search}`,
      // try removing common /api/v1 prefix if present
      `${base.replace(/\/api\/v\d+$/, "")}/honey-from-the-rock${search}`,
    ];

    const attempts: Array<{ url: string; ok?: boolean; status?: number; error?: string }> = [];
    for (const target of candidates) {
      try {
        const resp = await fetch(target, {
          method: "GET",
          headers: { accept: "application/json" },
        });

        attempts.push({ url: target, ok: resp.ok, status: resp.status });

        if (resp.ok) {
          const text = await resp.text();
          return new NextResponse(text, {
            status: resp.status,
            headers: { "content-type": resp.headers.get("content-type") || "application/json" },
          });
        }
        // try next candidate on non-ok
      } catch (e: any) {
        attempts.push({ url: target, error: String(e?.message ?? e) });
        console.warn("HFTR proxy candidate failed:", target, e);
      }
    }

    // no successful candidate — return diagnostic JSON to the client
    return NextResponse.json(
      { error: "No matching backend endpoint found", attempts },
      { status: 502 },
    );
  } catch (err) {
    console.error("HFTR proxy error", err);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
