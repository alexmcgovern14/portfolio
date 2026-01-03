import { Suspense, lazy, memo, useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { ProjectCard } from './components/project/ProjectCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { NotFound } from './components/shared/NotFound';
import { Copy, Check } from 'lucide-react';
import linkedinLogo from '../assets/LinkedIn.svg';
import emailLogo from '../assets/Email.svg';
import githubLogo from '../assets/GitHub.svg';
import substackLogo from '../assets/Substack.svg';
import etsyLogo from '../assets/Etsy.svg';
import behanceLogo from '../assets/Behance.svg';
import beyondProductPhoto from '../assets/b82f3fe63941c182cb0917cb0aae4da5b7fb9718.png';
import { projects } from './data/projects';
import { aboutMeSkills } from './data/skills';
import { trackExternalLink } from './utils/analytics';

// Import hero immediately (above the fold - no lazy loading)
import MacBookAir from '../imports/MacBookAir15';
import { AboutMeLayout2 } from './components/AboutMeLayout2';
import { PageViewTracker } from './components/shared/PageViewTracker';

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
        className="rounded-[24px] p-[2px] shadow-xl group transition-all duration-300"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, rgba(122, 202, 255, 1), rgba(103, 255, 194, 1))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))';
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
              className="flex items-center justify-center p-1.5 text-white hover:text-white/80 transition-colors rounded cursor-pointer"
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
          <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-[31px] px-3 md:px-0">
            Featured products
          </h2>
          <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed px-3 md:px-0">
            Selected <strong className="text-white">production features</strong> and <strong className="text-white">personal projects</strong> demonstrating practical, production-grade use of LLMs to deliver real user value, built with <strong className="text-white">AI-native approaches.</strong>
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
          <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-[31px] px-3 md:px-0">
            Digital art
          </h2>
          <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed px-3 md:px-0">
            <><strong className="text-white">Design</strong> and <strong className="text-white">creative</strong> background influence product thinking.</>
          </p>

          {/* Paintings Section */}
          <div className="pb-10">
            <a 
              href="https://www.etsy.com/uk/shop/AlexMcGovernDesign" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackExternalLink("https://www.etsy.com/uk/shop/AlexMcGovernDesign", "Etsy Shop")}
              className="inline-flex items-center gap-4 mb-10 group"
            >
              <div className="w-[50px] h-[50px] rounded-lg relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#F45800] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={etsyLogo} alt="Etsy" className="w-[50px] h-[50px] relative z-10" />
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
              <div className="w-[50px] h-[50px] rounded-lg relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#1769FF] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={behanceLogo} alt="Behance" className="w-[50px] h-[50px] relative z-10" />
              </div>
              <p className="text-[#D6D6D6] font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed group-hover:text-white transition-colors">
                Former <strong className="text-white">motion designer</strong> and content <strong className="text-white">strategy & production manager</strong>
              </p>
            </a>
            {/* Embeds Grid */}
            <div className="grid grid-cols-1 gap-8">
              {/* Behance and YouTube Row */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Behance embed - left, equal size */}
                <div className="flex-1 flex justify-center items-start w-full">
                  <div 
                    className="rounded-[24px] p-[2px] shadow-2xl"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
                      width: '100%',
                      maxWidth: '100%'
                    }}
                  >
                    <div className="rounded-[22px] overflow-hidden bg-gray-900 w-full aspect-video">
                      <iframe 
                        src="https://www.behance.net/embed/project/151280181?ilo0=1" 
                        width="100%"
                        height="100%"
                        allowFullScreen 
                        loading="lazy" 
                        frameBorder="0" 
                        allow="clipboard-write" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* YouTube embed - right, equal size */}
                <div className="hidden md:flex flex-1 justify-center items-start w-full">
                  <div 
                    className="rounded-[24px] p-[2px] shadow-2xl"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
                      width: '100%',
                      maxWidth: '100%'
                    }}
                  >
                    <div className="rounded-[22px] overflow-hidden w-full aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/Zt1szGX5XDE?si=-hHoYtolc5lh307p"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full"
                        style={{ 
                          border: 'none', 
                          overflow: 'hidden'
                        }}
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
      <section className="min-h-screen w-full bg-[#5a5452] pt-10 md:pt-20 pb-4 md:pb-8 px-4 md:px-8 lg:px-32" aria-label="Beyond product">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start">
            {/* Left side - Text and Spotify */}
            <div className="flex-1 w-full">
              <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-[31px] px-3 md:px-0">
                Beyond product
              </h2>
              <div className="w-full md:w-full lg:w-[75%]">
                <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed px-3 md:px-0">
                  Creative pursuits, history, politics, culture, football and music — from rock, country and blues to hip-hop and soul.
                </p>
                <p className="text-[#c2c2c2] mb-4 md:mb-6 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed px-3 md:px-0">
                  Currently listening to:
                </p>
                {/* Spotify Embed */}
                <div className="w-full -mb-5 md:-mb-5 lg:mb-10" style={{ lineHeight: 0, fontSize: 0, margin: 0, padding: 0 }}>
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1Epy0FHcD7AQ0o?utm_source=generator&theme=0" 
                  className="w-full h-[300px] md:h-[600px] lg:h-[300px] block border-0" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  style={{ 
                    display: 'block',
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    verticalAlign: 'top'
                  }}
                ></iframe>
                </div>
              </div>
            </div>
            {/* Right side - Photo */}
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center mb-10 md:mb-10 lg:mb-0">
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
                    <div className="grid grid-cols-3 md:flex md:flex-nowrap place-items-center md:justify-center md:items-center gap-4 md:gap-8 max-w-[182px] md:max-w-none mx-auto md:mx-0">
            {/* LinkedIn */}
            <a
              href="https://uk.linkedin.com/in/alex-mcgovern-531a6576"
              target="_blank"
              onClick={() => trackExternalLink("https://uk.linkedin.com/in/alex-mcgovern-531a6576", "LinkedIn")}
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group relative"
            >
              <div className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#0077b5] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={linkedinLogo} alt="LinkedIn" className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] relative z-10" />
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:alex.mcgovern.contact@gmail.com"
              aria-label="Email"
              className="group relative"
            >
              <div className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#c73e3e] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={emailLogo} alt="Email" className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] relative z-10" />
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/alexmcgovern14"
              target="_blank"
              onClick={() => trackExternalLink("https://github.com/alexmcgovern14", "GitHub")}
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group relative"
            >
              <div className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#333] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={githubLogo} alt="GitHub" className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] relative z-10" />
              </div>
            </a>

            {/* Substack */}
            <a
              href="https://substack.com/@alexmcgovern"
              target="_blank"
              onClick={() => trackExternalLink("https://substack.com/@alexmcgovern", "Substack")}
              rel="noopener noreferrer"
              aria-label="Substack"
              className="group relative"
            >
              <div className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#ff6719] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={substackLogo} alt="Substack" className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] relative z-10" />
              </div>
            </a>

            {/* Etsy */}
            <a
              href="https://www.etsy.com/uk/shop/AlexMcGovernDesign"
              target="_blank"
              onClick={() => trackExternalLink("https://www.etsy.com/uk/shop/AlexMcGovernDesign", "Etsy Shop")}
              rel="noopener noreferrer"
              aria-label="Etsy"
              className="group relative"
            >
              <div className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#F45800] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={etsyLogo} alt="Etsy" className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] relative z-10" />
              </div>
            </a>

            {/* Behance */}
            <a
              href="https://www.behance.net/alex-mcgovern"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
              className="group relative"
            >
              <div className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
                <div className="absolute inset-0 bg-[#1769FF] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <img src={behanceLogo} alt="Behance" className="w-[50px] h-[50px] md:w-[56px] md:h-[56px] relative z-10" />
              </div>
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/featured/:slug" 
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