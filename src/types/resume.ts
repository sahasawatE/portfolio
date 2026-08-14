export type ResumeLink = {
  label: string;
  url: string;
  icon?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  location?: string;
  start?: string;
  end?: string;
  links?: ResumeLink[];
  highlights?: string[];
  images?: string[];
};

export type ProjectItem = {
  name: string;
  date?: string;
  url?: string;
  start?: string;
  end?: string;
  links?: ResumeLink[];
  highlights?: string[];
  images?: string[];
};

export type EducationItem = {
  institution: string;
  degree?: string;
  location?: string;
  start?: string;
  end?: string;
  highlights?: string[];
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type ExperienceSection = {
  type: "experience";
  title: string;
  icon?: string;
  items: ExperienceItem[];
};

export type ProjectsSection = {
  type: "projects";
  title: string;
  icon?: string;
  items: ProjectItem[];
};

export type EducationSection = {
  type: "education";
  title: string;
  icon?: string;
  items: EducationItem[];
};

export type SkillsSection = {
  type: "skills";
  title: string;
  icon?: string;
  groups: SkillGroup[];
};

export type ResumeSection =
  | ExperienceSection
  | ProjectsSection
  | EducationSection
  | SkillsSection;

export type Resume = {
  basics: {
    name: string;
    title: string;
    email?: string;
    phone?: string;
    location?: string;
    photo?: string;
    summary?: string;
    links?: ResumeLink[];
  };
  sections: ResumeSection[];
};
