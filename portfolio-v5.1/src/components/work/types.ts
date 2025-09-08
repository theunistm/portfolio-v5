// Common types for the work components

export interface Flow {
  page: string;
  interactions: string;
  challenge: string;
  solution: string;
  media: { 
    type: "video" | "image";
    src: string;
    poster?: string;
  };
}

export interface ProjectProps {
  title: string;
  icon: string; // SVG string or component
  categories: string[];
  duration: { 
    start: number; 
    end?: number;
    ongoing?: boolean;
  };
  summary: string;
  caseStudy: string; // HTML content for modal
  theme: { 
    color: string 
  };
  flows: Flow[];
}
