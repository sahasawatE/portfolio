import { normalizeLinks } from "@/lib/links";
import type { Resume, ResumeLink, ResumeSection } from "@/types/resume";
import { dateRange } from "./format";

function bullets(items?: string[]) {
  return (items ?? []).map((text) => `- ${text}`);
}

function linkLine(links: ResumeLink[]) {
  if (!links.length) return "";
  return links
    .map((link) => `[${link.label || link.url}](${link.url})`)
    .join(" · ");
}

function heading(title: string, date?: string) {
  return date ? `### ${title}  _${date}_` : `### ${title}`;
}

function contactLine(basics: Resume["basics"]) {
  const parts: string[] = [];
  if (basics.email) parts.push(`[${basics.email}](mailto:${basics.email})`);
  if (basics.phone) parts.push(basics.phone);
  if (basics.location) parts.push(basics.location);
  for (const link of basics.links ?? []) {
    if (link?.url) parts.push(`[${link.label || link.url}](${link.url})`);
  }
  return parts.join(" · ");
}

const sectionWriters: Record<
  ResumeSection["type"],
  (lines: string[], section: ResumeSection) => void
> = {
  experience(lines, section) {
    if (section.type !== "experience") return;
    for (const item of section.items ?? []) {
      const title = [item.role, item.company].filter(Boolean).join(" — ");
      lines.push(heading(title, dateRange(item.start, item.end)));
      if (item.location) lines.push(`_${item.location}_`);
      const links = linkLine(normalizeLinks(item.links));
      if (links) lines.push(links);
      lines.push("");
      lines.push(...bullets(item.highlights));
      lines.push("");
    }
  },
  projects(lines, section) {
    if (section.type !== "projects") return;
    for (const item of section.items ?? []) {
      const links = normalizeLinks(item.links, item.url);
      let title = item.name || "";
      if (links.length === 1) {
        title = `[${title}](${links[0].url})`;
      }
      lines.push(heading(title, item.date || dateRange(item.start, item.end)));
      if (links.length > 1) lines.push(linkLine(links));
      lines.push("");
      lines.push(...bullets(item.highlights));
      lines.push("");
    }
  },
  education(lines, section) {
    if (section.type !== "education") return;
    for (const item of section.items ?? []) {
      const title = [item.institution, item.degree].filter(Boolean).join(" — ");
      lines.push(heading(title, dateRange(item.start, item.end)));
      if (item.location) lines.push(`_${item.location}_`);
      lines.push("");
      lines.push(...bullets(item.highlights));
      lines.push("");
    }
  },
  skills(lines, section) {
    if (section.type !== "skills") return;
    for (const group of section.groups ?? []) {
      lines.push(`**${group.name || ""}**: ${(group.items ?? []).join(", ")}`);
      lines.push("");
    }
  },
};

function collapseBlankLines(lines: string[]) {
  return lines.filter((line, i) => !(line === "" && lines[i - 1] === ""));
}

function slugify(text?: string) {
  return (
    String(text || "resume")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "resume"
  );
}

export function toMarkdown(resume: Resume) {
  const basics = resume.basics ?? { name: "", title: "" };
  const lines: string[] = [];

  if (basics.name) lines.push(`# ${basics.name}`);
  if (basics.title) {
    lines.push("");
    lines.push(`**${basics.title}**`);
  }

  const contact = contactLine(basics);
  if (contact) {
    lines.push("");
    lines.push(contact);
  }

  if (basics.summary) {
    lines.push("");
    lines.push(basics.summary);
  }

  for (const section of resume.sections ?? []) {
    const write = sectionWriters[section.type];
    if (!write) continue;
    lines.push("");
    lines.push(`## ${section.title || ""}`);
    lines.push("");
    write(lines, section);
  }

  return `${collapseBlankLines(lines).join("\n")}\n`;
}

export function downloadMarkdown(resume: Resume) {
  const markdown = toMarkdown(resume);
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slugify(resume.basics?.name)}-resume.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
