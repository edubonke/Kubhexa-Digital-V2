import { useEffect } from 'react';
import { X, ArrowUpRight, ExternalLink, Check, Layers, Code, Sparkles } from 'lucide-react';
import { ProjectItem } from './SelectedWork';

interface ProjectViewerModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartSimilarProject: (packageId?: string) => void;
}

export function ProjectViewerModal({ project, onClose, onStartSimilarProject }: ProjectViewerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
    >
      <div className="relative w-full max-w-5xl bg-[#07092E] border border-[#DAE0E5]/20 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#090C3B] border-b border-[#DAE0E5]/15 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#297EE9] uppercase tracking-wider">
              Project {project.number}
            </span>
            <span className="text-[#DAE0E5]/30">|</span>
            <span className="text-sm font-semibold text-[#F9F6FF] truncate">
              {project.title}
            </span>
            <span className="hidden sm:inline text-xs text-[#DAE0E5]/60 font-mono">
              ({project.category})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-[#DAE0E5]/70 hover:text-[#F9F6FF] rounded-lg border border-[#DAE0E5]/10 hover:border-[#DAE0E5]/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9]"
              aria-label="Close project viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Big Editorial Header */}
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-2">
              Case Study & System Overview
            </div>
            <h2 id="viewer-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F6FF] mb-4 tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#DAE0E5]/90 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Browser Mockup Frame with Real Screenshot */}
          <div className="rounded-xl border border-[#DAE0E5]/20 bg-[#050625] overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-[#0A0D3B] border-b border-[#DAE0E5]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs font-mono text-[#DAE0E5]/60 px-3 py-1 rounded bg-[#050625] border border-[#DAE0E5]/10 flex items-center gap-2">
                <span>{project.liveUrlMock}</span>
                <ExternalLink className="w-3 h-3 text-[#297EE9]" />
              </div>
              <div className="w-12 text-right">
                <span className="text-[10px] font-mono text-[#297EE9]">ONLINE</span>
              </div>
            </div>

            <div className="relative aspect-[16/10] max-h-[560px] overflow-hidden bg-[#050625]">
              <img
                src={project.imageSrc}
                alt={`${project.title} detailed web interface`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Impact Metrics & Scope Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Left: Engineering & Case Details */}
            <div className="p-6 rounded-lg bg-[#050625] border border-[#DAE0E5]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#297EE9] mb-3">
                  <Code className="w-4 h-4" />
                  <span>Architecture & Execution</span>
                </div>
                <p className="text-sm text-[#DAE0E5]/80 leading-relaxed mb-6 font-normal">
                  {project.caseStudyDetails}
                </p>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/50 mb-2">
                  Scope Deliverables:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.scopeTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-[#07092E] border border-[#DAE0E5]/15 text-[#DAE0E5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quantified Outcomes */}
            <div className="p-6 rounded-lg bg-[#050625] border border-[#DAE0E5]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#297EE9] mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Key Commercial Results</span>
                </div>
                <div className="space-y-4 mb-6">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#297EE9]/20 border border-[#297EE9] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#297EE9]" />
                      </div>
                      <span className="text-sm font-semibold text-[#F9F6FF] font-mono">
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#DAE0E5]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#DAE0E5]/60">
                  Ready for this level of polish?
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onStartSimilarProject(project.id === 'alphasonic' ? 'business' : project.id === 'edubonke' ? 'showcase' : 'bookings');
                  }}
                  className="px-4 py-2 rounded-full bg-[#297EE9] text-[#F9F6FF] text-xs font-semibold uppercase tracking-wider hover:bg-[#1E6CD4] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Build something like this</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
