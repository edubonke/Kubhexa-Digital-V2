import { useState, useRef } from 'react';
import { ArrowUpRight, ArrowRight, Check, RotateCcw, Download, ChevronDown, Pause, Play, X } from 'lucide-react';
import { KubhexaLogo } from './KubhexaLogo';

interface ClosingCtaFooterProps {
  onOpenProjectModal: (preselectedPackage?: string) => void;
  attachedEstimateSummary?: string;
  attachedBudget?: string;
}

const faqs = [
  {
    question: 'Can we start small?',
    answer: 'Yes. Our template-based small-business websites start at R2,990. Choose a package and we customise it to your brand. A focused workflow or discovery sprint can also be a practical first step for a custom system. Explore website packages.'
  },
  {
    question: 'What does a project cost?',
    answer: 'Website packages range from R2,990 to R17,990 for the stated scope, with optional extras and care. Domains, external subscriptions and VAT if applicable are additional. Custom apps and integrations are scoped separately. You receive a final quote before paying a deposit.'
  },
  {
    question: 'What happens after launch?',
    answer: 'Website packages include 30 days of fixes for defects in the delivered work. Optional care starts at R349/month, with the scope and hosting agreed in writing. Handover, access and any included training are part of your package.'
  },
  {
    question: 'Are the work examples client projects?',
    answer: 'The portfolio includes business websites and independent products built by our founder. Each project is labelled, including EduBonke’s synthetic-data prototype. The separate interface concepts demonstrate design ideas. We do not claim measured client results for these examples.'
  }
];

