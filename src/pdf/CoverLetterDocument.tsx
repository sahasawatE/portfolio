import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import "./registerFonts";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: "Noto Sans Thai",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#111827",
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 19,
    color: "#111827",
  },
  contact: {
    marginTop: 6,
    fontSize: 9.5,
    color: "#4b5563",
  },
  date: {
    marginTop: 22,
    fontSize: 11,
  },
  address: {
    marginTop: 16,
  },
  subject: {
    marginTop: 16,
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  paragraph: {
    marginTop: 12,
  },
  close: {
    marginTop: 16,
  },
});

const paragraphs = [
  "I am writing to apply for the Web Developer & SEM Optimizer role at Khongkwan Clinic Vejchagrum.",
  "I build websites and product interfaces in React, TypeScript, Nuxt, and Vite. At Abbot Technology I set up a Nuxt project structure the team could reuse, published a typed HTTP client for that stack, and built the Kasikorn Asset PVD Registra portal with custom components and a Vite pipeline. A TurboRepo monorepo for several React apps kept shared UI, theming, and production builds in one place. That is the website, interface, and performance work I would bring to clinic sites and landing pages.",
  "I am also Project Manager at Abbot Technology, where I managed delivery of two electronic data-collection tools for สธ. and ศูนย์วิจัยแม่และเด็ก. One is an analytic-hierarchy questionnaire with pairwise comparison and a consistency check before save. The other is a multi-round e-Delphi questionnaire that returns the median, interquartile range, and consensus feedback. Experts open only the questionnaire assigned to them, an admin view shows who has responded, and the answers export to Excel or CSV.",
  "The role also asks for search-campaign work. That is not experience I am offering here. What I can take on from the first week is the site itself: pages that load cleanly, layouts that are straightforward to use, and a front end the clinic can keep changing.",
];

export function CoverLetterDocument() {
  return (
    <Document
      title="Sahasawat Uengwanitchaphan — Cover letter"
      author="Sahasawat Uengwanitchaphan"
      subject="Web Developer & SEM Optimizer, Khongkwan Clinic Vejchagrum"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>Sahasawat Uengwanitchaphan</Text>
        <Text style={styles.contact}>
          hoklok3@gmail.com  ·  +66 92-363-5365  ·  Bangkok, Thailand
        </Text>
        <Text style={styles.date}>30 October 2026</Text>
        <Text style={styles.address}>Khongkwan Clinic Vejchagrum</Text>
        <Text>Din Daeng, Bangkok</Text>
        <Text style={styles.subject}>Web Developer & SEM Optimizer</Text>
        {paragraphs.map((paragraph) => (
          <Text key={paragraph} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
        <Text style={styles.close}>Sincerely,</Text>
        <Text style={styles.paragraph}>Sahasawat Uengwanitchaphan</Text>
      </Page>
    </Document>
  );
}
