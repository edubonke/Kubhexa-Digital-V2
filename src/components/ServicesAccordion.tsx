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
      shortDescription: 'High-speed, SEO-tuned business websites designed to turn anonymous search traffic into qualified local inquiries.',
      bodyCopy: 'We design and engineer bespoke web presences that communicate your positioning with instant clarity. Every build is optimized for Google Core Web Vitals, mobile viewport responsiveness, and rapid lead capture via automated WhatsApp and email routing.',
      scopeList: [
        'Custom brand-aligned typography and responsive layout architecture',
        'Technical on-page SEO schema, metadata, and local search indexing',
        'Ultra-fast asset delivery pipeline with zero bloated dependencies',
        'Direct inquiry capture with automated SMS and WhatsApp webhooks'
      ],
      packageId: 'business'
    },
    {
      id: 'apps',
      number: '02',
      title: 'Apps & business systems',
      shortDescription: 'Custom internal tools, client portals, and automated operations engines that eliminate manual administrative drag.',
      bodyCopy: 'From customer onboarding portals to technician scheduling consoles, we build secure, reactive web applications that streamline how your company operates. We integrate real-time databases, user authentication, automated notifications, and payment settlement.',
      scopeList: [
        'Secure role-based authentication and client portal access control',
        'Live operational dashboards, task dispatch queues, and telemetry',
        'South African payment gateway integration (PayFast, Ozow, Yoco)',
        'Automated document generation, invoices, and customer notifications'
      ],
      packageId: 'bookings'
    },
    {
      id: 'ux-design',
      number: '03',
      title: 'UX & product design',
      shortDescription: 'User research, wireframing, high-fidelity prototypes, and design systems for ambitious software founders.',
      bodyCopy: 'Great software starts with structural empathy. We dissect user workflows, map complex edge cases, and craft polished interactive prototypes in Figma before writing a single line of code. You get tested interaction models that developers can execute without friction.',
      scopeList: [
        'User journey discovery, workflow mapping, and information architecture',
        'High-fidelity interactive prototypes with realistic edge-case states',
        'Scalable design systems with tokens, micro-interactions, and accessibility',
        'Figma to production handoff with design token documentation'
      ],
      packageId: 'showcase'
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenServiceId(openServiceId === id ? '' : id);
  };

  return (
    <section id="services" className="relative w-full bg-[#050625] py-24 md:py-32 border-t border-[#DAE0E5]/15" aria-label="Services">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="max-w-[800px] mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>03 / Capabilities</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-6">
            Digital that does more for your business.
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[50ch]">
            Focused capabilities tailored for companies making their next strategic leap.
          </p>
        </div>

        {/* Full-width Accordion Rows with 1px Dividers */}
        <div className="border-t border-[#DAE0E5]/15">
          {services.map((service) => {
            const isOpen = openServiceId === service.id;

            return (
              <div
                key={service.id}
                className="border-b border-[#DAE0E5]/15 transition-colors duration-200"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(service.id)}
                  aria-expanded={isOpen}
                  className="w-full py-8 md:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9]"
                >
                  {/* Left: Number + Title (40–56px) */}
                  <div className="flex items-baseline gap-4 md:gap-6 lg:w-1/2">
                    <span className="text-sm font-mono text-[#297EE9] font-bold">
                      {service.number}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F6FF] tracking-tight group-hover:text-[#297EE9] transition-colors duration-200">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Short description & Plus/Minus icon */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-1/2">
                    <p className="text-sm sm:text-base text-[#DAE0E5]/75 font-normal leading-relaxed max-w-[42ch]">
                      {service.shortDescription}
                    </p>
                    <div className="w-10 h-10 shrink-0 rounded-full border border-[#DAE0E5]/20 flex items-center justify-center text-[#F9F6FF] group-hover:border-[#297EE9] group-hover:text-[#297EE9] transition-all">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[#297EE9]" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Content with Smooth Height Transition */}
                {isOpen && (
                  <div className="pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="lg:col-span-3 text-xs font-mono uppercase tracking-wider text-[#297EE9]">
                      Scope & Deliverables
                    </div>

                    <div className="lg:col-span-5 flex flex-col">
                      <p className="text-base text-[#DAE0E5] leading-relaxed mb-6 font-normal">
                        {service.bodyCopy}
                      </p>

                      <button
                        onClick={() => onOpenProjectModal(service.packageId)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#297EE9] hover:text-[#F9F6FF] transition-colors group/link cursor-pointer w-fit"
                      >
                        <span>Find your starting point</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </button>
                    </div>

                    <div className="lg:col-span-4 bg-[#080B32]/70 p-6 rounded-lg border border-[#DAE0E5]/10">
                      <span className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/60 mb-3">
                        Included in this engagement:
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-[#DAE0E5]/90 font-mono">
                        {service.scopeList.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <span className="text-[#297EE9] shrink-0 mt-0.5">▪</span>
                            <span>{item}</span>
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
