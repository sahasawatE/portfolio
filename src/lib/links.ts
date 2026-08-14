import type { ResumeLink } from "../types/resume";

export type LinkIcon = "github" | "npm" | "link";

export function normalizeLinks(links?: ResumeLink[], fallbackUrl?: string) {
  const items = (links ?? []).filter((link) => link?.url);
  if (!items.length && fallbackUrl) {
    return [{ label: fallbackUrl, url: fallbackUrl }];
  }
  return items;
}

export function linkIconFromUrl(url: string): LinkIcon {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    if (
      host === "github.com" ||
      host === "github.io" ||
      host.endsWith(".github.com") ||
      host.endsWith(".github.io")
    ) {
      return "github";
    }
    if (
      host === "npmjs.com" ||
      host === "npmjs.org" ||
      host.endsWith(".npmjs.com") ||
      host.endsWith(".npmjs.org")
    ) {
      return "npm";
    }
  } catch {
    return "link";
  }
  return "link";
}
