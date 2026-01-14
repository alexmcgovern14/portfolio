import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ProjectContentProps } from '../types/ProjectContentProps';
import { ProjectLayout } from '../shared/ProjectLayout';
import { portfolioWebsiteContent } from '../../../data/portfolioWebsiteContent';
import { getMarkdownComponents } from '../markdownComponents';
import { SECTION_CONTAINER } from '../sectionStyles';
import { FileText, AlertCircle } from 'lucide-react';

export const PortfolioWebsite: React.FC<ProjectContentProps> = (props) => {
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
                  {portfolioWebsiteContent.overview}
                </ReactMarkdown>
              </div>
              
              {/* PRD Section inline */}
              <div className="mt-8 prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={getMarkdownComponents(props.onImageClick)}>
                  {portfolioWebsiteContent.prd}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow/Challenge Section */}
      <section id="workflow" className="min-w-0">
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
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                  Workflow
                </h2>
              </div>
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={getMarkdownComponents(props.onImageClick)}>
                  {portfolioWebsiteContent.challenge}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProjectLayout>
  );
};

