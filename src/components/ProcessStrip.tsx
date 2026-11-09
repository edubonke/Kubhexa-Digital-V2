import { Check } from 'lucide-react';
import { KubhexaLogo } from './KubhexaLogo';

export function ProcessStrip() {
  const steps = [
    {
      number: '01',
      title: 'Understand',
      sentence: 'Your goals, your customers, and where the current experience gets in the way.'
    },
    {
      number: '02',
      title: 'Shape',
      sentence: 'A clear first release and a prototype you can explore before we start building.'
    },
    {
      number: '03',
      title: 'Build',
      sentence: 'Thoughtful development, with agreed milestones and regular demonstrations.'
    },
    {
      number: '04',
      title: 'Launch & improve',
      sentence: 'Release checks, a considered handover, and a plan for what comes next.'
    }
  ];

  return (
    <section id="approach" className="relative w-full bg-[#050625] py-28 md:py-36 border-t border-[#DAE0E5]/15" aria-label="Our process and approach">
      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-[840px] mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>05 / Process & Approach</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-6">
            Clarity first.<br />
            <span className="text-[#297EE9]">Then we build.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[48ch]">
            A practical process, with you involved at every step.
          </p>
        </div>

        {/* Four-step Horizontal Strip connected by thin blue line */}
        <div className="relative mb-16 md:mb-24">
          {/* Continuous connecting line (hidden on mobile, visible md+) */}
          <div className="hidden md:block absolute top-[20px] left-[40px] right-[40px] h-[1px] bg-gradient-to-r from-[#297EE9] via-[#297EE9] to-[#297EE9]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-start group">
                {/* Node indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full border border-[#297EE9] bg-[#050625] flex items-center justify-center font-mono text-xs font-bold text-[#297EE9] shadow-[0_0_15px_rgba(41,126,233,0.25)] group-hover:bg-[#297EE9] group-hover:text-[#F9F6FF] transition-all duration-300">
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

        {/* Clarity Note */}
        <div className="border border-[#DAE0E5]/15 bg-[#050625] p-6 md:p-8 flex items-start sm:items-center gap-4 mb-24 md:mb-32">
          <div className="w-8 h-8 rounded-full border border-[#297EE9]/40 bg-[#297EE9]/10 flex items-center justify-center shrink-0 text-[#297EE9]">
            <Check className="w-4 h-4" />
          </div>
          <p className="text-sm sm:text-base text-[#DAE0E5] leading-relaxed">
            <strong className="text-[#F9F6FF] font-semibold">Know what you are investing in.</strong> We agree the scope, milestones, and handover before development begins.
          </p>
        </div>

        {/* Studio Block: A personal standard for every project */}
        <div id="studio" className="border-t border-[#DAE0E5]/15 pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="lg:col-span-3">
            <div className="w-16 h-16 rounded-xl border border-[#DAE0E5]/20 bg-[#050625] flex items-center justify-center p-3 shadow-xl">
              <KubhexaLogo className="w-full h-full" />
            </div>
            <span className="block text-xs font-mono text-[#297EE9] uppercase tracking-widest mt-4">
              Studio & Philosophy
            </span>
          </div>

          <div className="lg:col-span-9 max-w-[720px]">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F6FF] tracking-tight mb-6 leading-tight">
              A personal standard<br />
              for every project.
            </h3>
            <p className="text-base sm:text-lg text-[#DAE0E5]/85 leading-relaxed font-normal mb-8">
              Kubhexa takes its name from our founder, Kubheka. That personal connection shapes how we work: understand the business, communicate clearly, and take care with the details.
            </p>
            <div className="flex items-baseline gap-3 pt-4 border-t border-[#DAE0E5]/10 font-mono">
              <span className="text-base font-bold text-[#F9F6FF]">Phumlane Kubheka</span>
              <span className="text-xs text-[#297EE9] tracking-wider uppercase">Founder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
