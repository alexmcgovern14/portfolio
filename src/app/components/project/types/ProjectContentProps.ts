import type { Project } from '../../../types/project';

export interface ProjectContentProps {
  project: Project;
  slug: string;
  viewMode: 'text' | 'markdown';
  copied: boolean;
  copiedJson: boolean;
  onCopyPRD: () => void;
  onCopyN8nJson: () => void;
  onViewModeChange: (mode: 'text' | 'markdown') => void;
  onImageClick: (imageSrc: string) => void;
}
