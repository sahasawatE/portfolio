import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToFile } from "@react-pdf/renderer";
import resume from "../src/data/resume.json";
import { ResumeDocument } from "../src/pdf/ResumeDocument";
import type { Resume } from "../src/types/resume";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "public", "resume.pdf");

mkdirSync(path.dirname(outFile), { recursive: true });

await renderToFile(
  createElement(ResumeDocument, { resume: resume as Resume }) as Parameters<
    typeof renderToFile
  >[0],
  outFile,
);

console.log(`Wrote ${path.relative(root, outFile)}`);
