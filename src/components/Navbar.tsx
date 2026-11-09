import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { KubhexaLogo } from './KubhexaLogo';

interface NavbarProps {
  onOpenProjectModal: (preselectedPackage?: string) => void;
}

export function Navbar({ onOpenProjectModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Templates', href: '#templates' },
    { name: 'Approach', href: '#approach' },
    { name: 'Studio', href: '#studio' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050625]/95 backdrop-blur-md border-b border-[#DAE0E5]/15 py-3.5 shadow-xl shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Left: Kubhexa K mark and wordmark */}
          <a
            href="#"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9] rounded"
            aria-label="Kubhexa Digital homepage"
          >
            <KubhexaLogo />
          </a>

          {/* Center Links (Desktop) */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm tracking-tight font-medium text-[#DAE0E5]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-[#F9F6FF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#297EE9] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Electric-blue pill button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#297EE9] text-[#F9F6FF] text-xs font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-[#1E6CD4] hover:shadow-[0_0_24px_rgba(41,126,233,0.45)] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050625]"
            >
              <span>Start a project</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded text-[#F9F6FF] hover:text-[#297EE9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Dark Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#050625] flex flex-col justify-between pt-24 pb-12 px-8 md:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#297EE9]">
              Menu Navigation
            </span>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-2xl font-bold text-[#F9F6FF] hover:text-[#297EE9] transition-colors py-1 flex items-center justify-between border-b border-[#DAE0E5]/10"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#DAE0E5]/50" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#DAE0E5]/15">
            <div className="text-xs text-[#DAE0E5]/70 font-mono">
              Small-business websites from R2,990 once-off.
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full py-4 rounded-full bg-[#297EE9] text-[#F9F6FF] text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-[#1E6CD4] text-center"
            >
              Start a project
            </button>
          </div>
        </div>
      )}
    </>
  );
}
