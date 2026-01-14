import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ProjectContentProps } from '../types/ProjectContentProps';
import { ProjectLayout } from '../shared/ProjectLayout';
import { spotifyRecommendationEngineContent } from '../../../data/spotifyRecommendationEngineContent';
import { getMarkdownComponents } from '../markdownComponents';
import { SECTION_CONTAINER } from '../sectionStyles';
import { FileText } from 'lucide-react';
import { PRDSection } from '../PRDSection';

export const SpotifyRecommendationEngine: React.FC<ProjectContentProps> = (props) => {
  // Create a modified project object with the new content
  const projectWithContent = {
    ...props.project,
    prd: spotifyRecommendationEngineContent.prd,
  };

  return (
    <ProjectLayout>
      {/* Product Overview Section */}
      <section id="overview" className="min-w-0">
        <div className="overflow-hidden rounded-[24px]">
          <div 
            className={`${SECTION_CONTAINER.outer}`}
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
            }}
          >
            <div 
              className={`${SECTION_CONTAINER.inner}`}
              style={{
                background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                  Product overview
                </h2>
              </div>
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={getMarkdownComponents(props.onImageClick)}>
                  {spotifyRecommendationEngineContent.overview}
                </ReactMarkdown>
              </div>
              
              {/* Playlist Image */}
              {props.project.playlistImage && (
                <div className="my-8">
                  <button
                    onClick={() => props.onImageClick(props.project.playlistImage!)}
                    className="block rounded-[24px] overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors cursor-pointer"
                  >
                    <img
                      src={props.project.playlistImage}
                      alt="Spotify Recommended Artists Playlist"
                      className="h-auto block rounded-[22px]"
                      loading="lazy"
                      width="1200"
                      height="800"
                    />
                  </button>
                  <p className="text-[#D6D6D6] text-sm italic text-center mt-2">Recommended Artists Playlist</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRD Section */}
      <PRDSection 
        project={projectWithContent}
        viewMode={props.viewMode}
        copied={props.copied}
        onCopyPRD={props.onCopyPRD}
        onViewModeChange={props.onViewModeChange}
        onImageClick={props.onImageClick}
      />
    </ProjectLayout>
  );
};

