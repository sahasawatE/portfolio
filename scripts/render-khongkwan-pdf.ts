import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToFile } from "@react-pdf/renderer";
import resumeData from "../src/data/resume.json";
import { CoverLetterDocument } from "../src/pdf/CoverLetterDocument";
import { ResumeDocument } from "../src/pdf/ResumeDocument";
import type { ExperienceSection, Resume } from "../src/types/resume";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "applications", "khongkwan-clinic");

const summary =
  "Frontend developer focused on websites, interface quality, and how quickly a page becomes usable. I work in React, TypeScript, Nuxt, and Vite, and I have shipped client portals, shared component setups, and research data-collection tools.";

function jobResume(): Resume {
  const resume = structuredClone(resumeData) as Resume;
  resume.basics.summary = summary;

  const experience = resume.sections.find(
    (section): section is ExperienceSection => section.type === "experience",
  );
  if (!experience) return resume;

  const feIndex = experience.items.findIndex(
    (item) => item.company === "Abbot Technology" && item.role === "Frontend Developer",
  );
  const pmIndex = experience.items.findIndex(
    (item) => item.company === "Abbot Technology" && item.role === "Project Manager",
  );
  if (feIndex === -1 || pmIndex === -1) return resume;

  const fe = experience.items[feIndex];
  const pm = experience.items[pmIndex];
  const rest = experience.items.filter((_, index) => index !== feIndex && index !== pmIndex);
  experience.items = [fe, pm, ...rest];

  return resume;
}

mkdirSync(outDir, { recursive: true });

const resumeFile = path.join(outDir, "resume.pdf");
const letterFile = path.join(outDir, "cover-letter.pdf");

await renderToFile(
  createElement(ResumeDocument, { resume: jobResume() }) as Parameters<
    typeof renderToFile
  >[0],
  resumeFile,
);

await renderToFile(
  createElement(CoverLetterDocument) as Parameters<typeof renderToFile>[0],
  letterFile,
);

console.log(`Wrote ${path.relative(root, resumeFile)}`);
console.log(`Wrote ${path.relative(root, letterFile)}`);
