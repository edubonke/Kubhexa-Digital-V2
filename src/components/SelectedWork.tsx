import { ArrowUpRight } from 'lucide-react';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  subType: string;
  introduction: string;
  description: string;
  imageSrc: string;
  liveUrlMock: string;
  scopeTags: string[];
  note: string;
  caseStudyDetails: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'edubonke',
    number: '01',
    title: 'EduBonke',
    category: 'Education platform',
    subType: 'Product prototype',
    introduction: 'A connected experience for college administration and the learner journey.',
    description: 'An education platform exploring admissions, attendance, assessments, portfolio evidence and finance in one workspace. The public demonstration offers separate student and staff experiences.',
    imageSrc: '/assets/projects/edubonke.webp',
    liveUrlMock: 'https://edubonke.github.io/EduBonke/',
    scopeTags: ['Product & interface design', 'Student and staff workflows', 'Interactive web application'],
    note: 'The preview uses synthetic information and needs no account. It demonstrates the product experience; it is not a live college deployment.',
    caseStudyDetails: 'An education platform exploring admissions, attendance, assessments, portfolio evidence and finance in one workspace. The public demonstration offers separate student and staff experiences.'
  },
  {
    id: 'shiftstart',
    number: '02',
    title: 'ShiftStart',
    category: 'IT support platform',
    subType: 'Independent product',
    introduction: "Searchable support knowledge, shaped around a technician's next step.",
    description: 'An IT support knowledge platform with procedure search, a symptom wizard and a structured reading workspace. The interface makes content status and review requirements visible alongside the guidance.',
    imageSrc: '/assets/projects/shiftstart.webp',
    liveUrlMock: 'https://h9b4y8mf87-bit.github.io/Shift-Start-IT-Support-assistent/',
    scopeTags: ['Knowledge architecture', 'Search & guided troubleshooting', 'Responsive interface development'],
    note: 'Explore the public interface. Procedure verification status is shown within ShiftStart; inclusion here does not certify the technical guidance.',
    caseStudyDetails: 'An IT support knowledge platform with procedure search, a symptom wizard and a structured reading workspace. The interface makes content status and review requirements visible alongside the guidance.'
  },
  {
    id: 'alphasonic',
    number: '03',
    title: 'Alphasonic International',
    category: 'Construction & renovations',
    subType: 'Business website',
    introduction: 'Real project work and a clear route from browsing to a site assessment.',
    description: 'A service-led construction and renovation website bringing project photographs, video, service information and site assessment enquiries into one responsive experience.',
    imageSrc: '/assets/projects/alphasonic.webp',
    liveUrlMock: 'https://edubonke.github.io/Alphasonic-International/',
    scopeTags: ['Business website design', 'Project & video gallery', 'Site assessment enquiry journey'],
    note: 'This is the live business website. Enquiry forms and contact links connect to Alphasonic.',
    caseStudyDetails: 'A service-led construction and renovation website bringing project photographs, video, service information and site assessment enquiries into one responsive experience.'
  }
];

interface SelectedWorkProps {
  onOpenProjectViewer: (project: ProjectItem) => void;
}

export function SelectedWork({ onOpenProjectViewer }: SelectedWorkProps) {
  return (
    <section id="work" className="relative w-full bg-[#050625] py-28 md:py-36" aria-label="Selected work">
      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-[840px] mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>01 / Selected Work</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-5">
            Real projects. Ready to explore.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#F9F6FF]/90 font-medium leading-relaxed mb-3">
            Selected work by Kubhexa founder Phumlane Kubheka. Explore the websites and product experiences below.
          </p>
          <p className="text-sm sm:text-base text-[#DAE0E5]/70 font-normal leading-relaxed max-w-[48ch]">
            Go beyond the screenshot. Open a project, scroll through the website, and try the experience.
          </p>
        </div>

        {/* Full-width Editorial Project Rows with Alternating Image Alignment */}
        <div className="flex flex-col gap-28 md:gap-40">
          {PROJECTS.map((project, idx) => {
            const isImageRight = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className={`w-full flex flex-col ${
                  isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-10 md:gap-14 lg:gap-20 group`}
              >
                {/* Large Browser-Framed Media Container (Edge-to-edge feeling) */}
                <div
                  onClick={() => onOpenProjectViewer(project)}
                  className="w-full lg:w-[58%] rounded-xl border border-[#DAE0E5]/15 bg-[#050625] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:border-[#297EE9]/60 hover:shadow-[0_25px_60px_rgba(41,126,233,0.14)]"
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
                  {/* Minimal Technical Browser Frame Header matching live site */}
                  <div className="px-4 py-3 bg-[#06082A] border-b border-[#DAE0E5]/10 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#DAE0E5]/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#DAE0E5]/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#DAE0E5]/30" />
                    </div>
                    <div className="text-xs font-mono font-medium text-[#F9F6FF] flex items-center gap-2">
                      <span>{project.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#297EE9] uppercase tracking-wider flex items-center gap-1">
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
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

                {/* Project Editorial Content: Larger Project Titles */}
                <div className="w-full lg:w-[42%] flex flex-col justify-center items-start">
                  {/* Project Number & Category unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#DAE0E5]/70 uppercase tracking-widest mb-4">
                    <span className="text-[#297EE9] font-bold text-sm">{project.number}</span>
                    <span aria-hidden="true" className="text-[#DAE0E5]/40">/</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="text-[#DAE0E5]/40">·</span>
                    <span className="text-[#F9F6FF]/60">{project.subType}</span>
                  </div>

                  {/* Monumental Title: 44–68px */}
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-[#F9F6FF] tracking-tight leading-[1.02] mb-3 group-hover:text-[#297EE9] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Short Introduction Hook */}
                  <p className="text-lg sm:text-xl text-[#F9F6FF] font-medium leading-snug mb-3 max-w-[44ch]">
                    {project.introduction}
                  </p>

                  {/* Comprehensive Description */}
                  <p className="text-sm sm:text-base text-[#DAE0E5]/75 font-normal leading-relaxed mb-6 max-w-[44ch]">
                    {project.description}
                  </p>

                  {/* Scope deliverables */}
                  <div className="flex flex-col gap-2 mb-4 text-xs font-mono text-[#DAE0E5]/70">
                    {project.scopeTags.map((tag, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <span className="text-[#297EE9] font-bold">▪</span>
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>

                  {/* Note disclosure */}
                  <p className="text-xs text-[#DAE0E5]/60 leading-relaxed font-sans mb-8 max-w-[44ch]">
                    {project.note}
                  </p>

                  {/* Text link with arrow */}
                  <button
                    onClick={() => onOpenProjectViewer(project)}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#F9F6FF] hover:text-[#297EE9] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9] group/btn"
                  >
                    <span className="border-b border-[#F9F6FF]/40 pb-0.5 group-hover/btn:border-[#297EE9]">
                      Inspect project live
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-[#297EE9]" />
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
