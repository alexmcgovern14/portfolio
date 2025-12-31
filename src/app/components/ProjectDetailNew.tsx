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

  // Add workflow images for rag-ai-system
  if (slug === 'rag-ai-system') {
    if (!projectImages.includes(workflowIngestion)) {
      projectImages.push(workflowIngestion);
    }
    if (!projectImages.includes(workflowChat)) {
      projectImages.push(workflowChat);
    }
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
      // Account for sticky header height (expanded ~200px, collapsed ~80px) plus padding
      // Using dynamic calculation to ensure header and section top are visible
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      const offset = headerHeight + 40; // 40px padding for visual spacing
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
    <div className="min-h-screen bg-[#2a2628]">
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
      <div className="max-w-7xl mx-auto px-6 py-4 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
