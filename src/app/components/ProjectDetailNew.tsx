import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { projects } from '../data/projects';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useClipboard } from '../hooks/useClipboard';
import { SEO } from './shared/SEO';
import { ProjectDetailHeader } from './project/ProjectDetailHeader';
import { ProjectDetailNavigation } from './project/ProjectDetailNavigation';
import { ProjectDetailContent } from './project/ProjectDetailContent';
import { FullScreenImageOverlay } from './project/FullScreenImageOverlay';
import { extractProjectImages } from '../utils/extractProjectImages';
import techStackWorkflow from '../../assets/website-tool-workflow.png';
import workflowIngestion from '../../assets/1dad7059420c1200f434ef05c34bb334b30cabd9.png';
import workflowChat from '../../assets/f69fa785f0984779afcf647e0664899405374bcc.png';
import { trackProjectView, trackCopy, trackSectionNavigation } from '../utils/analytics';

export function ProjectDetail() {
// 🔴🔴🔴 TEST BANNER - FILE IS BEING UPDATED 🔴🔴🔴
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = projects.find(p => p.slug === slug);
  
  // Calculate next and previous projects based on main page order (cycling)
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextIndex = currentIndex >= 0 && currentIndex < projects.length - 1 
    ? currentIndex + 1 
    : currentIndex >= 0 && projects.length > 0 
    ? 0 
    : -1;
  const prevIndex = currentIndex > 0 
    ? currentIndex - 1 
    : currentIndex >= 0 && projects.length > 0 
    ? projects.length - 1 
    : -1;
  
  const nextProject = nextIndex >= 0 && nextIndex < projects.length
    ? { slug: projects[nextIndex].slug, title: projects[nextIndex].title }
    : null;
  const prevProject = prevIndex >= 0 && prevIndex < projects.length
    ? { slug: projects[prevIndex].slug, title: projects[prevIndex].title }
    : null;
  
  const [viewMode, setViewMode] = useState<'text' | 'markdown'>('text');

  const { copied, copyToClipboard: handleCopyToClipboard } = useClipboard();
  const { copied: copiedJson, copyToClipboard: handleCopyJsonToClipboard } = useClipboard();

  // Extract all images from project
  let projectImages = project ? extractProjectImages(project, slug || '') : [];
  
  // Add tech stack workflow image for portfolio-website
  if (slug === 'portfolio-website' && !projectImages.includes(techStackWorkflow)) {
    projectImages.push(techStackWorkflow);
  }



  const { activeSection, isScrolled } = useScrollSpy(
    ['overview', 'skills', 'workflows', 'user-needs', 'challenges', 'constraints', 'evaluations', 'challenge', 'key-info', 'workflow', 'prd'],
    48 // Offset matches Contents sticky position (48px from viewport top)
  );

  // Track manually selected section to override scroll spy during smooth scroll
  const [manuallySelectedSection, setManuallySelectedSection] = useState<string | null>(null);

  // Use manually selected section if set, otherwise use scroll spy
  const displayedActiveSection = manuallySelectedSection || activeSection;

  // Clear manual selection when scroll spy detects the target section
  useEffect(() => {
    if (manuallySelectedSection && activeSection === manuallySelectedSection) {
      // Scroll spy has detected the target section, clear manual override
      setManuallySelectedSection(null);
    }
  }, [activeSection, manuallySelectedSection]);
  if (!slug) {
    return (
      <div className="min-h-screen bg-[#f0eae1] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl text-[#5a5452] mb-4">
            Invalid Project URL
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track project view
    if (project) {
      trackProjectView(slug, project.title);
    }
  }, [slug, project]);


    const scrollToSection = (sectionId: string) => {
    trackSectionNavigation(sectionId, slug);
    
    // Set manual selection - will be cleared when scroll spy detects this section
    setManuallySelectedSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      // Responsive offset: mobile uses margin size (16px), desktop uses Contents position (48px)
      const offset = window.innerWidth < 1024 ? 16 : 48;
      
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

  const handleImageClick = (imageSrc: string) => {
    // Extract filename from path (handle Vite-processed paths with query strings)
    const getFilename = (path: string) => {
      const url = new URL(path, window.location.origin);
      return url.pathname.split('/').pop() || path.split('/').pop()?.split('?')[0] || path;
    };
    
    const clickedFilename = getFilename(imageSrc);
    
    // Find matching image in projectImages by filename
    const index = projectImages.findIndex(img => {
      const imgFilename = getFilename(img);
      return imgFilename === clickedFilename || img.includes(clickedFilename) || imageSrc.includes(imgFilename);
    });
    
    if (index !== -1) {
      setCurrentImageIndex(index);
      setOverlayOpen(true);
    } else {
      // Fallback: try exact match
      const exactIndex = projectImages.indexOf(imageSrc);
      if (exactIndex !== -1) {
        setCurrentImageIndex(exactIndex);
        setOverlayOpen(true);
      }
    }
  };

  const handleImageIndexClick = (index: number) => {
    setCurrentImageIndex(index);
    setOverlayOpen(true);
  };

  const handleCopyN8nJson = () => {
    if (project && 'n8nJson' in project && project.n8nJson) {
      handleCopyJsonToClipboard(project.n8nJson, 'n8n JSON copied to clipboard!');
    }
  };

  // Generate SEO metadata
  const seoTitle = project ? `${project.title} | Alex McGovern` : 'Project Not Found | Alex McGovern';
  const seoDescription = project?.description || 'Project page on Alex McGovern\'s portfolio';
  const seoImage = project?.imageUrl ? (typeof project.imageUrl === 'string' ? project.imageUrl : 'https://alexmcgovern.com/og-image.png') : 'https://alexmcgovern.com/og-image.png';
  const seoUrl = typeof window !== 'undefined' ? window.location.href : `https://alexmcgovern.com/project/${slug || 'unknown'}`;

  if (!project || !slug) {
    return (
      <>
        <SEO 
          title={seoTitle}
          description={seoDescription}
          image={seoImage}
          url={seoUrl}
          type="article"
        />
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
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#2a2628] w-full overflow-x-hidden">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={seoUrl}
        type="article"
      />
      
      <ProjectDetailHeader 
        project={project}
        slug={slug}
        isScrolled={isScrolled}
        nextProject={nextProject}
        prevProject={prevProject}
      />

      {/* Main Content Grid - 4 Column Layout */}
      <div className="max-w-[1920px] mx-auto px-4 lg:px-[54px] py-4 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 project-detail-grid" style={{ alignItems: 'flex-start' }}>
          {/* Contents - Spans 1 column */}
          <div className="col-span-1 lg:col-span-1">
            <ProjectDetailNavigation
              project={project}
              slug={slug}
              activeSection={displayedActiveSection}
              scrollToSection={scrollToSection}
              images={projectImages}
              onImageClick={handleImageIndexClick}
            />
          </div>

          {/* Product Overview - Spans 3 columns */}
          <main className="col-span-1 lg:col-span-2">
            <ProjectDetailContent
              project={project}
              slug={slug}
              viewMode={viewMode}
              copied={copied}
              copiedJson={copiedJson}
              onCopyPRD={handleCopyPRD}
              onCopyN8nJson={handleCopyN8nJson}
              onViewModeChange={setViewMode}
              onImageClick={handleImageClick}
            />
          </main>
        </div>
      </div>

      <FullScreenImageOverlay
        images={projectImages}
        currentIndex={currentImageIndex}
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </div>
  );
}
