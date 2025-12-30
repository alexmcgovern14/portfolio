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
import { ProjectDetailModal } from './project/ProjectDetailModal';
import { trackProjectView, trackCopy, trackSectionNavigation } from '../utils/analytics';

export function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  
  const [expandedImage, setExpandedImage] = useState(false);

  const project = projects.find(p => p.slug === slug);
  const [viewMode, setViewMode] = useState<'text' | 'markdown'>('text');

  const { copied, copyToClipboard: handleCopyToClipboard } = useClipboard();
  const { copied: copiedJson, copyToClipboard: handleCopyJsonToClipboard } = useClipboard();

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
      />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProjectDetailNavigation
            project={project}
            slug={slug}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
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
            onExpandImage={() => setExpandedImage(true)}
          />

        </div>
      </div>

      <ProjectDetailModal 
        isOpen={expandedImage}
        onClose={() => setExpandedImage(false)}
      />
    </div>
  );
}
