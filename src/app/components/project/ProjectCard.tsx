import { Link } from 'react-router-dom';
const SCROLL_POSITION_KEY = 'homepage-scroll-position';

interface TitlePart {
  text: string;
  gradient: boolean;
}

interface ProjectCardProps {
  title: string;
  titleParts?: TitlePart[];
  description: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export function ProjectCard({ title, titleParts, description, category, imageUrl, slug }: ProjectCardProps) {
  return (
    <Link to={`/featured/${slug}`} className="block">
      <div className="rounded-[24px] p-[2px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[400px] transition-transform hover:scale-[1.02] cursor-pointer"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
        }}
      >
        <div className="relative rounded-[22px] h-full overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[22px]">
          <img 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover object-top rounded-[22px]" 
            src={imageUrl} 
            loading="lazy"
            width="600"
            height="400"
          />
          {/* Bottom gradient scrim for text readability */}
          <div 
            className="absolute inset-0 rounded-[22px]" 
            style={{ 
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%)"
            }} 
          />
          <div 
            className="absolute inset-0 rounded-[22px]" 
            style={{ 
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%)"
            }} 
          />
        </div>
        <div className="flex flex-col justify-end size-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start justify-end overflow-clip p-[24px] relative size-full">
            {/* Category tag */}
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
              <div className="flex flex-row justify-end size-full">
                <div className="content-stretch flex items-start justify-end p-[10px] relative size-full p-[0px]">
                  {/* Pill with backdrop blur, 15% fill, and 1px stroke */}
                  <div 
                    className="backdrop-blur-[2px] rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.6)'
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative">
                        <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-white">{category}</p>
                      </div>
                    </div>
                    <div className="absolute inset-[-0.25px] pointer-events-none shadow-[inset_0px_-4px_4px_0px_rgba(0,0,0,0.25),inset_0px_4px_4px_0px_rgba(255,255,255,0.1)] rounded-[100px]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Spacer */}
            <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" />
            
            {/* Title and description */}
            <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] not-italic relative shrink-0 w-full">
              <p className="font-['Instrument_Serif:Regular',sans-serif] relative shrink-0 text-[36px] break-words">
                {titleParts ? (
                  titleParts.map((part, index) => (
                    <span 
                      key={index}
                      className={part.gradient ? "bg-clip-text bg-gradient-to-r from-[#7ACAFF] to-[#67FFC2]" : "text-white"}
                      style={part.gradient ? { WebkitTextFillColor: "transparent" } : {}}
                    >
                      {part.text}
                    </span>
                  ))
                ) : (
                  <span className="bg-clip-text bg-gradient-to-r from-[#7ACAFF] to-[#67FFC2]" style={{ WebkitTextFillColor: "transparent" }}>{title}</span>
                )}
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[18px] text-white w-[min-content]">{description}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
}