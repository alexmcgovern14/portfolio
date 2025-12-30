import ReactMarkdown from 'react-markdown';

interface SkillCardProps {
  title: string;
  description: string;
}

export function SkillCard({
  title,
  description
}: SkillCardProps) {
  return (
    <div 
      className="rounded-[24px] p-[2px] shadow-xl hover:opacity-90 transition-opacity duration-300"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
      }}
    >
      <div className="bg-gradient-to-b from-[#4C4845] to-[#302D2B] rounded-[22px] p-6 h-full">
        <h3 className="text-xl font-['Inter:Regular',sans-serif] font-semibold text-white mb-3">
          {title}
        </h3>
        <div className="text-[#D6D6D6] text-sm leading-relaxed">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-0">{children}</p>,
              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}