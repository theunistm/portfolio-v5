// Common types for the work components

export type Media = {
  type: 'image' | 'video';
  src: string;
};

export interface Flow {
  page: string;
  interactions?: string;
  challenge: string;
  solution: string;
  media: Media;
  iconType?: 'play' | 'image' | 'view'; // Optional icon type, defaults to 'play'
}

export type ProjectTheme = { color: string; hoverColor: string };
export type ProjectDuration = { start: number; end?: number; ongoing?: boolean };
export type ProjectStage = {
  label: string;
  fill: string;
  stroke: string;
};

export interface ProjectProps {
  order: number; // used for sorting 6 -> 1
  title: string;
  icon: string; // inline SVG string via ?raw
  categories: string[];
  duration: ProjectDuration;
  summary: string;
  caseStudy: string; // HTML string for modal
  theme: ProjectTheme;
  flows: Flow[];
  downloadLink?: string; // Optional download link for apps
  stage: ProjectStage;
}
