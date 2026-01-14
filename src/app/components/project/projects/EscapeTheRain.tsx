import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ProjectContentProps } from '../types/ProjectContentProps';
import { ProjectLayout } from '../shared/ProjectLayout';
import { SkillsUsedSection } from '../sections/SkillsUsedSection';
import { PRDSection } from '../PRDSection';
import { escapeTheRainContent } from '../../../data/escapeTheRainContent';
import { getMarkdownComponents } from '../markdownComponents';
import { SECTION_CONTAINER } from '../sectionStyles';
import { FileText } from 'lucide-react';
import escapeTheRainMobileImg from '../../../../assets/Escape the rain mobile.png';
import escapeTheRainDesktopImg from '../../../../assets/Escape the rain desktop.png';

export const EscapeTheRain: React.FC<ProjectContentProps> = (props) => {
  // Create a modified project object with the new content
  const projectWithContent = {
    ...props.project,
    prd: escapeTheRainContent.prd,
  };

  return (
    <ProjectLayout>
      {/* Product Overview Section - Simple, no conditional logic */}
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
                  {escapeTheRainContent.overview}
                </ReactMarkdown>
              </div>
              
              {/* Product Screenshots - Mobile and Desktop */}
              <div className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mobile Screenshot */}
                <div>
                  <button
                    onClick={() => props.onImageClick(escapeTheRainMobileImg)}
                    className="block rounded-[24px] overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors cursor-pointer w-full"
                  >
                    <img
                      src={escapeTheRainMobileImg}
                      alt="Escape the Rain - Mobile View"
                      className="w-full h-auto block rounded-[22px]"
                      loading="lazy"
                    />
                  </button>
                  <p className="text-[#D6D6D6] text-sm italic text-center mt-2">Mobile View</p>
                </div>
                
                {/* Desktop Screenshot */}
                <div>
                  <button
                    onClick={() => props.onImageClick(escapeTheRainDesktopImg)}
                    className="block rounded-[24px] overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors cursor-pointer w-full"
                  >
                    <img
                      src={escapeTheRainDesktopImg}
                      alt="Escape the Rain - Desktop View"
                      className="w-full h-auto block rounded-[22px]"
                      loading="lazy"
                    />
                  </button>
                  <p className="text-[#D6D6D6] text-sm italic text-center mt-2">Desktop View</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkillsUsedSection 
        content={escapeTheRainContent.skills} 
        onImageClick={props.onImageClick} 
      />
      
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
