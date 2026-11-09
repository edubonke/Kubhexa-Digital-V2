import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react';
import { KubhexaLogo } from './KubhexaLogo';

interface ClosingCtaFooterProps {
  onOpenProjectModal: (preselectedPackage?: string) => void;
}

export function ClosingCtaFooter({ onOpenProjectModal }: ClosingCtaFooterProps) {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050625] border-t border-[#DAE0E5]/15 overflow-hidden pt-24 pb-12" aria-label="Closing call to action and site footer">
      {/* Background radial blue bloom */}
      <div className="absolute inset-0 deepbook-glow-bottom pointer-events-none opacity-80" />
      <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Large Closing Statement Banner */}
        <div className="max-w-[960px] mb-24 md:mb-32">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>Ready for what's next</span>
          </div>

          <h2 className="section-display-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F9F6FF] mb-8 tracking-tight">
            Let’s build your <span className="text-[#297EE9]">next move.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[48ch] mb-10">
            Whether launching your first small-business presence or building a bespoke product platform, we turn your requirements into working software.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
            <button
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#297EE9] text-[#F9F6FF] text-base font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[#1E6CD4] hover:shadow-[0_0_35px_rgba(41,126,233,0.5)] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9]"
            >
              Start a project
            </button>

            {/* Secondary: Email & WhatsApp links */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#DAE0E5]">
              <a
                href="mailto:hello@kubhexa.co.za"
                className="inline-flex items-center gap-2 text-[#F9F6FF] hover:text-[#297EE9] transition-colors border-b border-[#DAE0E5]/20 pb-0.5"
              >
                <Mail className="w-4 h-4 text-[#297EE9]" />
                <span>hello@kubhexa.co.za</span>
              </a>

              <a
                href="https://wa.me/27720000000?text=Hi%20Kubhexa%20Digital,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#F9F6FF] hover:text-[#297EE9] transition-colors border-b border-[#DAE0E5]/20 pb-0.5"
              >
                <MessageSquare className="w-4 h-4 text-[#297EE9]" />
                <span>WhatsApp Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Four Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pt-12 pb-16 border-t border-[#DAE0E5]/15">
          {/* Column 1: Work */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
              Selected Work
            </h3>
            <ul className="space-y-3 text-sm text-[#DAE0E5]/80">
              <li>
                <a href="#work" onClick={(e) => scrollTo(e, '#work')} className="hover:text-[#F9F6FF] transition-colors">
                  EduBonke Platform
                </a>
              </li>
              <li>
                <a href="#work" onClick={(e) => scrollTo(e, '#work')} className="hover:text-[#F9F6FF] transition-colors">
                  ShiftStart IT Console
                </a>
              </li>
              <li>
                <a href="#work" onClick={(e) => scrollTo(e, '#work')} className="hover:text-[#F9F6FF] transition-colors">
                  Alphasonic International
                </a>
              </li>
              <li>
                <a href="#concepts" onClick={(e) => scrollTo(e, '#concepts')} className="hover:text-[#F9F6FF] transition-colors">
                  Booking Interface Concept
                </a>
              </li>
              <li>
                <a href="#concepts" onClick={(e) => scrollTo(e, '#concepts')} className="hover:text-[#F9F6FF] transition-colors">
                  Customer Portal Concept
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-[#DAE0E5]/80">
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, '#services')} className="hover:text-[#F9F6FF] transition-colors">
                  Websites & Digital Presence
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, '#services')} className="hover:text-[#F9F6FF] transition-colors">
                  Apps & Business Systems
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, '#services')} className="hover:text-[#F9F6FF] transition-colors">
                  UX & Product Design
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => scrollTo(e, '#process')} className="hover:text-[#F9F6FF] transition-colors">
                  Technical Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Packages */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
              Packages
            </h3>
            <ul className="space-y-3 text-sm text-[#DAE0E5]/80">
              <li>
                <a href="#packages" onClick={(e) => scrollTo(e, '#packages')} className="hover:text-[#F9F6FF] transition-colors">
                  Start (R2,990)
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => scrollTo(e, '#packages')} className="hover:text-[#F9F6FF] transition-colors">
                  Business (R5,990)
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => scrollTo(e, '#packages')} className="hover:text-[#F9F6FF] transition-colors">
                  Showcase (R8,990)
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => scrollTo(e, '#packages')} className="hover:text-[#F9F6FF] transition-colors">
                  Bookings (R11,990)
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => scrollTo(e, '#packages')} className="hover:text-[#F9F6FF] transition-colors">
                  Shop (R17,990)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
              Studio
            </h3>
            <p className="text-sm text-[#DAE0E5]/80 mb-3 leading-relaxed">
              Kubhexa Digital is a South African digital studio building websites, apps, and product experiences.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-[#DAE0E5]/60">
              <div>Johannesburg & Cape Town</div>
              <div>South Africa</div>
              <div className="text-[#297EE9] pt-2">GMT+2 (SAST)</div>
            </div>
          </div>
        </div>

        {/* Oversized KUBHEXA wordmark spanning viewport */}
        <div className="relative py-12 md:py-16 select-none overflow-hidden">
          <div className="text-[14vw] font-black tracking-tighter text-[#0A0E44] leading-none text-center w-full whitespace-nowrap opacity-75 hover:text-[#297EE9]/20 transition-colors duration-700">
            KUBHEXA
          </div>
        </div>

        {/* Bottom Line: Copyright, Location, Socials */}
        <div className="pt-8 border-t border-[#DAE0E5]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#DAE0E5]/60">
          <div className="flex items-center gap-2">
            <KubhexaLogo className="h-5" />
            <span>© 2026 Kubhexa Digital (Pty) Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#DAE0E5]/40">·</span>
            <span>South Africa</span>
            <span className="text-[#DAE0E5]/40">·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#297EE9] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#DAE0E5]/40">·</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#297EE9] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
