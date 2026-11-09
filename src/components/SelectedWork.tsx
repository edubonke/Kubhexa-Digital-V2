import { ArrowUpRight } from 'lucide-react';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  subType: string;
  description: string;
  imageSrc: string;
  liveUrlMock: string;
  metrics: string[];
  scopeTags: string[];
  caseStudyDetails: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'edubonke',
    number: '01',
    title: 'EduBonke',
    category: 'Education platform',
    subType: 'Product prototype',
    description: 'A modern, modular e-learning portal engineered for African curriculum pathways, skill mastery tracking, and high-engagement cohort learning.',
    imageSrc: '/src/assets/images/project_edubonke_1794236456082.jpg',
    liveUrlMock: 'https://edubonke.figma.eds.com/dashboard',
    metrics: ['73% Weekly Goal Completion', '18 Active Learning Modules', 'Zero-Friction Student Onboarding'],
    scopeTags: ['UX Architecture', 'Web App Engineering', 'Dashboard UI', 'Design System'],
    caseStudyDetails: 'Designed and prototyped to resolve complex e-learning navigation into clear, modular learning paths. Features high-legibility dark mode, real-time analytics graphs, responsive mobile lesson players, and localized content delivery optimization.'
  },
  {
    id: 'shiftstart',
    number: '02',
    title: 'ShiftStart',
    category: 'IT support platform',
    subType: 'Independent product',
    description: 'An authoritative real-time IT operations console featuring automated triage queues, live device telemetry, and technician dispatch scheduling.',
    imageSrc: '/src/assets/images/project_shiftstart_1794236457794.jpg',
    liveUrlMock: 'https://app.shiftstart.io/dashboard',
    metrics: ['1,215 Healthy Devices Monitored', '184 Total Tickets Resolved', '< 15m Mean First Response'],
    scopeTags: ['Real-time Architecture', 'Operations Console', 'System Telemetry', 'B2B SaaS'],
    caseStudyDetails: 'Built as an end-to-end incident management workstation. Aggregates multi-endpoint hardware telemetry, server uptimes, and ticketing queues into a single command view that empowers support teams to identify and resolve blockers instantaneously.'
  },
  {
    id: 'alphasonic',
    number: '03',
    title: 'Alphasonic International',
    category: 'Construction & renovations',
    subType: 'Business website',
    description: 'A monumental corporate web presence for a premier commercial construction and civil renovation firm, balancing architectural scale with technical precision.',
    imageSrc: '/src/assets/images/project_alphasonic_1794236459952.jpg',
    liveUrlMock: 'https://alphasonicinternational.com',
    metrics: ['Multi-million Rand Project Catalog', 'B2B Tender Lead Generation', '100% Mobile & Desktop Sync'],
    scopeTags: ['Corporate Identity', 'Architectural Showcase', 'Lead Generation', 'Technical SEO'],
    caseStudyDetails: 'Engineered to showcase heavy infrastructure, airport terminal expansions, and heritage restorations. Incorporates structured project taxonomy, blueprint engineering details, and high-impact structural photography that wins high-value commercial tenders.'
  }
];

interface SelectedWorkProps {
  onOpenProjectViewer: (project: ProjectItem) => void;
}

export function SelectedWork({ onOpenProjectViewer }: SelectedWorkProps) {
  return (
    <section id="work" className="relative w-full bg-[#050625] py-24 md:py-32" aria-label="Selected work">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-[800px] mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>01 / Selected Work</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-6">
            Real projects. Ready to explore.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[48ch]">
            Go beyond the screenshot. Open a project, scroll through the website, and try the experience.
          </p>
        </div>

        {/* 3 Large Editorial Project Rows (Alternating Layout) */}
        <div className="flex flex-col gap-24 md:gap-36">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-8 sm:gap-12 lg:gap-16 group`}
              >
                {/* Large Browser-Framed Image Container */}
                <div
                  onClick={() => onOpenProjectViewer(project)}
                  className="w-full lg:w-3/5 rounded-xl border border-[#DAE0E5]/15 bg-[#080B32] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:border-[#297EE9]/60 hover:shadow-[0_20px_50px_rgba(41,126,233,0.18)]"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenProjectViewer(project);
                    }
                  }}
                  aria-label={`View case study for ${project.title}`}
                >
                  {/* Minimal Browser Frame Header */}
                  <div className="px-4 py-3 bg-[#0A0D3B] border-b border-[#DAE0E5]/10 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-[11px] font-mono text-[#DAE0E5]/50 truncate max-w-[240px] px-3 py-0.5 rounded bg-[#050625]/80 border border-[#DAE0E5]/10">
                      {project.liveUrlMock}
                    </div>
                    <span className="text-[10px] font-mono text-[#297EE9] uppercase tracking-wider">
                      Interactive
                    </span>
                  </div>

                  {/* Browser Media with Hover Scale & Blue-tinted Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#050625]">
                    <img
                      src={project.imageSrc}
                      alt={`${project.title} - ${project.category}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    {/* Blue overlay at 12% opacity revealed on hover */}
                    <div className="absolute inset-0 bg-[#297EE9] opacity-0 group-hover:opacity-12 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Project Editorial Text Description */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center items-start">
                  {/* Project Number & Category unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#DAE0E5]/70 uppercase tracking-widest mb-3">
                    <span className="text-[#297EE9] font-bold">{project.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#F9F6FF]/60">{project.subType}</span>
                  </div>

                  {/* Title 40–56px */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F6FF] tracking-tight mb-4 group-hover:text-[#297EE9] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* One-line / concise description */}
                  <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metric highlights */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-xs font-mono text-[#DAE0E5]/60">
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <span key={mIdx} className="flex items-center gap-1.5">
                        <span className="text-[#297EE9]">✓</span>
                        <span>{m}</span>
                      </span>
                    ))}
                  </div>

                  {/* Arrow Link to open project details */}
                  <button
                    onClick={() => onOpenProjectViewer(project)}
                    className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#F9F6FF] group-hover:text-[#297EE9] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9] rounded"
                  >
                    <span>Inspect project live</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#297EE9]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
