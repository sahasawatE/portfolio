import rawResume from "../src/data/resume.json";
import { toMarkdown } from "../src/lib/exportMd.ts";
import { compareExperienceNewestFirst } from "../src/lib/format.ts";
import type {
  EducationSection,
  ExperienceSection,
  ProjectItem,
  ProjectsSection,
  Resume,
  ResumeSection,
  SkillsSection,
} from "../src/types/resume.ts";

const shipped = rawResume as Resume;
const CASE_COUNT = 40;
const MARKS = ["#", "*", "[", "]", "(", ")", "_", "`"] as const;

const TITLE_SEP = " \u2014 ";
const DATE_SEP = " \u2013 ";
const CONTACT_SEP = " \u00b7 ";

function expectedDate(start?: string, end?: string) {
  if (start && end) return start === end ? start : `${start}${DATE_SEP}${end}`;
  return start || end || "";
}

function joinTitle(left?: string, right?: string) {
  return [left, right].filter((part) => Boolean(part)).join(TITLE_SEP);
}

function expectedHeading(title: string, date: string) {
  return date ? `### ${title}  _${date}_` : `### ${title}`;
}

function expectedContact(basics: Resume["basics"]) {
  const parts: string[] = [];
  if (basics.email) parts.push(`[${basics.email}](mailto:${basics.email})`);
  if (basics.phone) parts.push(basics.phone);
  if (basics.location) parts.push(basics.location);
  for (const link of basics.links ?? []) {
    if (!link?.url) continue;
    parts.push(`[${link.label || link.url}](${link.url})`);
  }
  return parts.join(CONTACT_SEP);
}

function projectHeadingTitle(item: ProjectItem) {
  const links = (item.links ?? []).filter((link) => link?.url);
  const name = item.name || "";
  if (links.length === 1) return `[${name}](${links[0].url})`;
  if (!links.length && item.url) return `[${name}](${item.url})`;
  return name;
}

function projectUrls(item: ProjectItem) {
  const links = (item.links ?? []).filter((link) => link?.url);
  if (links.length) return links.map((link) => link.url);
  return item.url ? [item.url] : [];
}

function dates(i: number, n: number) {
  const start = `Jan ${2000 + n}`;
  const end = `Feb ${2001 + n}`;
  const mode = (i + n) % 5;
  if (mode === 0) return { start, end };
  if (mode === 1) return { start, end: start };
  if (mode === 2) return { start };
  if (mode === 3) return { end };
  return { start, end: "present" };
}

function makeCase(i: number): Resume {
  const mark = MARKS[i % MARKS.length];
  const basics: Resume["basics"] = {
    name: `Name-${i}-${mark}`,
    title: `Title-${i}`,
    email: `person${i}@verify.example`,
    links: [{ label: `site-${i}`, url: `https://verify.example/${i}` }],
  };
  if (i % 3 !== 1) basics.phone = `+100000${i}`;
  if (i % 3 !== 2) basics.location = `Loc ${i}`;
  if (i % 4 === 0) basics.summary = `Summary ${i} ${mark}`;

  if (i === 0) return { basics, sections: [] };

  const sections: ResumeSection[] = [];
  const omit = i % 5;
  if (omit !== 1) sections.push(experienceSection(i, mark));
  if (omit !== 2) sections.push(projectsSection(i, mark));
  if (omit !== 3) sections.push(educationSection(i));
  if (omit !== 4) sections.push(skillsSection(i));
  return { basics, sections };
}

function experienceSection(i: number, mark: string): ExperienceSection {
  const count = 1 + (i % 3);
  const items = Array.from({ length: count }, (_, n) => {
    const highlights = Array.from(
      { length: 1 + (n % 2) },
      (_, h) => `highlight-${i}-${n}-${h}-${mark}`,
    );
    return {
      company: `Company-${i}-${n}`,
      role: `Role-${i}-${n}`,
      location: `WorkLoc-${i}-${n}`,
      ...dates(i, n),
      links:
        n % 2 === 0
          ? [{ label: `work-${i}-${n}`, url: `https://work.example/${i}/${n}` }]
          : [],
      highlights,
    };
  });
  return { type: "experience", title: `Experience ${i}`, items };
}

