import type { Project } from '../../types/project';


interface ProjectDetailNavigationProps {
  project: Project;
  slug: string;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  images: string[];
  onImageClick: (index: number) => void;
}

export function ProjectDetailNavigation({ 
  project, 
  slug, 
  activeSection, 
  scrollToSection,
  images,
  onImageClick
}: ProjectDetailNavigationProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'skills', label: 'Skills used', show: project && 'skills' in project },
    { id: 'workflows', label: 'Workflows', show: slug === 'rag-ai-system' },
    { id: 'user-needs', label: 'User need', show: slug === 'live-match-summary' },
    { id: 'constraints-and-evals', label: 'Constraints and evals', show: slug === 'live-match-summary' && project && 'constraints' in project },
    { id: 'output-challenges', label: 'Challenges', show: slug === 'live-match-summary' },
    { id: 'key-info', label: 'Key info', show: slug === 'lineup-changes' },
    { id: 'lineup-challenge', label: 'Challenge', show: slug === 'lineup-changes' },
    { id: 'tech-stack', label: 'Tech Stack', show: slug === 'portfolio-website' },
    { id: 'prd', label: 'PRD', show: project && 'prd' in project && slug !== 'live-match-summary' && slug !== 'lineup-changes' && slug !== 'portfolio-website' },
  ].filter(item => item.show);

  return (
    <aside className="lg:col-span-1 pt-0 lg:pt-0">
      <div className="lg:sticky lg:top-28 lg:self-start pt-2 lg:pt-0">
        <div 
          className="rounded-[24px] p-[2px] shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
          }}
        >
          <div className="rounded-[22px] p-8 pb-6 lg:pb-8 shadow-xl"
            style={{
              background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
            }}
          >
            {/* Contents Section */}
            <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white mb-4">
              Contents
            </h3>
            <nav className="space-y-2 mb-4 lg:mb-6" role="navigation" aria-label="Project sections">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                      : 'text-[#D6D6D6] font-normal hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Images Section */}
            {images.length > 0 && (
              <>
                <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white mb-4 mt-6 hidden lg:block">
                  Images
                </h3>
                <div className="relative">
                  <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-2 lg:max-h-[300px] lg:overflow-y-auto lg:overflow-x-hidden">
                  {images.map((src, index) => (
                    <button
                      key={index}
                      onClick={() => onImageClick(index)}
                      className="relative rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors group w-[calc((50vw-24px)*9/16)] h-[calc((50vw-24px)*9/16)] lg:aspect-video lg:w-full lg:h-auto flex-shrink-0 snap-start lg:snap-none"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </button>
                  ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
