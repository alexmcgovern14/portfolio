import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, FileText } from 'lucide-react';
import type { Project } from '../../types/project';

interface PRDSectionProps {
  project: Project;
  viewMode: 'text' | 'markdown';
  copied: boolean;
  onCopyPRD: () => void;
  onViewModeChange: (mode: 'text' | 'markdown') => void;
}

// Shared markdown components for consistent styling
const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-12 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-white mb-3 mt-8">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[#D6D6D6] leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 space-y-2 list-disc pl-6 text-[#D6D6D6]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 space-y-2 list-decimal pl-6 text-[#D6D6D6]">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-[#D6D6D6] leading-relaxed pl-2">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#3a3638] py-5 rounded-r-lg text-[#D6D6D6] text-lg">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  hr: () => (
    <hr className="my-8" style={{ borderColor: '#8a8686' }} />
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-white">
      {children}
    </strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="not-italic font-semibold text-white">{children}</em>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <span className="block my-8">
      <span className="block rounded-[24px] p-[2px] overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
        }}
      >
        <span className="block rounded-[22px] overflow-hidden">
          <img src={src} alt={alt || ''} className="w-full h-auto block" loading="lazy" width="1200" height="675" />
        </span>
      </span>
    </span>
  ),
};

export function PRDSection({ project, viewMode, copied, onCopyPRD, onViewModeChange }: PRDSectionProps) {
  return (
    <section id="prd" className="scroll-mt-24">
      <div 
        className="rounded-[24px] p-[2px] shadow-xl overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
        }}
      >
        <div className="rounded-[22px] shadow-xl overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
          }}
        >
          <div className="px-8 py-6" style={{ borderBottom: '1px solid #8a8686' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                  Product Requirements Document
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-lg p-0.5 bg-[#4a4647]" style={{ border: '1px solid #8a8686' }}>
                  <button
                    onClick={() => onViewModeChange('text')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === 'text'
                        ? 'bg-[#8a8686] text-white'
                        : 'text-[#D6D6D6] hover:text-white'
                    }`}
                  >
                    Formatted
                  </button>
                  <button
                    onClick={() => onViewModeChange('markdown')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === 'markdown'
                        ? 'bg-[#8a8686] text-white'
                        : 'text-[#D6D6D6] hover:text-white'
                    }`}
                  >
                    Markdown
                  </button>
                </div>
                
                <button
                  onClick={onCopyPRD}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    copied
                      ? 'bg-gradient-to-r from-[#00a1ff] to-[#00ff6f] text-black'
                      : 'bg-[#4a4647] text-white hover:text-[#D6D6D6]'
                  }`}                  style={!copied ? { border: '1px solid #8a8686' } : {}}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied PRD
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy PRD
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {viewMode === 'text' ? (
              <div className="prose prose-lg max-w-none prose-invert">
                <ReactMarkdown components={markdownComponents}>
                  {project.prd}
                </ReactMarkdown>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap font-mono text-sm text-[#D6D6D6] bg-[#1a1a1a] p-6 rounded-lg overflow-x-auto">
                {project.prd}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