function projectsSection(i: number, mark: string): ProjectsSection {
  const items: ProjectItem[] = [
    {
      name: `Project-${i}-0`,
      date: `Year-${i}-0`,
      url: `https://project.example/${i}/0`,
      links: [{ label: `proj-${i}-0`, url: `https://project.example/${i}/0` }],
      highlights: [`project-highlight-${i}-0-${mark}`],
    },
    {
      name: `Project-${i}-1`,
      start: "Mar 2010",
      end: "Apr 2011",
      links: [
        { label: `a-${i}`, url: `https://a.example/${i}` },
        { label: `b-${i}`, url: `https://b.example/${i}` },
      ],
      highlights: [`project-highlight-${i}-1-${mark}`],
    },
    {
      name: `Fallback-${i}`,
      url: `https://fallback.example/${i}`,
      highlights: [`fallback-highlight-${i}-${mark}`],
    },
  ];
  return { type: "projects", title: `Projects ${i}`, items };
}

function educationSection(i: number): EducationSection {
  return {
    type: "education",
    title: `Education ${i}`,
    items: [
      {
        institution: `School-${i}`,
        degree: `Degree-${i}`,
        location: `EduLoc-${i}`,
        start: "2018",
        end: i % 2 === 0 ? "2018" : "2022",
        highlights: i % 2 === 0 ? [] : [`edu-highlight-${i}`],
      },
    ],
  };
}

function skillsSection(i: number): SkillsSection {
  return {
    type: "skills",
    title: `Skills ${i}`,
    groups: [
      { name: `GroupA-${i}`, items: [`SkillA-${i}`, `SkillB-${i}`] },
      { name: `GroupB-${i}`, items: [`SkillC-${i}`] },
    ],
  };
}

function blankLineFailure(md: string) {
  if (!md.endsWith("\n")) return "markdown does not end with a newline";
  const lines = md.slice(0, -1).split("\n");
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "" && lines[i - 1] === "") {
      return "markdown has two blank lines in a row";
    }
  }
  return "";
}

type Region = { heading: string; snippets: string[] };

function expectRegions(
  body: string,
  regions: Region[],
  failures: string[],
  where: string,
) {
  let cursor = 0;
  for (let index = 0; index < regions.length; index += 1) {
    const region = regions[index];
    const at = body.indexOf(region.heading, cursor);
    if (at < 0) {
      failures.push(`${where} item ${index} is missing heading "${region.heading}"`);
      return;
    }
    let end = body.length;
    const next = regions[index + 1];
    if (next) {
      const nextAt = body.indexOf(next.heading, at + region.heading.length);
      if (nextAt >= 0) end = nextAt;
    }
    const slice = body.slice(at, end);
    for (const snippet of region.snippets) {
      if (!slice.includes(snippet)) {
        failures.push(`${where} item ${index} is missing "${snippet}"`);
      }
    }
    cursor = at + region.heading.length;
  }
}

function check(resume: Resume, md: string) {
  const failures: string[] = [];
  const blank = blankLineFailure(md);
  if (blank) failures.push(blank);

  const lines = md.split("\n");
  const basics = resume.basics ?? { name: "", title: "" };
  if (basics.name && !lines.includes(`# ${basics.name}`)) {
    failures.push(`missing name line "# ${basics.name}"`);
  }
  if (basics.title && !lines.includes(`**${basics.title}**`)) {
    failures.push(`missing title line "**${basics.title}**"`);
  }
  if (basics.summary && !lines.includes(basics.summary)) {
    failures.push(`missing summary "${basics.summary}"`);
  }

  const contact = expectedContact(basics);
  if (contact && !lines.includes(contact)) {
    failures.push(`missing contact line "${contact}"`);
  }

  const sections = resume.sections ?? [];
  const sectionHeadings = lines.filter(
    (line) => line.startsWith("## ") && !line.startsWith("###"),
  );
  if (sectionHeadings.length !== sections.length) {
    failures.push(
      `expected ${sections.length} section headings, found ${sectionHeadings.length}`,
    );
  }

  let cursor = 0;
  sections.forEach((section, index) => {
    const token = `## ${section.title || ""}`;
    const at = md.indexOf(token, cursor);
    if (at < 0) {
      failures.push(`missing section heading "${token}"`);
      return;
    }
    cursor = at + token.length;
    const next = sections[index + 1];
    const nextAt = next ? md.indexOf(`## ${next.title || ""}`, cursor) : -1;
    const body = md.slice(at, nextAt === -1 ? md.length : nextAt);
    checkSection(section, body, failures);
  });

  return failures;
}

