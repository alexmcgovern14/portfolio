import React from 'react';

export function getMarkdownComponents(onImageClick?: (src: string) => void) {
  return {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-['Instrument_Serif:Regular',sans-serif] text-white mb-4 mt-12 pb-2" style={{ borderBottom: '1px solid #8a8686' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-white mb-3 mt-8">
        {children}
      </h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="text-[#D6D6D6] leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="my-4 space-y-2 list-disc pl-6 text-[#D6D6D6]" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="my-4 space-y-2 list-decimal pl-6 text-[#D6D6D6]" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="text-[#D6D6D6] leading-relaxed pl-2" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#00a1ff] pl-6 pr-4 italic my-6 bg-[#3a3638] py-5 rounded-r-lg text-[#D6D6D6] text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </blockquote>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="text-[#00ff6f] bg-[#393234] px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    hr: () => (
      <hr className="my-8" style={{ borderColor: '#8a8686' }} />
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-[#D6D6D6]" style={{ fontFamily: 'Inter, sans-serif' }}>{children}</em>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <span className="block my-8">
        <span className="block rounded-[24px] p-[2px] overflow-hidden cursor-pointer" onClick={() => onImageClick && src && onImageClick(src)}
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
          }}
        >
          <span className="block rounded-[22px] overflow-hidden">
            <img src={src} alt={alt || ''} className="w-full h-auto block" loading="lazy" width="1200" height="675" />
          </span>
        </span>
      </span>
    ),
  };
}
