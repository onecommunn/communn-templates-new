"use client";

import React, { useMemo } from "react";
import CustomVideoPlayer from "./CustomVideoPlayer";
import YouTubePlayer from "./YouTubePlayer";

function isYouTubeUrl(url?: string) {
  if (!url) return false;
  return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

// ✅ Your helper (slightly extended but same logic)
const isGoogleDriveUrl = (url?: string) => {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    return hostname.includes("drive.google.com") || hostname.includes("docs.google.com");
  } catch {
    return false;
  }
};

// Converts "file/d/<id>/view" -> "file/d/<id>/preview"
function toDrivePreview(url: string) {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (!match) return url;
  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// Optional fallback for google docs viewer (for non-drive direct pdf links)
function toGoogleViewer(url: string) {
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
}

export default function CourseContentPlayer({
  url,
  poster,
  title,
  onProgress,
  onEnded,
}: {
  url: string;
  poster?: string;
  title?: string;
  onProgress?: (cur: number, dur: number) => void;
  onEnded?: () => void;
}) {
  const mode = useMemo(() => {
    if (!url) return "empty";
    if (isYouTubeUrl(url)) return "youtube";
    if (isGoogleDriveUrl(url)) return "drive";
    return "native";
  }, [url]);

  if (mode === "empty") {
    return (
      <div className="rounded-2xl border bg-background p-6 text-sm text-muted-foreground">
        No video URL found.
      </div>
    );
  }

  // ✅ YouTube
  if (mode === "youtube") {
    return <YouTubePlayer url={url} title={title} />;
  }

  // ✅ Google Drive/Docs (PDF or Drive-hosted video)
  // Best reliability: iframe preview
  if (mode === "drive") {
    const iframeSrc =
      url.includes("/file/d/") ? toDrivePreview(url) : toGoogleViewer(url);

    return (
      <div className="rounded-2xl border bg-black overflow-hidden">
        <div className="aspect-video w-full">
          <iframe
            src={iframeSrc}
            className="w-full h-full"
            title={title || "Google Drive content"}
            allow="autoplay; fullscreen"
          />
        </div>
      </div>
    );
  }

  // ✅ MP4 / HLS / normal direct video URLs
  return (
    <CustomVideoPlayer
      src={url}
      poster={poster || "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Default Courses.png"}
      onProgress={onProgress}
      onEnded={onEnded}
    />
  );
}
