"use client";

import React, { useMemo } from "react";
import CustomVideoPlayer from "./CustomVideoPlayer";
import YouTubePlayer from "./YouTubePlayer";

function isValidHttpUrl(url?: string) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isYouTubeUrl(url?: string) {
  if (!url) return false;
  return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

const isGoogleDriveUrl = (url?: string) => {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    return (
      hostname.includes("drive.google.com") ||
      hostname.includes("docs.google.com")
    );
  } catch {
    return false;
  }
};

function isDirectVideo(url?: string) {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".ogg") ||
    url.includes(".m3u8")
  );
}

function toDrivePreview(url: string) {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (!match) return url;
  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function toGoogleViewer(url: string) {
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    url
  )}`;
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
    if (!isValidHttpUrl(url)) return "invalid";
    if (isYouTubeUrl(url)) return "youtube";
    if (isGoogleDriveUrl(url)) return "drive";
    if (isDirectVideo(url)) return "native";
    return "iframe"; // 🔥 Anything else goes iframe
  }, [url]);

  if (mode === "empty") {
    return (
      <div className="rounded-2xl border bg-background p-6 text-sm text-muted-foreground">
        No video URL found.
      </div>
    );
  }

  if (mode === "invalid") {
    return (
      <div className="rounded-2xl border bg-background p-6 text-sm text-red-500">
        Invalid video URL.
      </div>
    );
  }

  if (mode === "youtube") {
    return <YouTubePlayer url={url} title={title} />;
  }

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
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (mode === "native") {
    return (
      <CustomVideoPlayer
        src={url}
        poster={
          poster ||
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Default Courses.png"
        }
        onProgress={onProgress}
        onEnded={onEnded}
      />
    );
  }

  // ✅ Fallback → iframe
  return (
    <div className="rounded-2xl border bg-black overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          src={url}
          className="w-full h-full"
          title={title || "Embedded content"}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
