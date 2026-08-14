import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { NavBar } from "@/components/layout/NavBar";
import { PageOrbs } from "@/components/layout/PageOrbs";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WeatherAtmosphere } from "@/components/layout/WeatherAtmosphere";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { useWeather } from "@/hooks/useWeather";
import resumeData from "@/data/resume.json";
import { findSection } from "@/lib/format";
import type { Resume } from "@/types/resume";

const resume = resumeData as Resume;

export function App() {
  const weather = useWeather();
  const experience = findSection(resume.sections, "experience");
  const projects = findSection(resume.sections, "projects");
  const education = findSection(resume.sections, "education");
  const skills = findSection(resume.sections, "skills");

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", weather.theme.bg);
    root.style.setProperty("--bg-accent", weather.theme.bgAccent);
    root.style.setProperty("--weather-glass-boost", String(weather.theme.glassBoost));
    root.dataset.weather = weather.theme.kind;
    root.dataset.weatherDay = weather.theme.isDay ? "1" : "0";
  }, [weather.theme]);

  return (
    <SmoothScroll>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen text-label">
          <WeatherAtmosphere theme={weather.theme} />
          <PageOrbs theme={weather.theme} />
          <div className="relative z-1">
            <NavBar resume={resume} />
            <main className="page mx-auto flex max-w-5xl flex-col gap-16 px-5 pt-12 pb-24 md:gap-20 md:pt-16">
              <Hero basics={resume.basics} education={education?.items[0]} />
              {experience ? <Experience section={experience} /> : null}
              {projects ? <Projects section={projects} /> : null}
              {education ? <Education section={education} /> : null}
              {skills ? <Skills section={skills} /> : null}
              <Contact basics={resume.basics} />
            </main>
            <footer className="print:hidden px-5 pb-10 text-center text-[12px] text-secondary">
              Built like a Settings screen. Reads like a resume.
              {weather.temperatureC != null ? (
                <span className="mt-1 block opacity-70">
                  Outside: {Math.round(weather.temperatureC)}° · {weather.theme.label}
                </span>
              ) : null}
            </footer>
          </div>
        </div>
      </MotionConfig>
    </SmoothScroll>
  );
}
