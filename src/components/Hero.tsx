import { ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onOpenProjectModal: (preselectedPackage?: string) => void;
}

export function Hero({ onOpenProjectModal }: HeroProps) {
  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[102vh] md:min-h-[108vh] lg:min-h-[112vh] w-full bg-[#050625] overflow-hidden flex flex-col justify-between pt-28 pb-16 md:pt-36 md:pb-24"
      aria-label="Hero section"
    >
      {/* Background DeepBook atmospheric glow and technical grid pattern */}
      <div className="absolute inset-0 deepbook-glow pointer-events-none opacity-80" />
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />

      {/* DESKTOP ONLY: Oversized Cobalt K sculpture cropped on right side */}
      <div className="hidden md:block absolute right-[-8%] top-[8%] lg:right-[-4%] lg:top-[4%] w-[68%] lg:w-[60%] max-w-[1080px] pointer-events-none select-none z-0">
        <div className="relative w-full aspect-[16/9] transition-transform duration-1000 ease-out hover:scale-[1.015]">
          <img
            src="/src/assets/images/hero_cobalt_k_sculpture_1794236455779.jpg"
            alt="Kubhexa cobalt geometric sculpture emerging from dark space"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_70px_rgba(41,126,233,0.32)] mix-blend-screen opacity-90 animate-pulse duration-[7000ms]"
          />
          {/* Subtle atmospheric edge fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050625] via-transparent to-transparent opacity-95 w-1/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050625] via-transparent to-transparent opacity-90 h-1/4 bottom-0 top-auto" />
        </div>
      </div>

      {/* Top Eyebrow / Technical Monospace Lead */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">
        <div className="inline-flex items-center gap-3 text-xs md:text-sm font-mono tracking-wider uppercase text-[#DAE0E5]/80 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" aria-hidden="true" />
          <span>Kubhexa Digital — Websites, apps & product design</span>
        </div>
      </div>

      {/* Main Content anchored bottom-left (Asymmetrical & Editorial) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 mt-auto">
        <div className="max-w-[840px] flex flex-col items-start">
          {/* Monumental Headline in three lines */}
          <h1 className="hero-display-title text-[50px] sm:text-[68px] md:text-[92px] lg:text-[114px] xl:text-[126px] font-bold text-[#F9F6FF] mb-6 select-none">
            <span className="block overflow-hidden">
              <span className="block transform translate-y-0 transition-transform duration-700 ease-out">
                Websites and apps.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block transform translate-y-0 transition-transform duration-700 ease-out delay-100">
                Built for your
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block text-[#297EE9] transform translate-y-0 transition-transform duration-700 ease-out delay-200">
                next move.
              </span>
            </span>
          </h1>

          {/* Subheadline: narrower body copy width as requested */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#DAE0E5]/90 font-normal leading-relaxed max-w-[38ch] mb-8">
            We turn business challenges into digital experiences that work.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7 mb-4">
            {/* Primary blue pill CTA */}
            <button
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#297EE9] text-[#F9F6FF] text-sm md:text-base font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[#1E6CD4] hover:shadow-[0_0_30px_rgba(41,126,233,0.5)] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050625]"
            >
              Start a project
            </button>

            {/* Secondary underlined text link */}
            <a
              href="#work"
              onClick={scrollToWork}
              className="inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-[#F9F6FF] border-b border-[#F9F6FF]/60 pb-0.5 hover:text-[#297EE9] hover:border-[#297EE9] transition-colors group cursor-pointer py-1"
            >
              <span>Explore our work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Small text link below */}
          <a
            href="#packages"
            className="text-xs sm:text-sm font-mono text-[#DAE0E5]/70 hover:text-[#297EE9] transition-colors inline-flex items-center gap-1.5 pt-1 mb-8 md:mb-0"
          >
            <span className="text-[#297EE9]">→</span>
            <span>Small-business websites from R2,990.</span>
          </a>

          {/* MOBILE ONLY: Stacked K sculpture positioned below CTA */}
          <div className="md:hidden w-full pt-4 pb-2 flex justify-center select-none pointer-events-none">
            <div className="relative w-full max-w-[340px] aspect-[16/10]">
              <img
                src="/src/assets/images/hero_cobalt_k_sculpture_1794236455779.jpg"
                alt="Kubhexa cobalt geometric sculpture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(41,126,233,0.35)] mix-blend-screen opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050625] via-transparent to-transparent opacity-80 h-1/3 bottom-0 top-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
