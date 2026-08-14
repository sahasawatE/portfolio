import type { ReactNode, SVGProps } from "react";
import {
  Brain,
  Chevron,
  Folder,
  Gear,
  Message,
  Phone,
  SquarePencil,
} from "react-ios-icons";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type SvgIconProps = SVGProps<SVGSVGElement>;

function CustomIcon({
  children,
  filled,
  className,
  ...props
}: SvgIconProps & { filled?: boolean; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...(filled ? { fill: "currentColor" } : stroke)}
      {...props}
    >
      {children}
    </svg>
  );
}

const customIcons = {
  location: (props: SvgIconProps) => (
    <CustomIcon {...props}>
      <path d="M20 10.5c0 6-8 11.5-8 11.5s-8-5.5-8-11.5a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </CustomIcon>
  ),
  github: (props: SvgIconProps) => (
    <CustomIcon filled {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </CustomIcon>
  ),
  npm: (props: SvgIconProps) => (
    <CustomIcon filled {...props}>
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
    </CustomIcon>
  ),
  print: (props: SvgIconProps) => (
    <CustomIcon {...props}>
      <path d="M7 9V3.5h10V9" />
      <path d="M7 18H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="7" y="14.5" width="10" height="6" rx="1" />
    </CustomIcon>
  ),
  download: (props: SvgIconProps) => (
    <CustomIcon {...props}>
      <path d="M12 3.5v11" />
      <path d="M7.5 10.5l4.5 4.5 4.5-4.5" />
      <path d="M4 19.5h16" />
    </CustomIcon>
  ),
  link: (props: SvgIconProps) => (
    <CustomIcon {...props}>
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
    </CustomIcon>
  ),
};

type LibraryIconProps = { className?: string };

const libraryIcons = {
  email: (props: LibraryIconProps) => <Message aria-hidden="true" {...props} />,
  phone: (props: LibraryIconProps) => <Phone aria-hidden="true" {...props} />,
  chevron: (props: LibraryIconProps) => (
    <Chevron direction="right" aria-hidden="true" {...props} />
  ),
  work: (props: LibraryIconProps) => (
    <SquarePencil aria-hidden="true" {...props} />
  ),
  project: (props: LibraryIconProps) => <Folder aria-hidden="true" {...props} />,
  education: (props: LibraryIconProps) => <Brain aria-hidden="true" {...props} />,
  skills: (props: LibraryIconProps) => <Gear aria-hidden="true" {...props} />,
};

const icons = { ...customIcons, ...libraryIcons };

export type IconName = keyof typeof icons;

export function isIconName(name: string | undefined): name is IconName {
  return Boolean(name && name in icons);
}

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, className }: IconProps) {
  const Glyph = icons[name];
  return <Glyph className={className} />;
}
