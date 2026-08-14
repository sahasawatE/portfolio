import { useSyncExternalStore } from "react";
import { prefersReducedMotion } from "@/lib/liquidGlass";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function hasSlowUpdate(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(update: slow)").matches;
}

function hasLowMemory(): boolean {
  if (typeof navigator === "undefined") return false;
  const memory = (navigator as NavigatorWithMemory).deviceMemory;
  return typeof memory === "number" && memory <= 4;
}

function hasLowConcurrency(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4
  );
}

/** True when the machine or user preference says to skip expensive visuals. */
export function isLiteMode(): boolean {
  if (typeof window === "undefined") return false;
  return (
    prefersReducedMotion() ||
    hasLowMemory() ||
    hasLowConcurrency() ||
    hasSlowUpdate()
  );
}

function subscribeLiteMode(onStoreChange: () => void): () => void {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slow = window.matchMedia("(update: slow)");
  motion.addEventListener("change", onStoreChange);
  slow.addEventListener("change", onStoreChange);
  return () => {
    motion.removeEventListener("change", onStoreChange);
    slow.removeEventListener("change", onStoreChange);
  };
}

export function useLiteMode(): boolean {
  return useSyncExternalStore(subscribeLiteMode, isLiteMode, () => false);
}
