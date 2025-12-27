import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Copy, Check, Github, FileText, Code2, Workflow } from 'lucide-react';
import { projects } from '../data/projects';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useClipboard } from '../hooks/useClipboard';

// Import workflow images
import workflowIngestion from '../../assets/1dad7059420c1200f434ef05c34bb334b30cabd9.png';
import workflowChat from '../../assets/f69fa785f0984779afcf647e0664899405374bcc.png';
import liveMatchConcepts from '../../assets/3ecaddebe46e909d183a56db9afa1a1dbe33ff00.png';
import techStackWorkflow from '../../assets/7b8ec670f643305d755f75159ea0e007717528a6.png';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'text' | 'markdown'>('text');
  const [expandedImage, setExpandedImage] = useState(false);

  const project = projects.find(p => p.slug === slug);

  const { copied, copyToClipboard: handleCopyToClipboard } = useClipboard();
  const { copied: copiedJson, copyToClipboard: handleCopyJsonToClipboard } = useClipboard();

  const { activeSection, isScrolled } = useScrollSpy(
    ['overview', 'skills', 'workflows', 'user-needs', 'key-info', 'requirements', 'output-challenges', 'lineup-challenge', 'tech-stack']
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ESC key to close expanded image
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedImage) {
        setExpandedImage(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedImage]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleCopyPRD = () => {
    if (!project?.prd) {
      return;
    }
    handleCopyToClipboard(project.prd, 'PRD copied to clipboard!');
  };

  const handleCopyN8nJson = () => {
    if (project && 'n8nJson' in project && project.n8nJson) {
      handleCopyJsonToClipboard(project.n8nJson, 'n8n JSON copied to clipboard!');
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f0eae1] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl text-[#5a5452] mb-4">
            Project Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#5a5452] hover:text-[#00a1ff] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2a2628]">
      {/* Integrated Header Section */}
      <header className={`sticky top-0 z-50 bg-[#2a2628]/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`} style={{ borderBottom: '1px solid rgba(108, 105, 106, 0.3)' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Navigation */}
          <div className="py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#b8b8b8] hover:text-[#00a1ff] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </Link>
          </div>

          {/* Title and Metadata - Collapses on scroll */}
          <div 
            className={`transition-all duration-500 ease-in-out ${
              isScrolled 
                ? 'h-0 opacity-0' 
                : 'h-auto opacity-100 pb-6'
            }`}
            style={{
              overflow: 'hidden',
            }}
          >
            <h1 className="font-['Instrument_Serif:Regular',sans-serif] text-5xl text-[rgb(255,255,255)] mb-4 leading-tight">
              {project.title}
            </h1>
            {/* Subheading for rag-ai-system */}
            {slug === 'rag-ai-system' && (
              <p className="text-[#d4d4d4] text-xl mb-6 leading-relaxed">
                LLM semantic search through vectorised data
              </p>
            )}
            {/* Subheading for live-match-summary */}
            {slug === 'live-match-summary' && (
              <p className="text-[#d4d4d4] text-xl mb-6 leading-relaxed">
                Case study in building AI features: data-led live updates for football matches
              </p>
            )}
            {/* Subheading for lineup-changes */}
            {slug === 'lineup-changes' && (
              <p className="text-[#d4d4d4] text-xl mb-6 leading-relaxed">
                Case study in building with LLMs, model limitations and building effective systems.
              </p>
            )}
            {/* Subheading for e-commerce-platform (This website) */}
            {slug === 'e-commerce-platform' && (
              <p className="text-[#d4d4d4] text-xl mb-6 leading-relaxed">
                Full-stack design, development and deployment
              </p>
            )}
            {/* Subheading for spotify-recommendation-engine */}
            {slug === 'spotify-recommendation-engine' && (
              <p className="text-[#d4d4d4] text-xl mb-6 leading-relaxed">
                Solving my own need for better recommendations on Spotify
              </p>
            )}
            {/* Single pill for LiveScore features or Personal project for others and GitHub button */}
            <div className="flex items-center gap-4">
              <div 
                className="backdrop-blur-[2px] rounded-[100px] inline-block shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)'
                }}
              >
                <div className="flex flex-row items-center justify-center">
                  <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative">
                    <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
                      {(slug === 'live-match-summary' || slug === 'lineup-changes') ? 'LiveScore feature' : 'Personal project'}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-[-0.25px] pointer-events-none shadow-[inset_0px_-4px_4px_0px_rgba(0,0,0,0.25),inset_0px_4px_4px_0px_rgba(255,255,255,0.1)] rounded-[100px]" />
              </div>
              
              {project && 'githubUrl' in project && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00a1ff] to-[#00ff6f] text-black hover:opacity-90 transition-opacity px-4 py-2 rounded-lg font-medium text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div 
                className="rounded-2xl p-6 shadow-xl border-2 border-white/30"
                style={{
                  background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
                }}
              >
                <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-lg text-white mb-4">
                  Contents
                </h3>
                <nav className="space-y-2">
                  <button
                    onClick={() => scrollToSection('overview')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === 'overview'
                        ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                    }`}
                  >
                    Overview
                  </button>
                  {project && 'skills' in project && (
                    <button
                      onClick={() => scrollToSection('skills')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'skills'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      Skills used
                    </button>
                  )}
                  {slug === 'rag-ai-system' && (
                    <button
                      onClick={() => scrollToSection('workflows')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'workflows'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      Workflows
                    </button>
                  )}
                  {slug === 'live-match-summary' && (
                    <button
                      onClick={() => scrollToSection('user-needs')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'user-needs'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      User need
                    </button>
                  )}
                  {slug === 'lineup-changes' && (
                    <button
                      onClick={() => scrollToSection('key-info')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'key-info'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      Key info
                    </button>
                  )}
                  {slug === 'live-match-summary' && (
                    <button
                      onClick={() => scrollToSection('output-challenges')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'output-challenges'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      Challenges
                    </button>
                  )}
                  {slug === 'lineup-changes' && (
                    <button
                      onClick={() => scrollToSection('lineup-challenge')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'lineup-challenge'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      Challenge
                    </button>
                  )}
                  {slug === 'e-commerce-platform' && (
                    <button
                      onClick={() => scrollToSection('tech-stack')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'tech-stack'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      Tech Stack
                    </button>
                  )}
                  {project && 'prd' in project && (
                    <button
                      onClick={() => scrollToSection('prd')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === 'prd'
                          ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      PRD
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            
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
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-12 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-white mb-3 mt-8">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-[#d4d4d4] leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-4 space-y-2 list-disc pl-6 text-[#d4d4d4]">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="my-4 space-y-2 list-decimal pl-6 text-[#d4d4d4]">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-[#d4d4d4] leading-relaxed pl-2">
                          {children}
                        </li>
                      ),
                      code: ({ children }) => (
                        <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
                          {children}
                        </code>
                      ),
                      hr: () => (
                        <hr className="my-8" style={{ borderColor: '#8a8686' }} />
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => {
                        const text = String(children);
                        // Italicize "what's happening in this match?"
                        if (text.includes("what's happening in this match?") || text === "what's happening in this match?") {
                          return <em className="italic text-[#d4d4d4]">{children}</em>;
                        }
                        return <em className="not-italic font-semibold text-white">{children}</em>;
                      },
                      img: ({ src, alt }) => (
                        <span className="block my-8">
                          <span className="block rounded-xl overflow-hidden border-2 border-white/30">
                            <img src={src} alt={alt || ''} className="w-full h-auto block" loading="lazy" />
                          </span>
                        </span>
                      ),
                    }}
                  >
                    {project.overview}
                  </ReactMarkdown>
                  {/* Concept image for live-match-summary in overview */}
                  {slug === 'live-match-summary' && 'conceptImage' in project && (
                    <div className="my-8">
                      <div className="rounded-xl overflow-hidden border-2 border-white/30">
                        <img src={project.conceptImage} alt="Initial concept designs for live match summary feature" className="w-full h-auto block" loading="lazy" />
                      </div>
                      <p className="text-[#b8b8b8] text-sm italic text-center mt-2">Initial concept designs</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Skills Card */}
            {project && 'skills' in project && (
              <section id="skills" className="scroll-mt-24">
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
                      Skills used
                    </h2>
                  </div>
                  <p className="text-[#d4d4d4] text-lg leading-relaxed">
                    {project.skills}
                  </p>
                </div>
              </section>
            )}

            {/* Workflows Section */}
            {slug === 'rag-ai-system' && (
              <section id="workflows" className="scroll-mt-24">
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
                      System workflows
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Workflow 1 */}
                    <div>
                      <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-xl text-white mb-3">
                        Workflow 1: Ingestion & Vectorisation
                      </h3>
                      <p className="text-[#d4d4d4] mb-4 leading-relaxed">
                        Data pipeline that extracts content from Notion, generates embeddings, and stores vectors in Supabase for semantic search.
                      </p>
                      <div className="rounded-xl overflow-hidden border-2 border-white/30">
                        <img
                          src={workflowIngestion}
                          alt="n8n workflow for data ingestion and vectorization"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Workflow 2 */}
                    <div>
                      <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-xl text-white mb-3">
                        Workflow 2: Query & Synthesis
                      </h3>
                      <p className="text-[#d4d4d4] mb-4 leading-relaxed">
                        Chat interface that embeds user queries, retrieves relevant excerpts, and generates grounded responses with full source traceability.
                      </p>
                      <div className="rounded-xl overflow-hidden border-2 border-white/30">
                        <img
                          src={workflowChat}
                          alt="n8n workflow for chat and retrieval"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* PRD Section */}
            {project && 'prd' in project && (
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
                        {/* Format Toggle - Single segmented control */}
                        <div className="inline-flex rounded-lg p-0.5 bg-[#4a4647]" style={{ border: '1px solid #8a8686' }}>
                          <button
                            onClick={() => setViewMode('text')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                              viewMode === 'text'
                                ? 'bg-[#8a8686] text-white'
                                : 'text-[#b8b8b8] hover:text-white'
                            }`}
                          >
                            Formatted
                          </button>
                          <button
                            onClick={() => setViewMode('markdown')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                              viewMode === 'markdown'
                                ? 'bg-[#8a8686] text-white'
                                : 'text-[#b8b8b8] hover:text-white'
                            }`}
                          >
                            Markdown
                          </button>
                        </div>
                        
                            {/* Copy Button */}
                            <button
                              onClick={handleCopyPRD}
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
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-12 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-xl font-semibold text-white mb-3 mt-8">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-[#d4d4d4] leading-relaxed mb-4">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="my-4 space-y-2 list-disc pl-6 text-[#d4d4d4]">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="my-4 space-y-2 list-decimal pl-6 text-[#d4d4d4]">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-[#d4d4d4] leading-relaxed pl-2">
                                {children}
                              </li>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#3a3638] py-5 rounded-r-lg text-[#e8e8e8] text-lg">
                                {children}
                              </blockquote>
                            ),
                            code: ({ children }) => (
                              <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
                                {children}
                              </code>
                            ),
                            hr: () => (
                              <hr className="my-8" style={{ borderColor: '#8a8686' }} />
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-white">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => (
                              <em className="not-italic font-semibold text-white">{children}</em>
                            ),
                          }}
                        >
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
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-12 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold text-white mb-3 mt-8">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-[#d4d4d4] leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="my-4 space-y-2 list-disc pl-6 text-[#d4d4d4]">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-4 space-y-2 list-decimal pl-6 text-[#d4d4d4]">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[#d4d4d4] leading-relaxed pl-2">
                            {children}
                          </li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#3a3638] py-5 rounded-r-lg text-[#e8e8e8] text-lg">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),
                        hr: () => (
                          <hr className="my-8" style={{ borderColor: '#8a8686' }} />
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-white">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="not-italic font-semibold text-white">{children}</em>
                        ),
                      }}
                    >
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
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold text-white mb-3 mt-8">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold text-white mb-3 mt-8">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-[#d4d4d4] leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="my-4 space-y-2 list-disc pl-6 text-[#d4d4d4]">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-4 space-y-2 list-decimal pl-6 text-[#d4d4d4]">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[#d4d4d4] leading-relaxed pl-2">
                            {children}
                          </li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#00a1ff]/10 py-4 rounded-r-lg text-[#d4d4d4]">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),
                        hr: () => (
                          <hr className="my-8" style={{ borderColor: '#8a8686' }} />
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-white">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
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
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-12 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold text-white mb-3 mt-8">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-[#d4d4d4] leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="my-4 space-y-2 list-disc pl-6 text-[#d4d4d4]">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-4 space-y-2 list-decimal pl-6 text-[#d4d4d4]">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[#d4d4d4] leading-relaxed pl-2">
                            {children}
                          </li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#3a3638] py-5 rounded-r-lg text-[#e8e8e8] text-lg">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),
                        hr: () => (
                          <hr className="my-8" style={{ borderColor: '#8a8686' }} />
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-white">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="not-italic text-white">{children}</em>
                        ),
                      }}
                    >
                      {project.challenge}
                    </ReactMarkdown>
                  </div>
                </div>
              </section>
            )}

            {/* Tech Stack Section for e-commerce-platform */}
            {slug === 'e-commerce-platform' && project && 'challenge' in project && (
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
                  
                  {/* Tech Stack Workflow Diagram */}
                  <div className="mb-8">
                    <p className="text-[#d4d4d4] leading-relaxed mb-4">
                      Diagram shows end-to-end tooling for each stage:
                    </p>
                    <img 
                      src={techStackWorkflow} 
                      alt="Tech stack workflow diagram" 
                      className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setExpandedImage(true)}
                    />
                  </div>
                  
                  <div className="prose prose-lg max-w-none prose-invert">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-12 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold text-white mb-3 mt-8">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-[#d4d4d4] leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="my-4 space-y-2 list-disc pl-6 text-[#d4d4d4]">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-4 space-y-2 list-decimal pl-6 text-[#d4d4d4]">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[#d4d4d4] leading-relaxed pl-2">
                            {children}
                          </li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#3a3638] py-5 rounded-r-lg text-[#e8e8e8] text-lg">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),
                        hr: () => (
                          <hr className="my-8" style={{ borderColor: '#8a8686' }} />
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-white">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="not-italic text-white">{children}</em>
                        ),
                        img: ({ src, alt }) => (
                          <img src={src} alt={alt || ''} className="w-full rounded-lg my-8" loading="lazy" />
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
        </div>
      </div>

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
          onClick={() => setExpandedImage(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            <img 
              src={techStackWorkflow} 
              alt="Tech stack workflow diagram - expanded" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setExpandedImage(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Close expanded image"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
