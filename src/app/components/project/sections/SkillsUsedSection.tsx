import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getMarkdownComponents } from '../markdownComponents';
import { SECTION_CONTAINER } from '../sectionStyles';
import { Code2 } from 'lucide-react';

interface SkillsUsedSectionProps {
  content: string;
  onImageClick?: (imageSrc: string) => void;
}

export function SkillsUsedSection({ content, onImageClick }: SkillsUsedSectionProps) {
  return (
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
              <ReactMarkdown components={getMarkdownComponents(onImageClick)}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
