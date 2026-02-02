import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // important (pdf/image fetch is easier on node)

const ALLOWED_HOSTS = new Set([
  "upload-community-files-new.s3.ap-south-1.amazonaws.com",
  // add other allowed hosts if needed
]);

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.host)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  const res = await fetch(url, {
    cache: "no-store",
    // optional: pass headers if needed
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Upstream fetch failed", status: res.status },
      { status: 502 }
    );
  }

  const bytes = await res.arrayBuffer();

  // Some S3 objects may return odd content-types. Default safely.
  const contentType = res.headers.get("content-type") || "image/jpeg";

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
      // ✅ Makes it usable by canvas/pdf renderers
      "Access-Control-Allow-Origin": "*",
    },
  });
}
