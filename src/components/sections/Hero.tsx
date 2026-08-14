import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { publicUrl } from "@/lib/assets";
import { getContactItems } from "@/lib/contacts";
import type { EducationItem, Resume } from "@/types/resume";

type HeroProps = {
  basics: Resume["basics"];
  education?: EducationItem;
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Hero({ basics, education }: HeroProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoSrc = basics.photo ? publicUrl(basics.photo) : "";
  const showPhoto = Boolean(photoSrc) && !photoFailed;
  const contacts = getContactItems(basics);

  return (
    <section
      id="top"
      className="hero grid items-end gap-10 md:grid-cols-[1fr_auto]"
    >
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
      >
        <motion.p
          variants={rise}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-secondary"
        >
          Portfolio
        </motion.p>
        <motion.h1
          variants={rise}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hero__name text-[clamp(2.4rem,7vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-label"
        >
          {basics.name}
        </motion.h1>
        <motion.p
          variants={rise}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hero__title mt-3 text-[21px] font-medium text-blue"
        >
          {basics.title}
        </motion.p>
        {education ? (
          <motion.p
            variants={rise}
            className="mt-2 text-[15px] text-secondary"
          >
            {education.degree}
            {education.institution ? ` · ${education.institution}` : ""}
          </motion.p>
        ) : null}
        {basics.summary ? (
          <motion.p
            variants={rise}
            className="mt-5 max-w-xl text-[17px] leading-relaxed text-secondary"
          >
            {basics.summary}
          </motion.p>
        ) : null}

        <motion.ul
          variants={rise}
          className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-secondary"
        >
          {contacts.map((item) => (
            <li key={item.id} className="inline-flex items-center gap-1.5">
              <Icon name={item.icon} className="h-4 w-4 text-blue" />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-label no-underline hover:text-blue"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <span>{item.value}</span>
              )}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {showPhoto ? (
        <motion.img
          className="hero__photo h-36 w-36 rounded-ios object-cover shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:h-44 md:w-44"
          src={photoSrc}
          alt={basics.name}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.18 }}
          onError={() => setPhotoFailed(true)}
        />
      ) : null}
    </section>
  );
}
