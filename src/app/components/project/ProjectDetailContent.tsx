import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, FileText, Code2, Workflow } from 'lucide-react';
import type { Project } from '../../types/project';
import workflowIngestion from '../../../assets/1dad7059420c1200f434ef05c34bb334b30cabd9.png';
import workflowChat from '../../../assets/f69fa785f0984779afcf647e0664899405374bcc.png';
import techStackWorkflow from '../../../assets/7b8ec670f643305d755f75159ea0e007717528a6.png';
import { ConstraintsAndEvals } from './ConstraintsAndEvals';

interface ProjectDetailContentProps {
  project: Project;
  slug: string;
  viewMode: 'text' | 'markdown';
  copied: boolean;
  copiedJson: boolean;
  onCopyPRD: () => void;
  onCopyN8nJson: () => void;
  onViewModeChange: (mode: 'text' | 'markdown') => void;
  onExpandImage: () => void;
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
    <p className="text-[#d4d4d4] leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 space-y-2 list-disc pl-6 text-[#d4d4d4]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 space-y-2 list-decimal pl-6 text-[#d4d4d4]">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-[#d4d4d4] leading-relaxed pl-2">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#3a3638] py-5 rounded-r-lg text-[#e8e8e8] text-lg">
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
      <span className="block rounded-xl overflow-hidden border-2 border-white/30">
        <img src={src} alt={alt || ''} className="w-full h-auto block" loading="lazy" width="1200" height="675" />
      </span>
    </span>
  ),
};

