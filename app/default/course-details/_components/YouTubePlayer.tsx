"use client";

import React from "react";

export default function YouTubePlayer({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="rounded-2xl border bg-background p-6 text-sm text-muted-foreground">
        Invalid YouTube link
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border bg-black">
      {/* 16:9 */}
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// --- helpers (same file or move to utils) ---
function getYouTubeId(url: string) {
  try {
    const u = new URL(url);

    // youtu.be/{id}
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }

    // watch?v={id}
    const v = u.searchParams.get("v");
    if (v) return v;

    // /embed/{id}, /live/{id}, /shorts/{id}
    const match = u.pathname.match(/\/(embed|live|shorts)\/([^/?&]+)/);
    if (match?.[2]) return match[2];

    return "";
  } catch {
    // fallback for malformed URLs
    const match = url.match(
      /(?:youtu\.be\/|v=|\/(embed|live|shorts)\/)([^?&/]+)/,
    );
    return match?.[2] ?? "";
  }
}
