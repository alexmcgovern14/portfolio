export interface TitlePart {
  text: string;
  gradient: boolean;
}

export interface Project {
  slug: string;
  title: string;
  titleParts?: TitlePart[];
  description: string;
  category: string;
  imageUrl: string;
  overview?: string;
  skills?: string;
  githubUrl?: string;
  substackUrl?: string;
  prd?: string;
  n8nJson?: string;
  conceptImage?: string;
  playlistImage?: string;
  productionImage?: string;
  workflowImage1?: string;
  workflowImage2?: string;
  keyInfo?: string;
  challenge?: string;
  constraints?: string;
  evaluations?: string;
}




