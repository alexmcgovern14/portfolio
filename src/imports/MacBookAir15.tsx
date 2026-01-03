import svgPaths from "./svg-quy64lmgte";
import heroImg from "../assets/heroimg.png";

function LinkedInIcon() {
  return <div className="absolute bg-[#8b8b8b] left-0 rounded-[5px] size-[40px] top-0" data-name="LinkedIn icon" />;
}

function GithubIcon() {
  return <div className="absolute bg-[#8b8b8b] left-0 rounded-[5px] size-[40px] top-[65px]" data-name="Github Icon" />;
}

function EtsyIcon() {
  return <div className="absolute bg-[#8b8b8b] left-0 rounded-[5px] size-[40px] top-[130px]" data-name="Etsy icon" />;
}

function SocialIcons() {
  return (
    <div className="h-[170px] relative shrink-0 w-[40px]" data-name="Social icons">
      <LinkedInIcon />
      <GithubIcon />
      <EtsyIcon />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[50px] h-full items-center overflow-clip px-[25px] py-[65px] relative shrink-0">
      <SocialIcons />
      <div className="flex h-[496px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[496px]">
            <div className="absolute inset-[-11.05px_-0.3%_-11.05px_-1.61%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 505.5 22.0919">
                <path d={svgPaths.p25d70400} fill="var(--stroke-0, #8B8B8B)" id="Line 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative w-[534px]">
      <img 
        alt="Alex McGovern" 
        className="w-full h-auto" 
        src={heroImg}
      />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-[534px]" style={{ transform: 'translateY(-40px)' }}>
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[329px] leading-[0] relative shrink-0 text-nowrap w-[421px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-semibold leading-[normal] left-[5px] text-[#152630] text-[30px] top-[290px]">
        <span className="bg-clip-text bg-gradient-to-r font-['Inter:Regular',sans-serif] font-bold from-[#00a1ff] to-[#00ff6f]" style={{ WebkitTextFillColor: "transparent" }}>
          AI product
        </span>{" "}
        <span className="text-[#c2c2c2] font-['Inter:Regular',sans-serif] font-normal">manager</span>.
      </p>
      <div className="absolute font-['Instrument_Serif:Regular',sans-serif] leading-[133px] left-0 not-italic text-[#f0eae1] text-[130px] top-0 tracking-[-2px]">
        <p className="mb-0 text-[rgb(255,255,255)]">{`Alex `}</p>
        <p className="text-[rgb(255,255,255)]">McGovern</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 grow h-[832px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        {/* Desktop layout - horizontal */}
        <div className="hidden md:flex content-stretch gap-[50px] items-center px-[40px] py-0 relative">
          <Frame3 />
          <Frame2 />
        </div>
        
        {/* Mobile layout - vertical (text above, image below) */}
        <div className="flex md:hidden flex-col items-center justify-center gap-0 px-6 py-12">
          {/* Name */}
          <div className="font-['Instrument_Serif:Regular',sans-serif] text-[64px] leading-[1.1] text-center text-white tracking-[-1px] mb-10">
            <p className="mb-0">Alex</p>
            <p>McGovern</p>
          </div>
          
          {/* AI product manager */}
          <p className="font-['Inter:Regular',sans-serif] font-semibold text-[24px] text-center">
            <span className="bg-clip-text bg-gradient-to-r font-['Inter:Regular',sans-serif] font-bold from-[#00a1ff] to-[#00ff6f]" style={{ WebkitTextFillColor: "transparent" }}>
              AI product
            </span>{" "}
            <span className="text-[#c2c2c2] font-['Inter:Regular',sans-serif] font-normal">manager</span>.
          </p>
          
          {/* Photo with decorative line included - 25% bigger */}
          <div className="relative w-[360px]" style={{ marginTop: '-40px' }}>
            <img 
              alt="Alex McGovern" 
              className="w-full h-auto" 
              src={heroImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MacBookAir() {
  return (
    <div className="content-stretch flex gap-[105px] items-center relative size-full" data-name="MacBook Air - 15" style={{ backgroundImage: "linear-gradient(125.05deg, rgb(75, 71, 70) 5.0438%, rgb(177, 168, 165) 100%)" }}>
      <Frame4 />
    </div>
  );
}