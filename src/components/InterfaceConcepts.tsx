import { ArrowUpRight } from 'lucide-react';

interface InterfaceConceptsProps {
  onOpenProjectModal: (preselectedPackage?: string) => void;
}

export function InterfaceConcepts({ onOpenProjectModal }: InterfaceConceptsProps) {
  const concepts = [
    {
      number: '01',
      title: 'A simpler way to book.',
      subtitle: 'Booking experience',
      description: 'Zero-friction calendar selection, interactive slot availability, and instant SMS confirmation designed to eliminate appointment drop-offs.',
      aspectRatioClass: 'aspect-[16/10]',
      imageSrc: '/src/assets/images/concept_booking_1794236458542.jpg',
      packageRecommendation: 'bookings'
    },
    {
      number: '02',
      title: 'Everything in one place.',
      subtitle: 'Customer portal',
      description: 'Centralized client command hub combining project delivery milestones, real-time status trackers, file downloads, and instant invoice settlements.',
      aspectRatioClass: 'aspect-[3/4]',
      imageSrc: '/src/assets/images/concept_portal_1794236458945.jpg',
      packageRecommendation: 'business'
    }
  ];

  return (
    <section id="concepts" className="relative w-full bg-[#050625] py-24 md:py-32 border-t border-[#DAE0E5]/15" aria-label="Interface concepts">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="max-w-[800px] mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>02 / R&D & Concept Interfaces</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#F9F6FF] mb-6">
            Explore our interface concepts.
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[50ch]">
            Experimental interaction models tested for clarity, speed, and real-world conversion.
          </p>
        </div>

        {/* Two-up Asymmetrical Grid: one landscape, one portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Concept 01 (Landscape, spans 7 columns) */}
          <div className="lg:col-span-7 flex flex-col group">
            {/* Minimal dark frame */}
            <div className="relative rounded-xl border border-[#DAE0E5]/15 bg-[#080B32] overflow-hidden mb-6 transition-all duration-500 hover:border-[#297EE9]/50 shadow-2xl">
              <div className={`${concepts[0].aspectRatioClass} w-full overflow-hidden bg-[#050625]`}>
                <img
                  src={concepts[0].imageSrc}
                  alt={concepts[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Minimal Caption below (not overlaid card) */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-xs font-mono text-[#DAE0E5]/70 uppercase tracking-widest mb-2">
                <span className="text-[#297EE9] font-bold text-sm">01</span>
                <span aria-hidden="true">·</span>
                <span>{concepts[0].subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F9F6FF] mb-2 tracking-tight group-hover:text-[#297EE9] transition-colors">
                {concepts[0].title}
              </h3>
              <p className="text-sm sm:text-base text-[#DAE0E5]/80 font-normal leading-relaxed mb-4 max-w-[48ch]">
                {concepts[0].description}
              </p>
              <button
                onClick={() => onOpenProjectModal(concepts[0].packageRecommendation)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#297EE9] hover:text-[#F9F6FF] transition-colors cursor-pointer"
              >
                <span>Request booking prototype integration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Concept 02 (Portrait, spans 5 columns) */}
          <div className="lg:col-span-5 flex flex-col group">
            {/* Minimal dark frame */}
            <div className="relative rounded-xl border border-[#DAE0E5]/15 bg-[#080B32] overflow-hidden mb-6 transition-all duration-500 hover:border-[#297EE9]/50 shadow-2xl">
              <div className={`${concepts[1].aspectRatioClass} w-full overflow-hidden bg-[#050625]`}>
                <img
                  src={concepts[1].imageSrc}
                  alt={concepts[1].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Minimal Caption below */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-xs font-mono text-[#DAE0E5]/70 uppercase tracking-widest mb-2">
                <span className="text-[#297EE9] font-bold text-sm">02</span>
                <span aria-hidden="true">·</span>
                <span>{concepts[1].subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F9F6FF] mb-2 tracking-tight group-hover:text-[#297EE9] transition-colors">
                {concepts[1].title}
              </h3>
              <p className="text-sm sm:text-base text-[#DAE0E5]/80 font-normal leading-relaxed mb-4 max-w-[44ch]">
                {concepts[1].description}
              </p>
              <button
                onClick={() => onOpenProjectModal(concepts[1].packageRecommendation)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#297EE9] hover:text-[#F9F6FF] transition-colors cursor-pointer"
              >
                <span>Deploy client portal system</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
