import type { Resume } from "@/types/resume";

export type ContactIcon = "email" | "phone" | "location" | "github" | "link";

export type ContactItem = {
  id: string;
  icon: ContactIcon;
  label: string;
  value: string;
  href?: string;
};

export function getContactItems(basics: Resume["basics"]): ContactItem[] {
  const items: ContactItem[] = [];

  if (basics.email) {
    items.push({
      id: "email",
      icon: "email",
      label: "Email",
      value: basics.email,
      href: `mailto:${basics.email}`,
    });
  }
  if (basics.phone) {
    items.push({
      id: "phone",
      icon: "phone",
      label: "Phone",
      value: basics.phone,
      href: `tel:${basics.phone}`,
    });
  }
  if (basics.location) {
    items.push({
      id: "location",
      icon: "location",
      label: "Location",
      value: basics.location,
    });
  }
  for (const link of basics.links ?? []) {
    if (!link.url) continue;
    items.push({
      id: link.url,
      icon: link.icon === "github" ? "github" : "link",
      label: link.icon === "github" ? "GitHub" : link.label,
      value: link.label,
      href: link.url,
    });
  }

  return items;
}
