import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ClipboardList } from 'lucide-react';

interface ConstraintsAndEvalsProps {
  constraints: string;
  evaluations: string;
}

// Shared markdown components for consistent styling
const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-8 first:mt-0 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
      {children}
    </h2>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-8 first:mt-0 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
      {children}
    </h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-[#D6D6D6] leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 space-y-2 list-disc pl-6 text-[#D6D6D6]">
      {children}
    </ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-[#D6D6D6] leading-relaxed pl-2">
      {children}
    </li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-white">
      {children}
    </strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="not-italic font-semibold text-white">{children}</em>
  ),
};

export function ConstraintsAndEvals({ constraints, evaluations }: ConstraintsAndEvalsProps) {
  return (
    <section id="constraints-and-evals" className="scroll-mt-24">
      <div 
        className="rounded-[24px] p-[2px] shadow-xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
        }}
      >
        <div className="rounded-[22px] p-8 shadow-xl"
        style={{
          background: 'linear-gradient(to bottom, #6C696A, #4B4744)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white">
            Constraints and evals
          </h2>
        </div>
        
        <div className="prose prose-lg max-w-none prose-invert">
          <ReactMarkdown components={markdownComponents}>
            {constraints}
          </ReactMarkdown>
          
          <ReactMarkdown components={markdownComponents}>
            {evaluations}
          </ReactMarkdown>
        </div>
      </div>
      </div>
    </section>
  );
}
