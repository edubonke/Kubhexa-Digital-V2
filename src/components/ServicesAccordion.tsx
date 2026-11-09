import { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

interface ServicesAccordionProps {
  onOpenProjectModal: (preselectedPackage?: string) => void;
}

export function ServicesAccordion({ onOpenProjectModal }: ServicesAccordionProps) {
  // Default open item is "UX & product design" as specified in the prompt
  const [openServiceId, setOpenServiceId] = useState<string>('ux-design');

  const services = [
    {
      id: 'websites',
      number: '01',
      title: 'Websites & digital presence',
      shortDescription: 'Make your offer clear and give customers a simple way to enquire, book, or buy.',
      bodyCopy: 'A considered website connects your content, brand, and customer journey. We plan the structure, design for mobile, and build around the actions that matter.',
      outcome: 'A clearer path to your customers.',
      scopeList: [
        'Business websites',
        'Landing pages',
        'Enquiry & booking journeys',
        'Launch & analytics setup'
      ],
      packageId: 'business'
    },
    {
      id: 'apps',
      number: '02',
      title: 'Apps & business systems',
      shortDescription: 'Give your customers and team a better way to get things done.',
      bodyCopy: 'We focus on one useful workflow at a time, from a customer portal to a staff dashboard. A phased release helps you test the approach before expanding the product.',
      outcome: 'One useful workflow. A better working day.',
      scopeList: [
        'Web & mobile applications',
        'Customer portals',
        'Business dashboards',
        'Agreed integrations'
      ],
      packageId: 'bookings'
    },
    {
      id: 'ux-design',
      number: '03',
      title: 'UX & product design',
      shortDescription: 'Understand the journey. Test the important decisions. Build with a clearer direction.',
      bodyCopy: 'Explore your idea before investing in a full build. We turn business goals and user needs into a practical, testable product experience.',
      outcome: 'A practical, testable product experience.',
      scopeList: [
        'User & journey research',
        'Wireframes & prototypes',
        'Usability testing',
        'Interface design systems'
      ],
      packageId: 'showcase'
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenServiceId(openServiceId === id ? '' : id);
  };

  return (
    <section id="services" className="relative w-full bg-[#050625] py-28 md:py-36 border-t border-[#DAE0E5]/15" aria-label="Services">
      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Heading */}
        <div className="max-w-[840px] mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>03 / Services</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-6">
            Digital that does more for your <span className="text-[#297EE9]">business.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[50ch]">
            From your first website to the system your team uses every day. We help you find the right place to start.
          </p>
        </div>

        {/* Large Typographic Full-Width Accordion Rows with 1px Dividers (NO cards) */}
        <div className="border-t border-[#DAE0E5]/15">
          {services.map((service) => {
            const isOpen = openServiceId === service.id;

            return (
              <div
                key={service.id}
                className="border-b border-[#DAE0E5]/15 transition-colors duration-200"
              >
                {/* Large Typographic Row Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(service.id)}
                  aria-expanded={isOpen}
                  className="w-full py-10 md:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-12 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9]"
                >
                  {/* Left: Number + Monumental Title (48–72px) */}
                  <div className="flex items-baseline gap-4 md:gap-8 lg:w-3/5">
                    <span className="text-base md:text-lg font-mono text-[#297EE9] font-bold">
                      {service.number}
                    </span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] tracking-tight group-hover:text-[#297EE9] transition-colors duration-200 leading-[1.02]">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Short summary & Plus/Minus icon */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-2/5">
                    <p className="text-base sm:text-lg text-[#DAE0E5]/75 font-normal leading-relaxed max-w-[40ch]">
                      {service.shortDescription}
                    </p>
                    <div className="w-12 h-12 shrink-0 rounded-full border border-[#DAE0E5]/20 flex items-center justify-center text-[#F9F6FF] group-hover:border-[#297EE9] group-hover:text-[#297EE9] transition-all">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[#297EE9]" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Content: Pure Typographic Layout without any card boxes */}
                {isOpen && (
                  <div className="pb-16 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="lg:col-span-2 text-xs font-mono uppercase tracking-widest text-[#297EE9]">
                      Scope & Blueprint
                    </div>

                    <div className="lg:col-span-6 flex flex-col pr-0 lg:pr-8">
                      <p className="text-base sm:text-lg text-[#DAE0E5] leading-relaxed mb-8 font-normal">
                        {service.bodyCopy}
                      </p>

                      <button
                        onClick={() => onOpenProjectModal(service.packageId)}
                        className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#297EE9] hover:text-[#F9F6FF] transition-colors group/link cursor-pointer w-fit"
                      >
                        <span className="border-b border-[#297EE9] pb-0.5">Find your starting point</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </button>
                    </div>

                    {/* Unboxed Scope List with Hairline Rule (NO card box) */}
                    <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#DAE0E5]/15 pt-6 lg:pt-0 lg:pl-8">
                      <span className="block text-xs font-mono uppercase tracking-widest text-[#DAE0E5]/60 mb-4">
                        Included Deliverables
                      </span>
                      <ul className="space-y-3.5 text-xs sm:text-sm text-[#DAE0E5]/90 font-mono">
                        {service.scopeList.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5">
                            <span className="text-[#297EE9] shrink-0 font-bold">▪</span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
