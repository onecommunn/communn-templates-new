"use client";

import Hls from "hls.js";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Settings,
} from "lucide-react";

type Props = {
  src: string; // .mp4 or .m3u8
  poster?: string;
  onProgress?: (current: number, duration: number) => void;
  onEnded?: () => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatTime(sec: number) {
  if (!Number.isFinite(sec)) return "0:00";
  const s = Math.floor(sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function CustomVideoPlayer({
  src,
  poster,
  onProgress,
  onEnded,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  // ✅ NEW: only enable keyboard shortcuts when player is active (hover/focus)
  const [shortcutsEnabled, setShortcutsEnabled] = useState(false);

  const isHls = useMemo(() => src.includes(".m3u8"), [src]);

  // attach video source (HLS or MP4)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setReady(false);
    setCurrent(0);
    setDuration(0);
    setBufferedEnd(0);

    let hls: Hls | null = null;

    if (isHls) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else {
        video.src = src;
      }
    } else {
      video.src = src;
    }

    const onLoaded = () => {
      setDuration(video.duration || 0);
      setReady(true);
    };

    const onTime = () => {
      const c = video.currentTime || 0;
      const d = video.duration || 0;
      setCurrent(c);

      const b = video.buffered;
      if (b?.length) setBufferedEnd(b.end(b.length - 1));

      onProgress?.(c, d);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      onEnded?.();
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnd);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnd);
      hls?.destroy();
    };
  }, [src, isHls, onProgress, onEnded]);

  // sync volume/mute/rate
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.volume = clamp(volume, 0, 1);
  }, [muted, volume]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = playbackRate;
  }, [playbackRate]);

  // fullscreen state
  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // auto-hide controls
  useEffect(() => {
    if (isDragging) return;

    let t: any;
    if (playing) {
      t = setTimeout(() => setShowControls(false), 1800);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(t);
  }, [playing, current, isDragging]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) await v.play();
    else v.pause();
  }, []);

  const seekTo = useCallback(
    (t: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = clamp(t, 0, duration || 0);
    },
    [duration],
  );

  const toggleFullscreen = useCallback(async () => {
    const el = wrapperRef.current;
    if (!el) return;

    if (!document.fullscreenElement) await el.requestFullscreen();
    else await document.exitFullscreen();
  }, []);

  const restart = () => seekTo(0);

  // ✅ FIXED keyboard shortcuts:
  // - only work when shortcutsEnabled === true (hover/focus on player)
  // - ignored while typing in inputs / textareas / contenteditable (TipTap)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!shortcutsEnabled) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isTypingField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        !!target.closest("[contenteditable='true']");

      if (isTypingField) return;

      if (e.code === "Space" || e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "ArrowRight") seekTo(current + 5);
      if (e.key === "ArrowLeft") seekTo(current - 5);
      if (e.key.toLowerCase() === "m") setMuted((p) => !p);
      if (e.key.toLowerCase() === "f") toggleFullscreen();
      if (e.key === "Escape") setShowMenu(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcutsEnabled, current, seekTo, toggleFullscreen, togglePlay]);

  const progressPct = duration ? (current / duration) * 100 : 0;
  const bufferedPct = duration ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      tabIndex={0} // ✅ makes focus possible
      className="relative w-full overflow-hidden rounded-2xl bg-black border border-white/10 outline-none"
      onMouseMove={() => setShowControls(true)}
      onMouseEnter={() => setShortcutsEnabled(true)} // ✅ enable shortcuts
      onMouseLeave={() => {
        setShortcutsEnabled(false); // ✅ disable shortcuts
        if (playing) setShowControls(false);
      }}
      onFocus={() => setShortcutsEnabled(true)} // ✅ enable on focus
      onBlur={() => setShortcutsEnabled(false)} // ✅ disable on blur
    >
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-contain bg-black"
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* center play overlay (when paused) */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play"
          type="button"
        >
          <span className="h-16 w-16 md:h-20 md:w-20 cursor-pointer hover:scale-105 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition">
            <Play className="h-7 w-7 md:h-8 md:w-8 text-white translate-x-[1px]" />
          </span>
        </button>
      )}

      {/* controls */}
      <div
        className={`absolute inset-x-0 bottom-0 p-3 md:p-4 transition-opacity ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* progress bar */}
        <div className="relative mb-3">
          <div className="h-2 w-full rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-white/20"
              style={{ width: `${bufferedPct}%` }}
            />
          </div>
          <div
            className="absolute top-0 left-0 h-2 rounded-full bg-white"
            style={{ width: `${progressPct}%` }}
          />
          {/* thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow"
            style={{ left: `calc(${progressPct}% - 6px)` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(e) => seekTo(Number(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute top-[-8px] w-full h-8 opacity-0 cursor-pointer"
            aria-label="Seek"
          />
        </div>

        {/* control row */}
        <div className="flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <IconButton onClick={togglePlay} label={playing ? "Pause" : "Play"}>
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </IconButton>

            <IconButton onClick={restart} label="Restart">
              <RotateCcw className="h-5 w-5" />
            </IconButton>

            <IconButton
              onClick={() => setMuted((p) => !p)}
              label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </IconButton>

            {/* volume slider */}
            <div className="hidden md:flex items-center gap-2 ml-1">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVolume(v);
                  if (v > 0) setMuted(false);
                }}
                className="w-28 accent-white"
                aria-label="Volume"
              />
            </div>

            <div className="ml-2 text-xs text-white/80 tabular-nums">
              {formatTime(current)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* settings menu */}
            <div className="relative">
              <IconButton
                onClick={() => setShowMenu((p) => !p)}
                label="Settings"
              >
                <Settings className="h-5 w-5" />
              </IconButton>

              {showMenu && (
                <div className="z-10 absolute bottom-12 right-0 w-48 rounded-xl border border-white/15 bg-black/70 backdrop-blur p-2 shadow-lg">
                  <p className="px-2 py-1 text-[11px] text-white/70">Speed</p>
                  <div className="grid grid-cols-3 gap-1 px-1 pb-2">
                    {speeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaybackRate(s)}
                        className={`rounded-md px-2 py-1 text-xs border transition ${
                          playbackRate === s
                            ? "bg-white text-black border-white"
                            : "bg-white/10 text-white border-white/10 hover:bg-white/15"
                        }`}
                        type="button"
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-white/10 my-1" />

                  <p className="px-2 py-1 text-[11px] text-white/70">Quality</p>
                  <div className="px-1 pb-1">
                    <button
                      className="w-full rounded-md px-2 py-2 text-xs border bg-white/10 text-white border-white/10 hover:bg-white/15 text-left"
                      type="button"
                    >
                      Auto (default)
                    </button>
                  </div>
                </div>
              )}
            </div>

            <IconButton onClick={toggleFullscreen} label="Fullscreen">
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </IconButton>
          </div>
        </div>

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-md border border-white/15 bg-black/60 px-3 py-2 text-sm text-white backdrop-blur">
              Loading...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center transition"
      aria-label={label}
      type="button"
    >
      {children}
    </button>
  );
}
