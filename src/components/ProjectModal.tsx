import { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { WEBSITE_PACKAGES, calculateCustomQuote, validateProjectInquiry } from '../utils/pricing';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackageId?: string;
}

export function ProjectModal({ isOpen, onClose, preselectedPackageId }: ProjectModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('start');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [expedited, setExpedited] = useState(false);
  const [copywriting, setCopywriting] = useState(false);
  const [customDomainEmail, setCustomDomainEmail] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRefNumber, setInquiryRefNumber] = useState('');

  useEffect(() => {
    if (preselectedPackageId && WEBSITE_PACKAGES.some(p => p.id === preselectedPackageId)) {
      setSelectedPackage(preselectedPackageId);
    }
  }, [preselectedPackageId, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quote = calculateCustomQuote(selectedPackage, { expedited, copywriting, customDomainEmail });
  const activePackage = WEBSITE_PACKAGES.find(p => p.id === selectedPackage) || WEBSITE_PACKAGES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateProjectInquiry({
      fullName,
      email,
      phone,
      packageId: selectedPackage,
      projectDescription: description
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const ref = `KH-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryRefNumber(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setDescription('');
    setExpedited(false);
    setCopywriting(false);
    setCustomDomainEmail(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#07092E] border border-[#DAE0E5]/20 rounded-xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#DAE0E5]/70 hover:text-[#F9F6FF] rounded-lg border border-[#DAE0E5]/10 hover:border-[#DAE0E5]/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Submission Success State */
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#297EE9]/20 border border-[#297EE9] flex items-center justify-center text-[#297EE9] mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 id="modal-title" className="text-3xl font-bold text-[#F9F6FF] mb-3">
              Inquiry Received
            </h3>

            <p className="text-sm sm:text-base text-[#DAE0E5]/80 max-w-md mb-6 leading-relaxed">
              Thank you, <strong className="text-[#F9F6FF]">{fullName}</strong>. Your project inquiry for the <strong className="text-[#297EE9]">{activePackage.name} ({activePackage.priceFormatted})</strong> package has been logged.
            </p>

            <div className="p-4 rounded-lg bg-[#050625] border border-[#DAE0E5]/15 text-left w-full max-w-md font-mono text-xs mb-8 space-y-2">
              <div className="flex justify-between text-[#DAE0E5]/70">
                <span>Reference:</span>
                <span className="text-[#297EE9] font-bold">{inquiryRefNumber}</span>
              </div>
              <div className="flex justify-between text-[#DAE0E5]/70">
                <span>Estimated Investment:</span>
                <span className="text-[#F9F6FF] font-bold">R{quote.totalPrice.toLocaleString('en-ZA')}</span>
              </div>
              <div className="flex justify-between text-[#DAE0E5]/70">
                <span>Turnaround Time:</span>
                <span className="text-[#F9F6FF]">{quote.deliveryDays}</span>
              </div>
              <div className="flex justify-between text-[#DAE0E5]/70">
                <span>Studio Lead:</span>
                <span className="text-[#F9F6FF]">Phumlane Kubheka</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <a
                href={`https://wa.me/27720000000?text=Hi%20Kubhexa,%20my%20inquiry%20reference%20is%20${inquiryRefNumber}%20for%20the%20${activePackage.name}%20package.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#297EE9] text-[#F9F6FF] text-xs font-semibold uppercase tracking-wider text-center hover:bg-[#1E6CD4] transition-colors"
              >
                Fast-track on WhatsApp
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 px-4 rounded-full border border-[#DAE0E5]/20 text-[#DAE0E5] text-xs font-semibold uppercase tracking-wider hover:text-[#F9F6FF] hover:border-[#DAE0E5]/40 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Inquiry Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
                <span>Kubhexa Studio Direct Intake</span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-[#F9F6FF] tracking-tight">
                Start a project.
              </h2>
              <p className="text-sm text-[#DAE0E5]/75 mt-1">
                Tell us about your brand. We typically respond within 24 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Package Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/80 mb-2">
                  Select Website Package
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {WEBSITE_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                        selectedPackage === pkg.id
                          ? 'border-[#297EE9] bg-[#297EE9]/15 text-[#F9F6FF] ring-1 ring-[#297EE9]'
                          : 'border-[#DAE0E5]/15 bg-[#050625] text-[#DAE0E5]/80 hover:border-[#DAE0E5]/30'
                      }`}
                    >
                      <div className="text-xs font-bold">{pkg.name}</div>
                      <div className="text-xs text-[#297EE9] font-mono mt-0.5">{pkg.priceFormatted}</div>
                    </button>
                  ))}
                </div>
                {errors.packageId && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.packageId}</p>
                )}
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/80 mb-1.5">
                    Your Name or Company <span className="text-[#297EE9]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sipho Dlamini"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#050625] border border-[#DAE0E5]/20 text-[#F9F6FF] placeholder-[#DAE0E5]/30 text-sm focus:outline-none focus:border-[#297EE9] focus:ring-1 focus:ring-[#297EE9]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/80 mb-1.5">
                    Work Email <span className="text-[#297EE9]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sipho@company.co.za"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#050625] border border-[#DAE0E5]/20 text-[#F9F6FF] placeholder-[#DAE0E5]/30 text-sm focus:outline-none focus:border-[#297EE9] focus:ring-1 focus:ring-[#297EE9]"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/80 mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 (0) 82 123 4567"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#050625] border border-[#DAE0E5]/20 text-[#F9F6FF] placeholder-[#DAE0E5]/30 text-sm focus:outline-none focus:border-[#297EE9] focus:ring-1 focus:ring-[#297EE9]"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/80 mb-1.5">
                  Brief Overview of Your Requirements
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share your current website link, business focus, and timeline expectations..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#050625] border border-[#DAE0E5]/20 text-[#F9F6FF] placeholder-[#DAE0E5]/30 text-sm focus:outline-none focus:border-[#297EE9] focus:ring-1 focus:ring-[#297EE9] resize-none"
                />
              </div>

              {/* Optional Project Add-ons */}
              <div className="p-4 rounded-lg bg-[#050625] border border-[#DAE0E5]/15">
                <span className="block text-xs font-mono uppercase tracking-wider text-[#DAE0E5]/60 mb-3">
                  Optional Accelerators:
                </span>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between cursor-pointer text-[#DAE0E5] hover:text-[#F9F6FF]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={expedited}
                        onChange={(e) => setExpedited(e.target.checked)}
                        className="rounded border-[#DAE0E5]/30 text-[#297EE9] focus:ring-[#297EE9]"
                      />
                      <span>Priority Express Delivery (2–3 Days)</span>
                    </div>
                    <span className="font-mono text-[#297EE9]">+R1,200</span>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-[#DAE0E5] hover:text-[#F9F6FF]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={copywriting}
                        onChange={(e) => setCopywriting(e.target.checked)}
                        className="rounded border-[#DAE0E5]/30 text-[#297EE9] focus:ring-[#297EE9]"
                      />
                      <span>Professional Conversion Copywriting</span>
                    </div>
                    <span className="font-mono text-[#297EE9]">+R1,500</span>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-[#DAE0E5] hover:text-[#F9F6FF]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={customDomainEmail}
                        onChange={(e) => setCustomDomainEmail(e.target.checked)}
                        className="rounded border-[#DAE0E5]/30 text-[#297EE9] focus:ring-[#297EE9]"
                      />
                      <span>Domain & Google Workspace Business Email Setup</span>
                    </div>
                    <span className="font-mono text-[#297EE9]">+R850</span>
                  </label>
                </div>
              </div>

              {/* Investment Summary */}
              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-[#297EE9]/10 border border-[#297EE9]/30">
                <div className="flex items-center gap-2 text-xs font-mono text-[#DAE0E5]">
                  <Clock className="w-4 h-4 text-[#297EE9]" />
                  <span>Target delivery: <strong className="text-[#F9F6FF]">{quote.deliveryDays}</strong></span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#DAE0E5]/60 font-mono">Total Investment</div>
                  <div className="text-xl font-bold text-[#297EE9] font-mono">
                    R{quote.totalPrice.toLocaleString('en-ZA')}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#297EE9] text-[#F9F6FF] text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[#1E6CD4] hover:shadow-[0_0_25px_rgba(41,126,233,0.4)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9]"
                >
                  <span>Submit Project Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#DAE0E5]/50">
                <ShieldCheck className="w-3.5 h-3.5 text-[#297EE9]" />
                <span>Zero spam guarantee. Handled directly by Kubhexa Studio founders.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