function checkSection(section: ResumeSection, body: string, failures: string[]) {
  if (section.type === "experience") {
    expectRegions(
      body,
      [...section.items].sort(compareExperienceNewestFirst).map((item) => ({
        heading: expectedHeading(
          joinTitle(item.role, item.company),
          expectedDate(item.start, item.end),
        ),
        snippets: [
          ...(item.location ? [`_${item.location}_`] : []),
          ...(item.highlights ?? []).map((highlight) => `- ${highlight}`),
          ...(item.links ?? [])
            .filter((link) => link?.url)
            .map((link) => `[${link.label || link.url}](${link.url})`),
        ],
      })),
      failures,
      section.title || "experience",
    );
    return;
  }

  if (section.type === "projects") {
    expectRegions(
      body,
      section.items.map((item) => {
        const links = (item.links ?? []).filter((link) => link?.url);
        const snippets = [
          ...(item.highlights ?? []).map((highlight) => `- ${highlight}`),
          ...projectUrls(item),
        ];
        if (links.length > 1) {
          snippets.push(
            ...links.map((link) => `[${link.label || link.url}](${link.url})`),
          );
        }
        return {
          heading: expectedHeading(
            projectHeadingTitle(item),
            item.date || expectedDate(item.start, item.end),
          ),
          snippets,
        };
      }),
      failures,
      section.title || "projects",
    );
    return;
  }

  if (section.type === "education") {
    expectRegions(
      body,
      section.items.map((item) => ({
        heading: expectedHeading(
          joinTitle(item.institution, item.degree),
          expectedDate(item.start, item.end),
        ),
        snippets: [
          ...(item.location ? [`_${item.location}_`] : []),
          ...(item.highlights ?? []).map((highlight) => `- ${highlight}`),
        ],
      })),
      failures,
      section.title || "education",
    );
    return;
  }

  let skillCursor = 0;
  for (const group of section.groups ?? []) {
    const line = `**${group.name || ""}**: ${(group.items ?? []).join(", ")}`;
    const at = body.indexOf(line, skillCursor);
    if (at < 0) {
      failures.push(`${section.title || "skills"} is missing "${line}"`);
      return;
    }
    skillCursor = at + line.length;
  }
}

function verify() {
  const cases: { name: string; resume: Resume }[] = [];
  for (let i = 0; i < CASE_COUNT; i += 1) {
    cases.push({ name: `generated-${i}`, resume: makeCase(i) });
  }
  cases.push({ name: "src/data/resume.json", resume: shipped });

  for (const item of cases) {
    let md = "";
    try {
      md = toMarkdown(item.resume);
    } catch (error) {
      console.error("FAIL");
      console.error(`Case ${item.name} broke the markdown export.`);
      console.error(`- toMarkdown threw: ${error instanceof Error ? error.message : String(error)}`);
      return 1;
    }
    const failures = check(item.resume, md);
    if (failures.length) {
      console.error("FAIL");
      console.error(`Case ${item.name} broke the markdown export.`);
      for (const failure of failures.slice(0, 5)) console.error(`- ${failure}`);
      return 1;
    }
  }

  console.log("ok");
  console.log(`Checked ${CASE_COUNT} generated resumes and src/data/resume.json.`);
  console.log(
    "Property: every contact field, section, job, project name, school, skill, and highlight is in the markdown, with work listed newest first, em-dash titles, en-dash dates, and a single project link folded into the heading.",
  );
  return 0;
}

process.exitCode = verify();
