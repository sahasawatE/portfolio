---
name: verify-resume-markdown
description: Prove the portfolio Markdown export keeps every contact, job, project, school, skill, and highlight from a resume. Use when a change touches toMarkdown, the resume section writers, contact or link lines, bullets, headings, blank-line collapsing, or dateRange.
---

# Verify resume Markdown export

The portfolio's `Download .md` button writes `toMarkdown` over the resume object. This skill checks that function, not the button click. Drive the button with `verify-portfolio`.

## Property

Every contact field, section, job, project name, school, skill, and highlight in the resume appears in the Markdown, with work listed newest first, em-dash titles, en-dash dates, and a single project link folded into the heading.

## Harm

A recruiter who downloads the Markdown resume can lose a job, a school, a skill, or a bullet that the portfolio data still contains.

## When a change needs this check

Rerun when a diff touches any of these:

- `toMarkdown`, `collapseBlankLines`, `contactLine`, `linkLine`, `bullets`, `heading`, or the experience, projects, education, and skills writers in `src/lib/exportMd.ts`
- `dateRange` in `src/lib/format.ts`

`slugify` and `downloadMarkdown` live in the same file and are not part of this property. Read a diff that only touches them, and leave the sync commit in place if those functions are all that changed. Move the sync commit only after a run confirms the property still describes the code at the new commit.

## Run

From the repo root:

```bash
pnpm verify:markdown
```

That is `node scripts/run-verify-markdown.mjs`. The runner bundles `scripts/verify-markdown-export.ts` and the TypeScript it imports, then executes the bundle. Bundling is how the run resolves the `@/` imports. The executed `toMarkdown` is the repo function, not a hand-written model.

The tool is esbuild 0.28.2, already installed through Vite in `pnpm-lock.yaml`. Node runs the bundle. No proof assistant or SMT verifier is set up for this TypeScript. The question is whether each resume value is still in the file, so the check generates resumes and calls the real function. A model checker would answer a different question, about order of events, and would not execute this code.

A passing run prints `ok` and exits 0. A failing run prints `FAIL`, names the case, and lists the missing heading or snippet in the resume's own words, then exits 1.

## What a failure means

A missing highlight, heading, contact line, skill line, or URL is a product bug: `toMarkdown` dropped or rewrote a fact the checker required. Fix the exporter only when the user asks. Do not relax the checker to match a drop.

A throw from `toMarkdown`, or a failure on a generated token the exporter was never supposed to rewrite, is still a product bug if the token appears unchanged in `src/lib/exportMd.ts`'s inputs and is absent from its output.

A failure that quotes a snippet the checker invented, or that rejects a heading the exporter still builds with an em dash (`U+2014`), an en dash (`U+2013`), or a middle dot (`U+00B7`), is a checker bug. Fix `scripts/verify-markdown-export.ts`. The separators in that file are the contract:

- job and school titles join with ` \u2014 `
- two different dates join with ` \u2013 `
- equal start and end collapse to that one value
- contact parts join with ` \u00b7 `
- a dated heading is `### <title>  _<date>_` with two spaces before the italic date
- one project link, or a project URL with no links, becomes `[<name>](<url>)` in the heading
- two or more project links keep the project name as the heading and emit `[<label>](<url>)` lines

The exporter sorts experience with `compareExperienceNewestFirst`, which uses `parseResumeDate`. `Present` stays the word present in the date text.

## Coverage

Confirmed against commit `bc1aeefa4ae58999ffa206a7f54111ca1cfceabf`.

| Code | What the check calls |
| --- | --- |
| `src/lib/exportMd.ts` | `toMarkdown` and the writers, `contactLine`, `linkLine`, `bullets`, `heading`, `collapseBlankLines` |
| `src/lib/format.ts` | `dateRange`, `compareExperienceNewestFirst` |
| `src/data/resume.json` | one concrete case, plus 40 generated resumes |
| `scripts/verify-markdown-export.ts` | the checker |
| `scripts/run-verify-markdown.mjs` | esbuild 0.28.2 bundle and run |

`findSection`, `parseResumeDate`, `normalizeLinks` callers outside `toMarkdown`, `slugify`, `downloadMarkdown`, and `src/pdf/ResumeDocument.tsx` are outside this check.

## Bounds and assumptions

- 40 generated resumes, indexes 0 through 39, plus `src/data/resume.json`. Case 0 has no sections. Other cases omit one section type on a fixed rotation.
- Generated names, roles, highlights, and urls are short tokens, sometimes containing `# * [ ] ( ) _ \``. They do not contain newlines.
- Each generated experience section has 1 to 3 jobs. Each included projects section has a one-link project, a two-link project, and a URL-only project.
- Presence is exact heading and snippet text, in the order `toMarkdown` writes. Work is newest first. It is not a Markdown AST parse, and it does not prove that the text is safe to render.
- One-link project labels that differ from the project name are not required. The heading uses the project name.
- The check does not start a browser and does not prove the nav button.

A pass covers these inputs and this contract. It does not cover the whole site.

## Left out

The on-page work list, the public PDF, and `toMarkdown` sort experience with `compareExperienceNewestFirst` (later start first, then later end). Other sections stay in file order. Link icons, the download filename, and weather are out of scope.

## Update the sync commit

After the covered functions change, run `pnpm verify:markdown` on the new code. If it still describes that code, replace the commit above with the new full hash. If it fails, leave the hash and report the counterexample. Do not move the hash past a commit you did not run.

## Maintenance

Bring this check back in line after edits that skipped it with `/maintain-formal-verification-skill`.
