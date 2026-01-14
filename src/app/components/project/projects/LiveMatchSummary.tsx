import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ProjectContentProps } from '../types/ProjectContentProps';
import { ProjectLayout } from '../shared/ProjectLayout';
import { liveMatchSummaryContent } from '../../../data/liveMatchSummaryContent';
import { getMarkdownComponents } from '../markdownComponents';
import { SECTION_CONTAINER } from '../sectionStyles';
import { FileText, Users, AlertCircle, Settings, CheckSquare } from 'lucide-react';

export const LiveMatchSummary: React.FC<ProjectContentProps> = (props) => {
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
                  {liveMatchSummaryContent.overview}
                </ReactMarkdown>
              </div>
              
              {/* Concept Image */}
              {props.project.conceptImage && (
                <div className="my-8">
                  <button
                    onClick={() => props.onImageClick(props.project.conceptImage!)}
                    className="block rounded-[24px] overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors cursor-pointer"
                  >
                    <img
                      src={props.project.conceptImage}
                      alt="Live Match Summary Concepts"
                      className="h-auto block rounded-[22px]"
                      loading="lazy"
                      width="1200"
                      height="800"
                    />
                  </button>
                  <p className="text-[#D6D6D6] text-sm italic text-center mt-2">Live Match Summary Concepts</p>
                </div>
              )}

              {/* Production Image */}
              {props.project.productionImage && (
                <div className="my-8">
                  <button
                    onClick={() => props.onImageClick(props.project.productionImage!)}
                    className="block rounded-[24px] overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors cursor-pointer"
                  >
                    <img
                      src={props.project.productionImage}
                      alt="Live Match Summary"
                      className="h-auto block rounded-[22px]"
                      loading="lazy"
                      width="1200"
                      height="800"
                    />
                  </button>
                  <p className="text-[#D6D6D6] text-sm italic text-center mt-2">Live Match Summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* User Needs Section */}
      <section id="user-needs" className="min-w-0">
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
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                  User need
                </h2>
              </div>
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={getMarkdownComponents(props.onImageClick)}>
                  {liveMatchSummaryContent.userNeeds}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="min-w-0">
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
                  Challenges
                </h2>
              </div>
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={getMarkdownComponents(props.onImageClick)}>
                  {liveMatchSummaryContent.challenges}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constraints Section */}
      <section id="constraints" className="min-w-0">
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
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                  Constraints
                </h2>
              </div>
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={getMarkdownComponents(props.onImageClick)}>
                  {liveMatchSummaryContent.constraints}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluations Section */}
      <section id="evaluations" className="min-w-0">
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
                  <CheckSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                  Evaluations
                </h2>
              </div>
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={getMarkdownComponents(props.onImageClick)}>
                  {liveMatchSummaryContent.evaluations}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProjectLayout>
  );
};


