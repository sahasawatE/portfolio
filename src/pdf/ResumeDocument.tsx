import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type {
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  Resume,
  ResumeLink,
  SkillsSection,
} from "../types/resume";
import { normalizeLinks } from "../lib/links";
import { dateRange } from "../lib/format";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9.2,
    lineHeight: 1.4,
    color: "#111827",
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 19,
    color: "#111827",
  },
  title: {
    marginTop: 4,
    fontSize: 10.5,
    color: "#1f2937",
  },
  contact: {
    marginTop: 6,
    fontSize: 9,
    color: "#4b5563",
  },
  summary: {
    marginTop: 8,
    fontSize: 9.2,
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    paddingBottom: 4,
    marginBottom: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: "#1f2937",
    color: "#111827",
  },
  entry: {
    marginBottom: 9,
  },
  entryHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 8,
  },
  role: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.2,
    flexGrow: 1,
    flexShrink: 1,
  },
  date: {
    fontFamily: "Courier",
    fontSize: 8.5,
    color: "#6b7280",
  },
  meta: {
    marginTop: 1,
    fontSize: 8.8,
    color: "#4b5563",
  },
  links: {
    marginTop: 2,
    fontSize: 8.6,
    color: "#1f2937",
  },
  bullet: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 2,
  },
  bulletMark: {
    width: 10,
    fontSize: 9,
    color: "#1f2937",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
  },
  skillGroup: {
    marginBottom: 6,
  },
  skillName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.4,
    marginBottom: 2,
  },
  skillItems: {
    fontSize: 9,
    color: "#1f2937",
  },
  link: {
    color: "#1f2937",
    textDecoration: "underline",
  },
});


function ContactLine({ basics }: { basics: Resume["basics"] }) {
  const parts: { label: string; href?: string }[] = [];
  if (basics.email) {
    parts.push({ label: basics.email, href: `mailto:${basics.email}` });
  }
  if (basics.phone) parts.push({ label: basics.phone, href: `tel:${basics.phone}` });
  if (basics.location) parts.push({ label: basics.location });
  for (const link of basics.links ?? []) {
    if (link.url) parts.push({ label: link.label || link.url, href: link.url });
  }

  return (
    <Text style={styles.contact}>
      {parts.map((part, index) => (
        <Text key={`${part.label}-${index}`}>
          {index > 0 ? "  ·  " : ""}
          {part.href ? (
            <Link src={part.href} style={styles.link}>
              {part.label}
            </Link>
          ) : (
            part.label
          )}
        </Text>
      ))}
    </Text>
  );
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <View>
      {items.map((item) => (
        <View key={item} style={styles.bullet} wrap={false}>
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function ExperienceBlock({ section }: { section: ExperienceSection }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.items.map((item) => (
        <View
          key={`${item.role}-${item.company}-${item.start}`}
          style={styles.entry}
          wrap={false}
        >
          <View style={styles.entryHead}>
            <Text style={styles.role}>
              {[item.role, item.company].filter(Boolean).join(" — ")}
            </Text>
            <Text style={styles.date}>{dateRange(item.start, item.end)}</Text>
          </View>
          {item.location ? <Text style={styles.meta}>{item.location}</Text> : null}
          <LinkRow links={normalizeLinks(item.links)} />
          <Bullets items={item.highlights} />
        </View>
      ))}
    </View>
  );
}

function ProjectsBlock({ section }: { section: ProjectsSection }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.items.map((item) => (
        <View key={item.name} style={styles.entry} wrap={false}>
          <View style={styles.entryHead}>
            <Text style={styles.role}>{item.name}</Text>
            <Text style={styles.date}>
              {item.date || dateRange(item.start, item.end)}
            </Text>
          </View>
          <LinkRow links={normalizeLinks(item.links, item.url)} />
          <Bullets items={item.highlights} />
        </View>
      ))}
    </View>
  );
}

function EducationBlock({ section }: { section: EducationSection }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.items.map((item) => (
        <View
          key={`${item.institution}-${item.degree}`}
          style={styles.entry}
          wrap={false}
        >
          <View style={styles.entryHead}>
            <Text style={styles.role}>
              {[item.institution, item.degree].filter(Boolean).join(" — ")}
            </Text>
            <Text style={styles.date}>{dateRange(item.start, item.end)}</Text>
          </View>
          {item.location ? <Text style={styles.meta}>{item.location}</Text> : null}
          <Bullets items={item.highlights} />
        </View>
      ))}
    </View>
  );
}

function SkillsBlock({ section }: { section: SkillsSection }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.groups.map((group) => (
        <View key={group.name} style={styles.skillGroup} wrap={false}>
          <Text style={styles.skillName}>{group.name}</Text>
          <Text style={styles.skillItems}>{(group.items ?? []).join(", ")}</Text>
        </View>
      ))}
    </View>
  );
}

function LinkRow({ links }: { links: ResumeLink[] }) {
  if (!links.length) return null;
  return (
    <Text style={styles.links}>
      {links.map((link, index) => (
        <Text key={link.url}>
          {index > 0 ? "  ·  " : ""}
          <Link src={link.url} style={styles.link}>
            {link.label || link.url}
          </Link>
        </Text>
      ))}
    </Text>
  );
}

type ResumeDocumentProps = {
  resume: Resume;
};

export function ResumeDocument({ resume }: ResumeDocumentProps) {
  const { basics, sections } = resume;

  return (
    <Document
      title={`${basics.name} — Resume`}
      author={basics.name}
      subject={basics.title}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{basics.name}</Text>
        {basics.title ? <Text style={styles.title}>{basics.title}</Text> : null}
        <ContactLine basics={basics} />
        {basics.summary ? <Text style={styles.summary}>{basics.summary}</Text> : null}

        {sections.map((section) => {
          if (section.type === "experience") {
            return <ExperienceBlock key={section.title} section={section} />;
          }
          if (section.type === "projects") {
            return <ProjectsBlock key={section.title} section={section} />;
          }
          if (section.type === "education") {
            return <EducationBlock key={section.title} section={section} />;
          }
          if (section.type === "skills") {
            return <SkillsBlock key={section.title} section={section} />;
          }
          return null;
        })}
      </Page>
    </Document>
  );
}