export function ProjectDetailContent({
  project,
  slug,
  viewMode,
  copied,
  copiedJson,
  onCopyPRD,
  onCopyN8nJson,
  onViewModeChange,
  onExpandImage,
}: ProjectDetailContentProps) {
  // Early return if project or slug is undefined
  if (!project || !slug) {
    return null;
  }
  
  return (
    <main className="lg:col-span-3 space-y-12" role="main">
      {/* Overview Card */}
      <section id="overview" className="scroll-mt-24">
        <div 
          className="rounded-2xl p-8 shadow-xl border-2 border-white/30"
          style={{
            background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
              Product Overview
            </h2>
          </div>
          <div className="prose prose-lg max-w-none prose-invert">
            <ReactMarkdown components={markdownComponents}>
              {project.overview}
            </ReactMarkdown>
            {slug === 'live-match-summary' && 'conceptImage' in project && (
              <div className="my-8">
                <div className="rounded-xl overflow-hidden border-2 border-white/30 p-0">
                  <img src={project.conceptImage} alt="Initial concept designs for live match summary feature" className="w-full h-auto block" loading="lazy" width="1200" height="675" />
                </div>
                <p className="text-[#b8b8b8] text-sm italic text-center mt-2">Initial concept designs</p>
              </div>
            )}
            {slug === 'spotify-recommendation-engine' && 'playlistImage' in project && project.playlistImage && (
              <div className="my-8">
                <div className="rounded-xl overflow-hidden border-2 border-white/30 p-0">
                  <img src={project.playlistImage} alt="Generated playlist seen on Spotify" className="w-full h-auto block" loading="lazy" width="1200" height="675" />
                </div>
                <p className="text-[#b8b8b8] text-sm italic text-center mt-2">Generated playlist seen on Spotify</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Card */}
      {project && 'skills' in project && (
        <section id="skills" className="scroll-mt-24">          <div             className="rounded-2xl p-8 shadow-xl border-2 border-white/30"            style={{              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',            }}          >            <div className="flex items-center gap-3 mb-6">              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">                <Code2 className="w-5 h-5 text-white" />              </div>              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">                Skills used              </h2>            </div>            <p className="text-[#d4d4d4] text-lg leading-relaxed">              {project.skills}            </p>          </div>        </section>      )}            {/* Workflows Section */}
      {slug === 'rag-ai-system' && (
        <section id="workflows" className="scroll-mt-24">          <div             className="rounded-2xl p-8 shadow-xl border-2 border-white/30"            style={{              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',            }}          >            <div className="flex items-center gap-3 mb-6">              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">                <Workflow className="w-5 h-5 text-white" />              </div>              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">                System workflows              </h2>            </div>
            
            <div className="space-y-6">              <div>                <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-xl text-white mb-3">                  Workflow 1: Ingestion & Vectorisation                </h3>                <p className="text-[#d4d4d4] mb-4 leading-relaxed">                  Data pipeline that extracts content from Notion, generates embeddings, and stores vectors in Supabase for semantic search.                </p>                <div className="rounded-xl overflow-hidden border-2 border-white/30">                  <img                    src={workflowIngestion}                    alt="n8n workflow for data ingestion and vectorization"                    className="w-full h-auto"                    loading="lazy"                    width="1200"                    height="800"                  />                </div>              </div>              <div>                <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-xl text-white mb-3">                  Workflow 2: Query & Synthesis                </h3>                <p className="text-[#d4d4d4] mb-4 leading-relaxed">                  Chat interface that embeds user queries, retrieves relevant excerpts, and generates grounded responses with full source traceability.                </p>                <div className="rounded-xl overflow-hidden border-2 border-white/30">                  <img                    src={workflowChat}                    alt="n8n workflow for chat and retrieval"                    className="w-full h-auto"                    loading="lazy"                    width="1200"                    height="800"                  />                </div>              </div>            </div>          </div>        </section>      )}
      {/* User Needs Section */}
      {slug === 'live-match-summary' && (
        <section id="user-needs" className="scroll-mt-24">
          <div 
            className="rounded-2xl p-8 shadow-xl border-2 border-white/30"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                User need
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-[#d4d4d4] text-lg leading-relaxed">
                Live sports has an old, universal user need: quickly understand the match narrative right now. Pure data lacks narrative, and traditional commentary feeds lack detail.
              </p>
              
              <div>
                <p className="text-[#d4d4d4] text-lg font-semibold mb-2">Example scenarios:</p>
                <ul className="space-y-2 text-[#d4d4d4] text-lg leading-relaxed list-disc pl-6">
                  <li className="pl-2">User can't watch the game, wants to quickly get up to speed on what's happening</li>
                  <li className="pl-2">User thinking about switching on the TV to watch, wants to know if worth watching or not</li>
                  <li className="pl-2">User interested in placing in-play bet, wants to understand momentum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Constraints and Evals Section (for live-match-summary) */}
      {slug === 'live-match-summary' && project && 'constraints' in project && 'evaluations' in project && (
        <ConstraintsAndEvals
          constraints={project.constraints || ''}
          evaluations={project.evaluations || ''}
        />
      )}


      {/* PRD Section */}
      {project && 'prd' in project && slug !== 'live-match-summary' && slug !== 'lineup-changes' && slug !== 'portfolio-website' && (
        <section id="prd" className="scroll-mt-24">
          <div 
            className="rounded-2xl shadow-xl overflow-hidden border-2 border-white/30"
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
                          : 'text-[#b8b8b8] hover:text-white'
                      }`}
                    >
                      Formatted
                    </button>
                    <button
                      onClick={() => onViewModeChange('markdown')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'markdown'
                          ? 'bg-[#8a8686] text-white'
                          : 'text-[#b8b8b8] hover:text-white'
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
                        : 'bg-[#4a4647] text-white hover:text-[#d4d4d4]'
                    }`}
                    style={!copied ? { border: '1px solid #8a8686' } : {}}
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
                <pre className="whitespace-pre-wrap font-mono text-sm text-[#d4d4d4] bg-[#1a1a1a] p-6 rounded-lg overflow-x-auto">
                  {project.prd}
                </pre>
              )}
            </div>
          </div>
        </section>
      )}


      {/* Key Info Section for lineup-changes */}
      {slug === 'lineup-changes' && project && 'keyInfo' in project && (
        <section id="key-info" className="scroll-mt-24">
          <div 
            className="rounded-2xl p-8 shadow-xl border-2 border-white/30"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                Key info
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none prose-invert">
              <ReactMarkdown components={markdownComponents}>
                {project.keyInfo}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* Output Challenges Section */}
      {slug === 'live-match-summary' && (
        <section id="output-challenges" className="scroll-mt-24">
          <div 
            className="rounded-2xl p-8 shadow-xl border-2 border-white/30"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                Challenges
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none prose-invert">
              <ReactMarkdown
                components={{
                  ...markdownComponents,
                  h2: ({ children }: { children: React.ReactNode }) => (
                    <h2 className="text-xl font-semibold text-white mb-3 mt-8">
                      {children}
                    </h2>
                  ),
                  blockquote: ({ children }: { children: React.ReactNode }) => (
                    <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#00a1ff]/10 py-4 rounded-r-lg text-[#d4d4d4]">
                      {children}
                    </blockquote>
                  ),
                  em: ({ children }: { children: React.ReactNode }) => (
                    <em className="italic text-[#d4d4d4]">{children}</em>
                  ),
                }}
              >
                {project.prd.split('# Challenges')[1].replace(/^[\s\n]*/, '')}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* Challenge Section for lineup-changes */}
      {slug === 'lineup-changes' && project && 'challenge' in project && (
        <section id="lineup-challenge" className="scroll-mt-24">
          <div 
            className="rounded-2xl p-8 shadow-xl border-2 border-white/30"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                Challenge
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none prose-invert">
              <ReactMarkdown components={markdownComponents}>
                {project.challenge}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Section for portfolio-website */}
      {slug === 'portfolio-website' && project && 'challenge' in project && (
        <section id="tech-stack" className="scroll-mt-24">
          <div 
            className="rounded-2xl p-8 shadow-xl border-2 border-white/30"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
                Tech Stack
              </h2>
            </div>
            
            <div className="mb-8">
              <p className="text-[#d4d4d4] leading-relaxed mb-4">
                Diagram shows end-to-end tooling for each stage:
              </p>
              <img 
                src={techStackWorkflow} 
                alt="Tech stack workflow diagram" 
                className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={onExpandImage}
                width="1200"
                height="800"
              />
            </div>
            
            <div className="prose prose-lg max-w-none prose-invert">
              <ReactMarkdown
                components={{
                  ...markdownComponents,
                  img: ({ src, alt }: { src?: string; alt?: string }) => (
                    <img src={src} alt={alt || ''} className="w-full rounded-lg my-8" loading="lazy" width="1200" height="675" />
                  ),
                }}
              >
                {project.challenge}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}