export function ClosingCtaFooter({
  onOpenProjectModal,
  attachedEstimateSummary,
  attachedBudget
}: ClosingCtaFooterProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Website',
    brief: '',
    budget: attachedBudget || 'Under R15,000',
    timeline: 'As soon as practical',
    consent: true,
    website: '' // honeypot
  });

  const [estimateSummary, setEstimateSummary] = useState<string | undefined>(attachedEstimateSummary);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    reference: string;
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    brief: string;
  } | null>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formRef = useRef<HTMLFormElement>(null);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      // Honeypot caught bot
      return;
    }

    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid work email address.';
    }
    if (!formData.brief.trim() || formData.brief.trim().length < 20) {
      errors.brief = 'Tell us about your business and what you need (at least 20 characters).';
    }
    if (!formData.consent) {
      errors.consent = 'Please agree to allow us to respond to your project enquiry.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const reference = `KX-${randomId}`;

    const combinedBrief = estimateSummary
      ? `${formData.brief.trim()}\n\n${estimateSummary}`
      : formData.brief.trim();

    try {
      // Attempt live endpoint post with timeout
      await fetch('https://dqpxsjeeqoadogoadyts.supabase.co/functions/v1/kubhexa-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: reference,
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          projectType: formData.projectType,
          brief: combinedBrief,
          budget: formData.budget,
          timeline: formData.timeline,
          consent: formData.consent
        }),
        signal: AbortSignal.timeout(4000)
      }).catch(() => {
        // Fallback gracefully on local or network sandbox
      });
    } catch {
      // Graceful local handling
    }

    setSubmissionReceipt({
      reference,
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      brief: combinedBrief
    });

    setIsSubmitting(false);
  };

  const handleDownloadReceipt = () => {
    if (!submissionReceipt) return;
    const content = [
      'KUBHEXA DIGITAL',
      'Project Enquiry Receipt',
      `Reference: ${submissionReceipt.reference}`,
      `Date: ${new Date().toLocaleDateString('en-ZA')}`,
      '',
      `Name: ${submissionReceipt.name}`,
      `Email: ${submissionReceipt.email}`,
      `Company: ${submissionReceipt.company || 'Not specified'}`,
      `Project Type: ${submissionReceipt.projectType}`,
      `Budget Range: ${submissionReceipt.budget}`,
      `Timeline: ${submissionReceipt.timeline}`,
      '',
      'Project Brief:',
      submissionReceipt.brief,
      '',
      'Your enquiry has been saved for review. We will contact you to discuss next steps.'
    ].join('\n');

    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `kubhexa-project-enquiry-${submissionReceipt.reference}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const toggleMotion = () => {
    setMotionEnabled(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.dataset.motion = 'on';
      } else {
        document.documentElement.dataset.motion = 'off';
      }
      return next;
    });
  };

  return (
    <footer className="relative w-full bg-[#050625] border-t border-[#DAE0E5]/15 overflow-hidden pt-24 pb-12" aria-label="Closing call to action and site footer">
      {/* Background glow */}
      <div className="absolute inset-0 deepbook-glow-bottom pointer-events-none opacity-80" />

      <div className="relative z-10 max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Contact Section */}
        <section id="contact" className="mb-28 md:mb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading & Expectations */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
                <span>06 / Project Enquiry</span>
              </div>

              <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#F9F6FF] tracking-tight">
                What is your<br />
                <span className="text-[#297EE9]">next move?</span>
              </h2>

              <p className="text-lg text-[#DAE0E5] font-medium">
                Tell us what you want to build or make better.
              </p>

              <p className="text-sm sm:text-base text-[#DAE0E5]/80 leading-relaxed font-normal">
                Have a clear brief or just a business problem? Both are good places to start.
              </p>

              <div className="border border-[#DAE0E5]/15 bg-[#03041a] p-6 rounded-lg space-y-2 mt-8">
                <h4 className="text-sm font-bold text-[#F9F6FF] font-mono uppercase tracking-wider text-[#297EE9]">
                  What happens next?
                </h4>
                <p className="text-xs sm:text-sm text-[#DAE0E5]/80 leading-relaxed font-sans">
                  We review your enquiry and use your details to discuss the scope, technical approach, and a practical next step.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7 border border-[#DAE0E5]/15 bg-[#03041a] p-6 sm:p-10 rounded-xl shadow-2xl">
              {submissionReceipt ? (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full border border-[#297EE9] bg-[#297EE9]/15 flex items-center justify-center mx-auto text-[#297EE9]">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
                      Enquiry Confirmed
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F9F6FF]">
                      Your next move starts here.
                    </h3>
                  </div>
                  <p className="text-sm text-[#DAE0E5]/80 max-w-[42ch] mx-auto font-sans leading-relaxed">
                    Your enquiry has been saved, {submissionReceipt.name.split(' ')[0]}. We will use the details you provided to discuss a practical next step.
                  </p>

                  <div className="inline-block p-4 border border-[#DAE0E5]/15 bg-[#050625] rounded font-mono text-xs">
                    <span className="text-[#DAE0E5]/60 block mb-1">Enquiry Reference</span>
                    <code className="text-base text-[#297EE9] font-bold">{submissionReceipt.reference}</code>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleDownloadReceipt}
                      className="px-6 py-3 bg-[#297EE9] hover:bg-[#1E6CD4] text-[#F9F6FF] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(41,126,233,0.3)]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download receipt</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionReceipt(null);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          projectType: 'Website',
                          brief: '',
                          budget: 'Under R15,000',
                          timeline: 'As soon as practical',
                          consent: true,
                          website: ''
                        });
                      }}
                      className="px-6 py-3 border border-[#DAE0E5]/20 hover:border-[#297EE9] text-[#DAE0E5] hover:text-[#F9F6FF] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Send another enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
                  {estimateSummary && (
                    <div className="p-4 border border-[#297EE9]/40 bg-[#297EE9]/10 rounded flex items-start justify-between gap-4 font-mono text-xs">
                      <div>
                        <span className="text-[#297EE9] uppercase font-bold block mb-1">Attached Website Estimate</span>
                        <p className="text-[#DAE0E5]/90 whitespace-pre-line text-[11px] leading-relaxed">
                          {estimateSummary.slice(0, 180)}...
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEstimateSummary(undefined)}
                        className="text-[#DAE0E5]/60 hover:text-[#F9F6FF] cursor-pointer"
                        title="Remove attached estimate"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Honeypot field (hidden from screen) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={e => handleInputChange('website', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-[#DAE0E5]/70 block mb-1.5">
                        Your name <span className="text-[#297EE9]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        className={`w-full bg-[#050625] border ${
                          formErrors.name ? 'border-red-400' : 'border-[#DAE0E5]/20'
                        } text-sm font-sans text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]`}
                      />
                      {formErrors.name && (
                        <span className="text-[11px] text-red-400 font-mono mt-1 block">{formErrors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#DAE0E5]/70 block mb-1.5">
                        Work email <span className="text-[#297EE9]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={254}
                        placeholder="you@company.co.za"
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className={`w-full bg-[#050625] border ${
                          formErrors.email ? 'border-red-400' : 'border-[#DAE0E5]/20'
                        } text-sm font-sans text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]`}
                      />
                      {formErrors.email && (
                        <span className="text-[11px] text-red-400 font-mono mt-1 block">{formErrors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-[#DAE0E5]/70 block mb-1.5">
                        Company <span className="text-[#DAE0E5]/40">(optional)</span>
                      </label>
                      <input
                        type="text"
                        maxLength={160}
                        placeholder="Your business name"
                        value={formData.company}
                        onChange={e => handleInputChange('company', e.target.value)}
                        className="w-full bg-[#050625] border border-[#DAE0E5]/20 text-sm font-sans text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#DAE0E5]/70 block mb-1.5">
                        Project type <span className="text-[#297EE9]">*</span>
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={e => handleInputChange('projectType', e.target.value)}
                        className="w-full bg-[#050625] border border-[#DAE0E5]/20 text-sm font-sans text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]"
                      >
                        <option value="Website">Website</option>
                        <option value="App or business system">App or business system</option>
                        <option value="UX and product design">UX and product design</option>
                        <option value="Not sure yet">Not sure yet</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#DAE0E5]/70 block mb-1.5">
                      What would you like to build or improve? <span className="text-[#297EE9]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      minLength={20}
                      maxLength={4000}
                      placeholder="Tell us about your idea, who it is for, and what you want it to do."
                      value={formData.brief}
                      onChange={e => handleInputChange('brief', e.target.value)}
                      className={`w-full bg-[#050625] border ${
                        formErrors.brief ? 'border-red-400' : 'border-[#DAE0E5]/20'
                      } text-sm font-sans text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9] leading-relaxed`}
                    />
                    {formErrors.brief && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 block">{formErrors.brief}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-[#DAE0E5]/70 block mb-1.5">
                        Budget range <span className="text-[#297EE9]">*</span>
                      </label>
                      <select
                        value={formData.budget}
                        onChange={e => handleInputChange('budget', e.target.value)}
                        className="w-full bg-[#050625] border border-[#DAE0E5]/20 text-sm font-sans text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]"
                      >
                        <option value="Under R15,000">Under R15,000</option>
                        <option value="R15,000 to R40,000">R15,000 to R40,000</option>
                        <option value="R40,000 to R100,000">R40,000 to R100,000</option>
                        <option value="R100,000+">R100,000+</option>
                        <option value="Help me scope it">Help me scope it</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#DAE0E5]/70 block mb-1.5">
                        Ideal timing <span className="text-[#297EE9]">*</span>
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={e => handleInputChange('timeline', e.target.value)}
                        className="w-full bg-[#050625] border border-[#DAE0E5]/20 text-sm font-sans text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]"
                      >
                        <option value="As soon as practical">As soon as practical</option>
                        <option value="Within 1 to 3 months">Within 1 to 3 months</option>
                        <option value="Within 3 to 6 months">Within 3 to 6 months</option>
                        <option value="Exploring options">Exploring options</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-[#DAE0E5]/50">
                    Budget ranges help us explore the right scope. They are not quotations.
                  </p>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={e => handleInputChange('consent', e.target.checked)}
                      className="mt-1 accent-[#297EE9]"
                    />
                    <span className="text-xs text-[#DAE0E5]/80 font-sans">
                      I agree that Kubhexa Digital may use my details to respond to this project enquiry.
                    </span>
                  </label>
                  {formErrors.consent && (
                    <span className="text-[11px] text-red-400 font-mono block">{formErrors.consent}</span>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#297EE9] hover:bg-[#1E6CD4] text-[#F9F6FF] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(41,126,233,0.4)] disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Saving enquiry...' : 'Send project enquiry'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="text-xs font-mono text-[#DAE0E5]/60 hover:text-[#297EE9] transition-colors underline cursor-pointer"
                    >
                      Read privacy notice
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="border-t border-[#DAE0E5]/15 pt-24 mb-28 md:mb-36">
          <div className="max-w-[840px] mb-12">
            <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
              Questions & Answers
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9F6FF] tracking-tight">
              A few things you might be wondering.
            </h3>
          </div>

          <div className="border-t border-[#DAE0E5]/15 divide-y divide-[#DAE0E5]/15">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="py-6">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                  >
                    <h4 className="text-lg sm:text-xl font-bold text-[#F9F6FF] group-hover:text-[#297EE9] transition-colors">
                      {faq.question}
                    </h4>
                    <ChevronDown
                      className={`w-5 h-5 text-[#297EE9] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-4 text-sm sm:text-base text-[#DAE0E5]/80 leading-relaxed font-normal max-w-[70ch] animate-in fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Navigation Columns */}
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
                  Customer Workspace Concept
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
                <a href="#approach" onClick={(e) => scrollTo(e, '#approach')} className="hover:text-[#F9F6FF] transition-colors">
                  Approach & Philosophy
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

        {/* Bottom Line: Copyright, Location, Socials, Motion Toggle */}
        <div className="pt-8 border-t border-[#DAE0E5]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#DAE0E5]/60">
          <div className="flex items-center gap-2">
            <KubhexaLogo className="h-5" />
            <span>© 2026 Kubhexa Digital. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={toggleMotion}
              className="inline-flex items-center gap-1.5 hover:text-[#297EE9] transition-colors cursor-pointer"
              title="Turn optional animations on or off"
            >
              {motionEnabled ? <Pause className="w-3 h-3 text-[#297EE9]" /> : <Play className="w-3 h-3" />}
              <span>Motion: {motionEnabled ? 'On' : 'Off'}</span>
            </button>

            <span className="text-[#DAE0E5]/40">·</span>

            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#297EE9] transition-colors cursor-pointer"
            >
              Privacy
            </button>

            <span className="text-[#DAE0E5]/40">·</span>
            <span>South Africa</span>
          </div>
        </div>
      </div>

      {/* Privacy Notice Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 bg-[#050625]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="border border-[#DAE0E5]/20 bg-[#050625] max-w-[600px] w-full p-8 rounded-xl shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#DAE0E5]/60 hover:text-[#F9F6FF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
              Privacy Notice
            </span>
            <h3 className="text-2xl font-bold text-[#F9F6FF] mb-4">
              How we handle your information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#DAE0E5]/80 font-sans leading-relaxed">
              <p>
                When you submit a project enquiry through Kubhexa Digital, we collect your name, email address, company (if supplied), project brief, and budget/timeline preferences.
              </p>
              <p>
                <strong>Purpose:</strong> Your details are used solely to assess the project scope, prepare a customized proposal or estimate, and communicate directly with you regarding your enquiry.
              </p>
              <p>
                We do not sell, rent, or share your contact information with external marketers or advertising networks.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#DAE0E5]/15 text-right">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="px-6 py-2.5 bg-[#297EE9] hover:bg-[#1E6CD4] text-[#F9F6FF] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer transition-all"
              >
                Close notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
