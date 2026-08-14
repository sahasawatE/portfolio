import type { ResumeLink } from "../types/resume";

export function normalizeLinks(links?: ResumeLink[], fallbackUrl?: string) {
  const items = (links ?? []).filter((link) => link?.url);
  if (!items.length && fallbackUrl) {
    return [{ label: fallbackUrl, url: fallbackUrl }];
  }
  return items;
}
