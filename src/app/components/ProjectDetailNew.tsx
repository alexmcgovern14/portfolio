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
import { trackProjectView, trackCopy, trackSectionNavigation } from '../utils/analytics';

export function ProjectDetail() {
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
    ['overview', 'skills', 'workflows', 'user-needs', 'key-info', 'requirements', 'output-challenges', 'lineup-challenge', 'tech-stack']
  );

  // Early return if slug is undefined
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
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate element position first
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      // Account for sticky header height (expanded ~200px, collapsed ~80px)
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      
      // On desktop, align section with top of Contents (48px from viewport top)
      let contentsTopOffset = 0;
      if (window.innerWidth >= 1024) {
        // Contents sticks at 48px from viewport top
        // When header is expanded (height > 100px), it affects the initial layout
        // We need to account for the header expansion to ensure proper alignment
        const isHeaderExpanded = headerHeight > 100;
        if (isHeaderExpanded) {
          // Header is expanded: the extra header height pushes content down initially
          // When we scroll, header will collapse, but we want section at 48px
          // Fine-tune: reduce by ~10px to account for padding/spacing
          const headerExpansion = headerHeight - 80; // Extra height when expanded (base is ~80px)
          contentsTopOffset = 48 + headerExpansion - 10; // Reduce by 10px for better alignment
        } else {
          // Header is collapsed: Contents is at 48px, section should be at 48px
          contentsTopOffset = 48;
        }
      }
      
      // Offset: Contents top position (desktop) or header + padding (mobile)
      const offset = window.innerWidth >= 1024 
        ? contentsTopOffset  // Desktop: 48px to align with Contents
        : headerHeight + 40; // Mobile: header + padding
      
      // Debug logging (remove in production)
      if (process.env.NODE_ENV === 'development' && window.innerWidth >= 1024) {
        console.log('[ScrollToSection] Calculation', {
          sectionId,
          headerHeight,
          contentsTopOffset,
          totalOffset: offset,
          elementTop: elementPosition,
          scrollTo: elementPosition - offset
        });
      }
      
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
    const index = projectImages.indexOf(imageSrc);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setOverlayOpen(true);
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
    <div className="min-h-screen bg-[#2a2628] overflow-visible">
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

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 lg:py-12 overflow-visible">
        <div className="flex flex-col lg:flex-row gap-8 items-start overflow-visible project-detail-grid">
          <ProjectDetailNavigation
            project={project}
            slug={slug}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            images={projectImages}
            onImageClick={handleImageIndexClick}
          />

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
