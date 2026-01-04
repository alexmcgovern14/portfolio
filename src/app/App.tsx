import { Suspense, lazy, memo, useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { ProjectCard } from './components/project/ProjectCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { NotFound } from './components/shared/NotFound';
import { Github, Mail, Copy, Check } from 'lucide-react';
import behanceLogo from '../assets/ab051b3dbc5f6e7836893dc943f2b4ba9e0379e6.png';
import linkedinLogo from '../assets/5c61d28ae9cf4a84dc84ff7a5804e018486959ba.png';
import beyondProductPhoto from '../assets/b82f3fe63941c182cb0917cb0aae4da5b7fb9718.png';
import { projects } from './data/projects';
import { aboutMeSkills } from './data/skills';
import { trackExternalLink } from './utils/analytics';

// Import hero immediately (above the fold - no lazy loading)
import MacBookAir from '../imports/MacBookAir15';
import { AboutMeLayout2 } from './components/AboutMeLayout2';

import { useScrollRestoration } from './hooks/useScrollRestoration';
// Lazy load only heavy components that are below the fold or on separate routes
const ProjectDetail = lazy(() => import('./components/ProjectDetailNew').then(m => ({ default: m.ProjectDetail })));
const PaintingsCarousel = lazy(() => import('./components/sections/PaintingsCarousel').then(m => ({ default: m.PaintingsCarousel })));

// Memoized ProjectCard to prevent unnecessary re-renders
const MemoizedProjectCard = memo(ProjectCard);


// Get current date in "MMM. YYYY" format
function getCurrentDateString() {
  const now = new Date();
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${month} ${year}`;
}

// Email Copy Component
function EmailCopyLine() {
  const [copied, setCopied] = useState(false);
  const email = 'alex.mcgovern.contact@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy email');
    }
  };

  return (
    <div className="flex justify-center mt-6 md:mt-8">
      <div 
        className="rounded-[24px] p-[2px] shadow-xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
        }}
      >
        <div 
          className="rounded-[22px]"
          style={{ 
            paddingLeft: '24px', 
            paddingRight: '24px', 
            paddingTop: '6px', 
            paddingBottom: '6px',
            backgroundColor: '#8A8A8A',
            display: 'block'
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-white font-['Inter:Regular',sans-serif] text-sm md:text-base">{email}</span>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center p-1.5 text-white hover:text-white/80 transition-colors rounded"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="size-4 md:size-5" />
              ) : (
                <Copy className="size-4 md:size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  useScrollRestoration();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00a1ff] focus:text-white focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>
      <Navigation />
      {/* Hero Section */}
      <section className="h-screen w-full">
        <MacBookAir />
      </section>

      {/* Projects Section */}
      <section id="main-content" className="min-h-screen py-10 md:py-20 px-4 md:px-8 lg:px-32 bg-[#5a5452]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed">
            Selection of features in production at LiveScore and personal projects. Mostly featuring LLMs in product or built in AI-native process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <MemoizedProjectCard key={project?.slug || index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <AboutMeLayout2 skills={aboutMeSkills} />

      {/* Digital Art Section */}
      <section className="min-h-screen w-full bg-[#6d6765] py-10 md:py-20 px-4 md:px-8 lg:px-32" aria-label="Digital art">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-4">
            Digital art
          </h2>
          <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed">
            <><strong className="text-white">Design</strong> and <strong className="text-white">creative</strong> background influence product thinking.</>
          </p>

          {/* Paintings Section */}
          <div className="mb-20">
            <a 
              href="https://www.etsy.com/uk/shop/AlexMcGovernDesign" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackExternalLink("https://www.etsy.com/uk/shop/AlexMcGovernDesign", "Etsy Shop")}
              className="inline-flex items-center gap-4 mb-10 group"
            >
              <div className="bg-[#8b8b8b] group-hover:bg-[#f16521] transition-colors size-[40px] flex items-center justify-center rounded-lg flex-shrink-0">
                <span className="text-white font-serif">E</span>
              </div>
              <p className="text-[#D6D6D6] font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed group-hover:text-white transition-colors">
                <strong className="text-white">Paintings</strong> available on Etsy
              </p>
            </a>
            {/* Paintings Carousel - Lazy loaded */}
            <Suspense fallback={<div className="pb-16 flex justify-center items-center h-[520px] bg-[#6d6765]"><div className="text-white">Loading paintings...</div></div>}>
              <PaintingsCarousel />
            </Suspense>
          </div>

          {/* Motion Designer Section */}
          <div>
            <a 
              href="https://www.behance.net/alex-mcgovern" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackExternalLink("https://www.behance.net/alex-mcgovern", "Behance")}
              className="inline-flex items-center gap-4 mb-10 group"
            >
              <div className="bg-[#8b8b8b] group-hover:bg-[#1769ff] transition-colors size-[40px] flex items-center justify-center rounded-lg flex-shrink-0">
                <img 
                  src={behanceLogo} 
                  alt="Behance"
                  className="size-6"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <p className="text-[#D6D6D6] font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed group-hover:text-white transition-colors">
                Former <strong className="text-white">motion designer</strong> and content <strong className="text-white">strategy & production manager</strong>
              </p>
            </a>
            {/* Embeds Grid */}
            <div className="grid grid-cols-1 gap-8">
              {/* Behance and Instagram Row */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Behance embed - left, wider */}
                <div className="flex-1 flex justify-center items-start w-full">
                  <div 
                    className="rounded-[24px] p-[2px] shadow-2xl"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
                      width: '100%',
                      maxWidth: '700px'
                    }}
                  >
                    <div className="rounded-[22px] overflow-hidden bg-gray-900 w-full">
                      <iframe 
                        src="https://www.behance.net/embed/project/151280181?ilo0=1" 
                        width="100%"
                        height="550"
                        allowFullScreen 
                        loading="lazy" 
                        frameBorder="0" 
                        allow="clipboard-write" 
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>
                </div>

                {/* Instagram embed - right, smaller */}
                <div className="flex-shrink-0 flex justify-center items-start w-full md:w-auto">
                  <div 
                    className="rounded-[24px] p-[2px] shadow-2xl"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
                    }}
                  >
                    <div className="rounded-[22px] overflow-hidden w-full md:w-[380px]">
                      <iframe
                        src="https://www.instagram.com/p/CEzAI5JgMJZ/embed/"
                        width="380"
                        height="550"
                        frameBorder="0"
                        scrolling="no"
                        allowtransparency="true"
                        style={{ 
                          border: 'none', 
                          overflow: 'hidden',
                          minHeight: '550px'
                        }}
                        title="Instagram post by @amgdgn"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Beyond Product Section */}
      <section className="min-h-screen w-full bg-[#5a5452] py-10 md:py-20 px-4 md:px-8 lg:px-32" aria-label="Beyond product">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Left side - Text and Spotify */}
            <div className="flex-1 w-full">
              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-4">
                Beyond product
              </h2>
              <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed">
                Creative pursuits, history, politics, culture, football and music — from rock, country and blues to hip-hop and soul.
              </p>
              <p className="text-[#c2c2c2] mb-8 md:mb-16 font-[ABeeZee] text-base md:text-xl leading-relaxed">
                Currently listening to:
              </p>
              {/* Spotify Embed */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1Epy0FHcD7AQ0o?utm_source=generator&theme=0" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            {/* Right side - Photo */}
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
              <img 
                src={beyondProductPhoto} 
                alt="Alex McGovern" 
                className="w-full max-w-[300px] lg:w-[300px] h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/30"
                loading="lazy"
                width="300"
                height="400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4a4442] py-8 md:py-16 px-4 md:px-8 lg:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {/* LinkedIn */}
            <a
              href="https://uk.linkedin.com/in/alex-mcgovern-531a6576"
              target="_blank"
              onClick={() => trackExternalLink("https://uk.linkedin.com/in/alex-mcgovern-531a6576", "LinkedIn")}
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 md:size-14 bg-[#8b8b8b] hover:bg-[#0077b5] transition-colors rounded-lg group"
              aria-label="LinkedIn"
            >
              <img 
                src={linkedinLogo} 
                alt="LinkedIn"
                className="size-5 md:size-6"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>

            {/* Email */}
            <a
              href="mailto:alex.mcgovern.contact@gmail.com"
              className="flex items-center justify-center size-12 md:size-14 bg-[#8b8b8b] hover:bg-[#ea4335] transition-colors rounded-lg group"
              aria-label="Email"
            >
              <Mail className="size-5 md:size-6 text-white" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/alexmcgovern14"
              target="_blank"
              onClick={() => trackExternalLink("https://github.com/alexmcgovern14", "GitHub")}
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 md:size-14 bg-[#8b8b8b] hover:bg-[#333] transition-colors rounded-lg group"
              aria-label="GitHub"
            >
              <Github className="size-5 md:size-6 text-white" />
            </a>

            {/* Etsy */}
            <a
              href="https://www.etsy.com/uk/shop/AlexMcGovernDesign"
              target="_blank"
              onClick={() => trackExternalLink("https://www.etsy.com/uk/shop/AlexMcGovernDesign", "Etsy Shop")}
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 md:size-14 bg-[#8b8b8b] hover:bg-[#f16521] transition-colors rounded-lg group"
              aria-label="Etsy"
            >
              <span className="text-white text-xl md:text-2xl font-serif">E</span>
            </a>

            {/* Behance */}
            <a
              href="https://www.behance.net/alex-mcgovern"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 md:size-14 bg-[#8b8b8b] hover:bg-[#1769ff] transition-colors rounded-lg group"
              aria-label="Behance"
            >
              <img 
                src={behanceLogo} 
                alt="Behance"
                className="size-5 md:size-6"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
          </div>
          {/* Email Address with Copy */}
          <EmailCopyLine />
          {/* Credit */}
          <p className="text-[#D6D6D6] text-center mt-6 md:mt-8 font-['Inter:Regular',sans-serif] text-sm md:text-base">
            Updated: {getCurrentDateString()} | Designed and built by Alex McGovern
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <PageViewTracker />
        <ScrollRestoration />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/project/:slug" 
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#2a2628] flex items-center justify-center"><div className="text-white">Loading project...</div></div>}>
                <ProjectDetail />
              </Suspense>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ErrorBoundary>
  );
}