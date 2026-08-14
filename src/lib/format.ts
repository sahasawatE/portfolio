import type { ResumeSection } from "../types/resume";

export function dateRange(start?: string, end?: string) {
  if (start && end) return start === end ? start : `${start} – ${end}`;
  return start || end || "";
}

export function findSection<T extends ResumeSection["type"]>(
  sections: ResumeSection[],
  type: T,
) {
  return sections.find(
    (section): section is Extract<ResumeSection, { type: T }> =>
      section.type === type,
  );
}
