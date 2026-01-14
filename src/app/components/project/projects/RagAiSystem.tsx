import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ProjectContentProps } from '../types/ProjectContentProps';
import { ProjectLayout } from '../shared/ProjectLayout';
import { ragAiSystemContent } from '../../../data/ragAiSystemContent';
import { getMarkdownComponents } from '../markdownComponents';
import { SECTION_CONTAINER } from '../sectionStyles';
import { FileText, Code2 } from 'lucide-react';
import { PRDSection } from '../PRDSection';
import { ProjectWorkflowsSection } from '../sections/ProjectWorkflowsSection';

export const RagAiSystem: React.FC<ProjectContentProps> = (props) => {
  // Create a modified project object with the new content
  const projectWithContent = {
    ...props.project,
    prd: ragAiSystemContent.prd,
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
                  {ragAiSystemContent.overview}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-w-0">
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
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                  Skills used
                </h2>
              </div>
              <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-[#D6D6D6] leading-relaxed">
                  {ragAiSystemContent.skills}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <ProjectWorkflowsSection 
        project={props.project}
        slug={props.project.slug}
        onImageClick={props.onImageClick}
      />

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


