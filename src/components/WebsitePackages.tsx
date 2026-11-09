import { ArrowUpRight, Clock } from 'lucide-react';
import { WEBSITE_PACKAGES, PackageTier } from '../utils/pricing';

interface WebsitePackagesProps {
  onSelectPackage: (pkg: PackageTier) => void;
}

export function WebsitePackages({ onSelectPackage }: WebsitePackagesProps) {
  return (
    <section id="packages" className="relative w-full bg-[#050625] py-24 md:py-32 border-t border-[#DAE0E5]/15" aria-label="Website packages">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-[800px] mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>04 / Transparent Investment</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-6">
            Your starting point. Your brand.
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[52ch]">
            No ambiguous estimates or agency markups. Fixed scope, guaranteed timelines, and production-grade craftsmanship.
          </p>
        </div>

        {/* Five Tiers in Horizontal Comparison Layout on Desktop (Scrollable/Stack on mobile) */}
        <div className="overflow-x-auto pb-6 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 min-w-[900px] lg:min-w-0">
            {WEBSITE_PACKAGES.map((pkg) => {
              const isStart = pkg.id === 'start';

              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col justify-between p-6 rounded-lg bg-[#07092E] transition-all duration-300 hover:bg-[#090C3B] ${
                    isStart
                      ? 'border-2 border-[#297EE9] shadow-[0_0_35px_rgba(41,126,233,0.15)] ring-1 ring-[#297EE9]/50'
                      : 'border border-[#DAE0E5]/15 hover:border-[#297EE9]/40'
                  }`}
                >
                  {/* Top: Recommended badge or package number */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono text-[#DAE0E5]/60 uppercase tracking-widest">
                        Tier {pkg.number}
                      </span>
                      {isStart && (
                        <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#CEF23F] bg-[#CEF23F]/10 px-2 py-0.5 rounded border border-[#CEF23F]/30">
                          Recommended
                        </span>
                      )}
                    </div>

                    {/* Tier Name */}
                    <h3 className="text-2xl font-bold text-[#F9F6FF] mb-2 tracking-tight">
                      {pkg.name}
                    </h3>

                    {/* Price at 40–48px as specified */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl lg:text-[44px] font-bold text-[#F9F6FF] tracking-tight tabular-nums">
                          {pkg.priceFormatted}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#DAE0E5]/60 block mt-0.5">
                        {pkg.priceLabel}
                      </span>
                    </div>

                    {/* Target Audience & Scope */}
                    <div className="border-t border-[#DAE0E5]/10 pt-4 mb-5">
                      <p className="text-xs text-[#DAE0E5]/90 mb-2 leading-relaxed">
                        <strong className="text-[#F9F6FF] font-medium block mb-0.5">For:</strong>
                        {pkg.audience}
                      </p>
                      <p className="text-xs text-[#DAE0E5]/70 leading-relaxed font-mono">
                        <strong className="text-[#F9F6FF] font-medium block font-sans mb-0.5">Architecture:</strong>
                        {pkg.scope}
                      </p>
                    </div>

                    {/* 3–4 Feature Bullets */}
                    <div className="space-y-2.5 mb-6 border-t border-[#DAE0E5]/10 pt-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#DAE0E5]/50 block mb-1">
                        Scope includes:
                      </span>
                      {pkg.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#DAE0E5]">
                          <span className="text-[#297EE9] font-bold text-sm leading-none shrink-0 mt-0.5">▪</span>
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Delivery Time and Blue text CTA */}
                  <div className="border-t border-[#DAE0E5]/10 pt-4 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#DAE0E5]/70 mb-4">
                      <Clock className="w-3.5 h-3.5 text-[#297EE9]" />
                      <span>{pkg.deliveryTime}</span>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className={`w-full py-2.5 px-3 rounded text-xs font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9] ${
                        isStart
                          ? 'bg-[#297EE9] text-[#F9F6FF] hover:bg-[#1E6CD4]'
                          : 'text-[#297EE9] border border-[#297EE9]/40 hover:bg-[#297EE9] hover:text-[#F9F6FF]'
                      }`}
                    >
                      <span>Start with this package</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
