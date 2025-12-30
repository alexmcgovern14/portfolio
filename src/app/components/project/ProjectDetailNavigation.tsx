import type { Project } from '../../types/project';

interface ProjectDetailNavigationProps {
  project: Project;
  slug: string;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function ProjectDetailNavigation({ 
  project, 
  slug, 
  activeSection, 
  scrollToSection 
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
    <aside className="lg:col-span-1">
      <div className="lg:sticky lg:top-28">
        <div 
          className="rounded-[24px] p-[2px] shadow-xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
        }
      >
        <div className="rounded-[22px] p-6 shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
          }}
        >
          <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-lg text-white mb-4">
            Contents
          </h3>
          <nav className="space-y-2" role="navigation" aria-label="Project sections">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#8a8686]/40 text-white font-medium border border-[#8a8686]'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        </div>
      </div>
    </aside>
  );
}


