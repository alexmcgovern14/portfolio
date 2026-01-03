import { useState, useEffect } from 'react';
import linkedinLogo from '../../../assets/LinkedIn.svg';
import emailLogo from '../../../assets/Email.svg';
import githubLogo from '../../../assets/GitHub.svg';
import substackLogo from '../../../assets/Substack.svg';

export function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="hidden lg:flex fixed left-0 top-0 h-screen z-50 flex-col items-center gap-[40px] bg-[rgba(0,0,0,0)] px-[20px] py-[40px] overflow-visible" role="navigation" aria-label="Main navigation">
      {/* Social Icons */}
      <div className="flex flex-col gap-[25px]">
                        {/* LinkedIn */}
        <a
          href="https://uk.linkedin.com/in/alex-mcgovern-531a6576"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="group relative"
        >
                    <div className="w-[45px] h-[45px] rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
            <div className="absolute inset-0 bg-[#0077b5] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            <img src={linkedinLogo} alt="LinkedIn" className="w-[45px] h-[45px] relative z-10" />
          </div>
        </a>
                        {/* Email */}
        <a
          href="mailto:alex.mcgovern.contact@gmail.com"
          aria-label="Email"
          className="group relative"
        >
                    <div className="w-[45px] h-[45px] rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
            <div className="absolute inset-0 bg-[#c73e3e] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            <img src={emailLogo} alt="Email" className="w-[45px] h-[45px] relative z-10" />
          </div>
        </a>
                        {/* GitHub */}
        <a
          href="https://github.com/alexmcgovern14"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="group relative"
        >
                    <div className="w-[45px] h-[45px] rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
            <div className="absolute inset-0 bg-[#333] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            <img src={githubLogo} alt="GitHub" className="w-[45px] h-[45px] relative z-10" />
          </div>
        </a>
                        {/* Substack */}
        <a
          href="https://substack.com/@alexmcgovern"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Substack"
          className="group relative"
        >
                    <div className="w-[45px] h-[45px] rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8B8B8B] rounded-lg z-0" />
            <div className="absolute inset-0 bg-[#ff6719] rounded-lg z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            <img src={substackLogo} alt="Substack" className="w-[45px] h-[45px] relative z-10" />
          </div>
        </a>
      </div>

      {/* Scroll Progress Line and Indicator */}
      <div className="relative w-[2px] overflow-visible" style={{ height: "calc(100vh - 380px)", marginBottom: "20px" }}>
        {/* Vertical Line with arrow at the end */}
        <svg 
          className="absolute inset-0 w-[12px] h-full left-1/2 -translate-x-1/2"
          style={{ height: 'calc(100% + 24px)' }}
          viewBox="0 0 12 100"
          preserveAspectRatio="none"
        >
          {/* Main vertical line - extends to meet arrow meeting point */}
          <line 
            x1="6" 
            y1="0" 
            x2="6" 
            y2="100" 
            stroke="rgba(196,196,196,0.8)" 
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        {/* Arrow at the very bottom of the line */}
        <svg 
          className="absolute left-1/2 -translate-x-1/2 w-6 h-6"
          style={{ bottom: '-24px', overflow: 'visible' }}
          viewBox="0 0 20 20"
          fill="none"
        >
          <line x1="10" y1="20" x2="4" y2="14" stroke="rgba(196,196,196,0.8)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="10" y1="20" x2="16" y2="14" stroke="rgba(196,196,196,0.8)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        
        {/* Moving Circle */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 size-3 bg-[#c4c4c4] rounded-full transition-all duration-200 ease-out z-10 border-2 border-white/50 shadow-lg"
          style={{ top: `${scrollProgress}%`, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' }}
        />
      </div>
    </nav>
  );
}