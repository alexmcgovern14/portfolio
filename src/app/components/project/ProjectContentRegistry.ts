import React from 'react';
import type { ProjectContentProps } from './types/ProjectContentProps';
import { EscapeTheRain } from './projects/EscapeTheRain';
import { LineupInsights } from './projects/LineupInsights';
import { LiveMatchSummary } from './projects/LiveMatchSummary';
import { RagAiSystem } from './projects/RagAiSystem';
import { SpotifyRecommendationEngine } from './projects/SpotifyRecommendationEngine';
import { PortfolioWebsite } from './projects/PortfolioWebsite';

// Type alias for project components
type ProjectContentComponent = React.FC<ProjectContentProps>;

export const projectContentBySlug: Record<string, ProjectContentComponent> = {
  'escape-the-rain': EscapeTheRain,
  'lineup-insights': LineupInsights,
  'live-match-summary': LiveMatchSummary,
  'rag-ai-system': RagAiSystem,
  'spotify-recommendation-engine': SpotifyRecommendationEngine,
  'portfolio-website': PortfolioWebsite,
};
