export interface CaseStudyPhase {
  title: string;
  description: string;
  image: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: string;
  role: string;
  duration: string;
  team: string;
  challenge: string;
  solution: string;
  impact: string[];
  process: CaseStudyPhase[];
  thumbnailImage?: string;
}