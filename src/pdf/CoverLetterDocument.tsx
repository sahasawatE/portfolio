import { Document, Link, Page, StyleSheet, Text } from "@react-pdf/renderer";
import resumeData from "../data/resume.json";
import { compareExperienceNewestFirst, findSection } from "../lib/format";
import type { ExperienceItem, Resume } from "../types/resume";
import "./registerFonts";

const styles = StyleSheet.create({
  page: {
    paddingTop: 72,
    paddingBottom: 72,
    paddingHorizontal: 72,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.35,
    color: "#1f1f1f",
  },
  right: {
    textAlign: "right",
  },
  email: {
    color: "#1155CC",
    textDecoration: "underline",
  },
  date: {
    marginTop: 16,
    textAlign: "right",
  },
  recipient: {
    marginTop: 18,
  },
  greeting: {
    marginTop: 14,
  },
  paragraph: {
    marginTop: 12,
    textAlign: "justify",
  },
  thai: {
    fontFamily: "Noto Sans Thai",
  },
  close: {
    marginTop: 18,
    textAlign: "right",
  },
});

const resume = resumeData as Resume;

const detailByRole: Record<string, string> = {
  "Project Manager|Abbot Technology":
    "I managed delivery of two electronic data-collection tools for สธ. and ศูนย์วิจัยแม่และเด็ก. One is an analytic-hierarchy questionnaire with a consistency check before save. The other is a multi-round e-Delphi questionnaire with median, interquartile range, and consensus feedback. Experts open their assigned questionnaire, an admin view shows who has responded, and answers export to Excel or CSV.",
  "Frontend Developer|Abbot Technology":
    "I build websites and interfaces in React, Nuxt, and Vite, including a reusable Nuxt setup, a typed HTTP client, the Kasikorn Asset PVD Registra portal, and a TurboRepo monorepo for shared UI and builds.",
  "Automation Tester|Playtorium Solution":
    "I wrote Playwright test scripts and a GitLab CI pipeline for testing and deployment.",
  "Frontend Developer (part-time)|Abbot Technology":
    "helped build Mohpromt Station, a React app for COVID-19 vaccination and hospital services, and Chula Hospital's Nuxt portal.",
  "UX/UI Designer (intern)|Bitkub":
    "made UI components in Figma and worked with Jira in an Agile process.",
};

function span(item: ExperienceItem) {
  if (item.start && item.end && item.start !== item.end) return `${item.start} to ${item.end}`;
  return item.start || item.end || "";
}

function letterSentence(item: ExperienceItem) {
  const key = `${item.role}|${item.company}`;
  const body = detailByRole[key] ?? item.highlights?.[0] ?? "";
  const when = span(item);
  if (key === "Project Manager|Abbot Technology") {
    return `I am Project Manager at Abbot Technology, from ${item.start}. ${body}`;
  }
  if (key === "Frontend Developer|Abbot Technology") {
    return `I am also Frontend Developer at Abbot Technology, from ${item.start}. ${body}`;
  }
  if (key === "Automation Tester|Playtorium Solution") {
    return `At Playtorium Solution I worked as an Automation Tester from ${when}. ${body}`;
  }
  if (key === "Frontend Developer (part-time)|Abbot Technology") {
    return `As a Frontend Developer (part-time) at Abbot Technology from ${when}, I ${body}`;
  }
  if (key === "UX/UI Designer (intern)|Bitkub") {
    return `As a UX/UI Designer (intern) at Bitkub from ${when}, I ${body}`;
  }
  const lead = [item.role, item.company].filter(Boolean).join(" at ");
  return [lead && when ? `${lead}, ${when}.` : lead, body].filter(Boolean).join(" ");
}

const experience = findSection(resume.sections, "experience");
const jobs = [...(experience?.items ?? [])].sort(compareExperienceNewestFirst);
const projectManager = jobs.find(
  (item) => item.role === "Project Manager" && item.company === "Abbot Technology",
);
const frontend = jobs.find(
  (item) => item.role === "Frontend Developer" && item.company === "Abbot Technology",
);
const earlier = jobs.filter((item) => item !== projectManager && item !== frontend);

const paragraphs = [
  "I am writing to apply for the Web Developer & SEM Optimizer role at Khongkwan Clinic Vejchagrum.",
  projectManager ? letterSentence(projectManager) : "",
  frontend ? letterSentence(frontend) : "",
  earlier.map(letterSentence).join(" "),
  "The role also asks for search-campaign work. That is not experience I am offering here. What I can take on from the first week is the site itself. I welcome the opportunity to discuss that work with you.",
].filter(Boolean);

function Paragraph({ text }: { text: string }) {
  const parts = text.split(/(สธ\.|ศูนย์วิจัยแม่และเด็ก)/g);
  return (
    <Text style={styles.paragraph}>
      {parts.map((part, index) =>
        part === "สธ." || part === "ศูนย์วิจัยแม่และเด็ก" ? (
          <Text key={`${part}-${index}`} style={styles.thai}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}

export function CoverLetterDocument() {
  return (
    <Document
      title="Sahasawat Uengwanitchaphan — Cover letter"
      author="Sahasawat Uengwanitchaphan"
      subject="Web Developer & SEM Optimizer, Khongkwan Clinic Vejchagrum"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.right}>6, Phahonyothin Rd.</Text>
        <Text style={styles.right}>Anusawari, Bang khen,</Text>
        <Text style={styles.right}>Bangkok 10220</Text>
        <Text style={styles.right}>Tel(M): (+66)92-363-5365</Text>
        <Text style={styles.right}>
          E-mail:{" "}
          <Link src="mailto:hoklok3@gmail.com" style={styles.email}>
            hoklok3@gmail.com
          </Link>
        </Text>
        <Text style={styles.date}>Oct 30, 2026</Text>
        <Text style={styles.recipient}>Khongkwan Clinic Vejchagrum</Text>
        <Text>Din Daeng, Bangkok</Text>
        <Text style={styles.greeting}>Dear Sir/Madam:</Text>
        {paragraphs.map((paragraph) => (
          <Paragraph key={paragraph} text={paragraph} />
        ))}
        <Text style={styles.close}>Yours faithfully,</Text>
        <Text style={styles.right}>Sahasawat Uengwanitchaphan</Text>
      </Page>
    </Document>
  );
}
