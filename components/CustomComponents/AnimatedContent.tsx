"use client";
import React, { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Ease = string | ((progress: number) => number);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: Ease;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  /** 0–1: how much of the viewport must be available before triggering (maps to start %) */
  threshold?: number;
  delay?: number;
  /** play only once (default true) */
  once?: boolean;
  /** scrub amount (seconds) or boolean for scroll-synced animation */
  scrub?: boolean | number;
  /** stagger for multiple children (seconds) */
  stagger?: number;
  /** fire after the animation completes (first time) */
  onComplete?: () => void;
  /** override ScrollTrigger.start if you want full control */
  start?: string;
  /** extra ScrollTrigger options if needed */
  triggerOffset?: number; // adds px offset to start
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  once = true,
  scrub = false,
  stagger = 0,
  onComplete,
  start,
  triggerOffset = 0,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Respect user reduced-motion preference
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // initial transform axis
    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = Math.max(0, Math.min(100, (1 - threshold) * 100));
    const computedStart = start ?? `top ${startPct}%${triggerOffset ? `+=${triggerOffset}` : ""}`;

    // Scope all GSAP selectors/tweens to this component
    const ctx = gsap.context(() => {
      // If the user prefers reduced motion, jump states without animation
      if (prefersReduced) {
        gsap.set(el, { [axis]: 0, scale: 1, opacity: 1 });
        return;
      }

      // If there are multiple direct children and a stagger is set,
      // animate the children; otherwise animate the container
      const targets =
        stagger > 0
          ? Array.from(el.children).length > 0
            ? el.children
            : el
          : el;

      gsap.set(targets, {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1,
      });

      const tween = gsap.to(targets, {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        stagger: stagger > 0 ? stagger : 0,
        onComplete,
        scrollTrigger: {
          trigger: el,
          start: computedStart,
          toggleActions: once && !scrub ? "play none none none" : "play none none reset",
          once: once && !scrub, // ScrollTrigger’s once only works without scrub
          scrub, // when true/number, animation syncs with scroll
        },
      });

      // keep a handle to the ScrollTrigger for cleanup
      stRef.current = (tween.scrollTrigger as ScrollTrigger) ?? null;
    }, rootRef);

    return () => {
      // Clean up only what we created
      stRef.current?.kill();
      stRef.current = null;
      ctx.revert(); // kills tweens created in this context and restores inline styles
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    once,
    scrub,
    stagger,
    onComplete,
    start,
    triggerOffset,
  ]);

  return <div ref={rootRef}>{children}</div>;
};

export default AnimatedContent;
