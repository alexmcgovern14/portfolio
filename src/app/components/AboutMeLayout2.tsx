import { SkillCard } from './shared/SkillCard';
import speakingPhoto from '../../assets/cd4d8a7e0af8ec1d891cf525a50981ef1d4a3940.png';

interface AboutMeLayout2Props {
  skills: Array<{
    title: string;
    description: string;
  }>;
}

export function AboutMeLayout2({ skills }: AboutMeLayout2Props) {
  // Use first 4 skills for this layout
  const displaySkills = skills.slice(0, 4);

  return (
    <section className="min-h-screen py-10 md:py-20 px-4 md:px-8 lg:px-32 bg-[#7a7573]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-4xl md:text-6xl text-white mb-[31px]">
          AI product management
        </h2>
        <p className="text-[#D6D6D6] mb-8 md:mb-16 font-['Inter:Regular',sans-serif] text-base md:text-xl leading-relaxed">
          Leading AI product development from concept to shipping
        </p>
        
        {/* New Layout: Job overview card + Speaking photo (row 1) → 4 skill cards (row 2) */}
        <div className="space-y-8">
          {/* Row 1: Job Overview Card + Speaking Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job Overview Card */}
            <div 
              className="rounded-[24px] p-[2px] shadow-xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
              }}
            >
              <div className="bg-[#5a5452] rounded-[22px] p-8 h-full">
              <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-white mb-2">
                Senior Product Manager, LiveScore
              </h3>
              <p className="text-[#D6D6D6] text-lg mb-6 italic">
                London, UK
              </p>
              <div className="text-[#D6D6D6] text-base leading-relaxed space-y-4">
                <p>
                  Leading product strategy, delivery, and adoption of <strong className="text-white">Artificial Intelligence</strong> at LiveScore.
                </p>
                <p>
                  I focus on building <strong className="text-white">engaging user experiences</strong> and have led the development of some of LiveScore's <strong className="text-white">most innovative</strong> and <strong className="text-white">high-retention</strong> features.
                </p>
                <p>
                  Passionate about emerging technologies, industry trends and multidisciplinary design, with a belief in <strong className="text-white">continuous learning.</strong>
                </p>
              </div>
              </div>
            </div>

            {/* Speaking Photo */}
            <div 
              className="rounded-[24px] p-[2px] shadow-xl overflow-hidden"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
              }}
            >
              <div className="rounded-[22px] overflow-hidden">
                <img 
                src={speakingPhoto}
                alt="Speaking at an event"
                className="w-full h-auto object-cover"
              />
              </div>
            </div>
          </div>
          
          {/* Row 2: 4 Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displaySkills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}