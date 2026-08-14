import type { ResumeSection } from "../types/resume";

export function dateRange(start?: string, end?: string) {
  if (start && end) return start === end ? start : `${start} – ${end}`;
  return start || end || "";
}

export function parseResumeDate(value?: string) {
  if (!value) return 0;
  if (value.toLowerCase() === "present") return Number.POSITIVE_INFINITY;
  const time = Date.parse(`1 ${value}`);
  return Number.isNaN(time) ? 0 : time;
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
