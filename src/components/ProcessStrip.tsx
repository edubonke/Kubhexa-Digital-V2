export function ProcessStrip() {
  const steps = [
    {
      number: '01',
      title: 'Clarify',
      sentence: 'We map your commercial goals, establish target user flows, and lock in precise deliverables.'
    },
    {
      number: '02',
      title: 'Design',
      sentence: 'Interactive Figma prototypes and typography hierarchies tested for clarity before development.'
    },
    {
      number: '03',
      title: 'Build',
      sentence: 'Fast, modular TypeScript architecture with responsive layouts, Core Web Vitals, and SEO.'
    },
    {
      number: '04',
      title: 'Launch',
      sentence: 'End-to-end device testing, domain cutover, WhatsApp integration, and seamless deployment.'
    }
  ];

  return (
    <section id="process" className="relative w-full bg-[#050625] py-20 md:py-28 border-t border-[#DAE0E5]/15" aria-label="Our process">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-[800px] mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>05 / Methodology</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#F9F6FF] mb-4">
            How it works.
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[48ch]">
            A disciplined four-phase pipeline engineered for velocity and zero surprises.
          </p>
        </div>

        {/* Four-step Horizontal Strip connected by thin blue line */}
        <div className="relative">
          {/* Continuous connecting line (hidden on mobile, visible md+) */}
          <div className="hidden md:block absolute top-[19px] left-[40px] right-[40px] h-[1px] bg-gradient-to-r from-[#297EE9] via-[#297EE9] to-[#297EE9]/40 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-start group">
                {/* Node indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full border border-[#297EE9] bg-[#050625] flex items-center justify-center font-mono text-xs font-bold text-[#297EE9] shadow-[0_0_15px_rgba(41,126,233,0.3)] group-hover:bg-[#297EE9] group-hover:text-[#F9F6FF] transition-all duration-300">
                    {step.number}
                  </div>
                  <span className="md:hidden text-xs font-mono text-[#DAE0E5]/50">
                    Step {idx + 1} of 4
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-2xl font-bold text-[#F9F6FF] mb-2 tracking-tight group-hover:text-[#297EE9] transition-colors">
                  {step.title}
                </h3>

                {/* One sentence description */}
                <p className="text-sm text-[#DAE0E5]/80 leading-relaxed font-normal">
                  {step.sentence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
