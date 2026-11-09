import { useState } from 'react';
import { ArrowUpRight, Clock, Check, Plus, RotateCcw, ArrowRight } from 'lucide-react';
import {
  WEBSITE_PACKAGES,
  PackageTier,
  CARE_PLANS,
  TEMPLATE_FAMILIES,
  TEMPLATE_CATALOG,
  ADD_ONS,
  formatZAR,
  supportsCare,
  estimateWebsite,
  packageEnquiry,
  EstimateOptions,
  PackageId
} from '../utils/pricing';

interface WebsitePackagesProps {
  onSelectPackage: (pkg: PackageTier) => void;
  onRequestEstimate?: (summary: string, budget: string) => void;
}

const inclusions = [
  { title: 'Your brand, throughout', copy: 'Your logo, colours, fonts, images and supplied copy applied to the selected template.' },
  { title: 'Made for every screen', copy: 'Responsive mobile, tablet and desktop layouts; restrained animation that respects reduced-motion preferences.' },
  { title: 'Search foundations', copy: 'Page titles, descriptions, a sitemap and social sharing information.' },
  { title: 'Checked before launch', copy: 'Navigation, forms, links, images, keyboard access and colour contrast checked against the agreed scope.' },
  { title: 'Room to refine', copy: 'Two consolidated revision rounds within the agreed scope.' },
  { title: 'A considered handover', copy: '30 days of fixes for defects in the delivered work, with access and training as included in your package.' }
];

const purchaseSteps = [
  { title: 'Choose your starting point', copy: 'Explore the interactive demos, choose a template and review the package that fits your business.' },
  { title: 'Confirm your scope', copy: 'Review the inclusions, recurring costs and final quote. A 50% deposit reserves your build slot.' },
  { title: 'Share your brand', copy: 'Submit your logo, content, images and business details through one onboarding brief.' },
  { title: 'Review and refine', copy: 'Explore your customised website and use your two included revision rounds.' },
  { title: 'Approve and launch', copy: 'Approve the finished site, pay the balance and launch, followed by your handover.' }
];

export function WebsitePackages({ onSelectPackage, onRequestEstimate }: WebsitePackagesProps) {
  // Estimator state
  const [estimateOptions, setEstimateOptions] = useState<EstimateOptions>({
    packageId: 'business',
    careId: 'none',
    familyId: '',
    templateId: '',
    extraPages: 0,
    productBatches: 0,
    copywriting: false,
    brandKit: false,
    blog: false
  });

  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState('');
  const [selectedPackageFilter, setSelectedPackageFilter] = useState('');

  const currentEstimate = estimateWebsite(estimateOptions);
  const estimateSummary = packageEnquiry(estimateOptions);

  const handleChooseFamily = (familyId: string, pkgId: PackageId) => {
    setEstimateOptions(prev => ({
      ...prev,
      familyId,
      packageId: pkgId,
      careId: supportsCare(pkgId, prev.careId) ? prev.careId : 'none',
      productBatches: pkgId === 'shop' ? prev.productBatches : 0
    }));
    document.getElementById('website-estimate')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChooseTemplate = (tId: string, pkgId: PackageId, fId: string) => {
    setEstimateOptions(prev => ({
      ...prev,
      templateId: tId,
      packageId: pkgId,
      familyId: fId,
      careId: supportsCare(pkgId, prev.careId) ? prev.careId : 'none',
      productBatches: pkgId === 'shop' ? prev.productBatches : 0
    }));
    document.getElementById('website-estimate')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredTemplates = TEMPLATE_CATALOG.filter(
    t => (!selectedFamilyFilter || t.familyId === selectedFamilyFilter) &&
         (!selectedPackageFilter || t.packageId === selectedPackageFilter)
  );

  const handleRequestEstimate = () => {
    if (onRequestEstimate) {
      onRequestEstimate(estimateSummary.summary, estimateSummary.budget);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="relative w-full bg-[#050625] py-28 md:py-36 border-t border-[#DAE0E5]/15" aria-label="Website packages">
      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-[840px] mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#297EE9] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#297EE9]" />
            <span>04 / Technical Scope & Packages</span>
          </div>
          <h2 className="section-display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6FF] mb-6">
            Your starting point.<br />
            <span className="text-[#297EE9]">Your brand.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#DAE0E5]/80 font-normal leading-relaxed max-w-[52ch]">
            A website that feels like your business. Choose a template package and we’ll customise it to your brand, content and customers. Website builds from <strong className="text-[#F9F6FF]">R2,990</strong> once-off.
          </p>
        </div>

        {/* Section Quick Jump Links */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono text-[#DAE0E5]/70 border-b border-[#DAE0E5]/15 pb-6 mb-16">
          <a href="#website-options" className="hover:text-[#297EE9] transition-colors">Compare packages</a>
          <span className="text-[#DAE0E5]/20">/</span>
          <a href="#website-industries" className="hover:text-[#297EE9] transition-colors">Industry profiles</a>
          <span className="text-[#DAE0E5]/20">/</span>
          <a href="#templates" className="hover:text-[#297EE9] transition-colors">Template collection</a>
          <span className="text-[#DAE0E5]/20">/</span>
          <a href="#website-estimate" className="hover:text-[#297EE9] transition-colors">Build your estimate</a>
          <span className="text-[#DAE0E5]/20">/</span>
          <a href="#website-care" className="hover:text-[#297EE9] transition-colors">Monthly care</a>
          <span className="text-[#DAE0E5]/20">/</span>
          <a href="#website-terms" className="hover:text-[#297EE9] transition-colors">Scope & running costs</a>
        </div>

        {/* Technical Comparison Table */}
        <div id="website-options" className="overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 mb-24 md:mb-32">
          <div className="min-w-[1040px] border border-[#DAE0E5]/15 divide-y divide-[#DAE0E5]/15 bg-[#050625]">
            {/* Table Header Row: Tier Number & Name */}
            <div className="grid grid-cols-5 divide-x divide-[#DAE0E5]/15">
              {WEBSITE_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-6 flex flex-col justify-between ${
                    pkg.recommended ? 'bg-[#050625] border-t-2 border-t-[#297EE9]' : 'bg-[#050625]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[#DAE0E5]/60 uppercase tracking-widest">
                      Tier {pkg.number}
                    </span>
                    {pkg.recommended && (
                      <span className="text-[11px] font-mono text-[#297EE9] font-medium tracking-wide">
                        Recommended
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F9F6FF] tracking-tight">
                    {pkg.name}
                  </h3>
                </div>
              ))}
            </div>

            {/* Price & Turnaround Row */}
            <div className="grid grid-cols-5 divide-x divide-[#DAE0E5]/15 bg-[#050625]">
              {WEBSITE_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#F9F6FF] tracking-tight tabular-nums mb-1">
                      {pkg.priceFormatted}
                    </div>
                    <span className="text-xs font-mono text-[#DAE0E5]/60 block mb-4">
                      {pkg.priceLabel}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#297EE9]">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{pkg.deliveryTime} turnaround</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Target Audience Row */}
            <div className="grid grid-cols-5 divide-x divide-[#DAE0E5]/15 bg-[#050625]">
              {WEBSITE_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DAE0E5]/50 block mb-2">
                    Intended Profile
                  </span>
                  <p className="text-xs sm:text-sm text-[#DAE0E5]/90 leading-relaxed font-normal">
                    {pkg.audience}
                  </p>
                </div>
              ))}
            </div>

            {/* Technical Architecture Row */}
            <div className="grid grid-cols-5 divide-x divide-[#DAE0E5]/15 bg-[#050625]">
              {WEBSITE_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DAE0E5]/50 block mb-2">
                    System Architecture
                  </span>
                  <p className="text-xs font-mono text-[#DAE0E5]/80 leading-relaxed">
                    {pkg.scope}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature Deliverables Rows */}
            <div className="grid grid-cols-5 divide-x divide-[#DAE0E5]/15 bg-[#050625]">
              {WEBSITE_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#DAE0E5]/50 block mb-3">
                      Included Scope
                    </span>
                    <ul className="space-y-3 text-xs text-[#DAE0E5]">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#297EE9] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="grid grid-cols-5 divide-x divide-[#DAE0E5]/15 bg-[#050625]">
              {WEBSITE_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-6">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#297EE9] ${
                      pkg.recommended
                        ? 'bg-[#297EE9] text-[#F9F6FF] hover:bg-[#1E6CD4] shadow-[0_0_20px_rgba(41,126,233,0.3)]'
                        : 'border border-[#DAE0E5]/20 text-[#DAE0E5] hover:border-[#297EE9] hover:text-[#297EE9]'
                    }`}
                  >
                    <span>Select Tier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs font-mono text-[#DAE0E5]/60 mt-4">
            Prices in ZAR for the stated scope. Hosting, domains and external subscriptions are separate unless selected. VAT is added only if applicable. Delivery starts after complete content, access and deposit.
          </p>
        </div>

        {/* Built Around Your Business / Industry Profiles */}
        <div id="website-industries" className="border-t border-[#DAE0E5]/15 pt-20 mb-24 md:mb-32">
          <div className="max-w-[720px] mb-12">
            <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
              Find your fit
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F9F6FF] tracking-tight mb-4">
              Built around your business.
            </h3>
            <p className="text-sm sm:text-base text-[#DAE0E5]/80">
              Choose a business type for a suggested package, then explore the interactive templates below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATE_FAMILIES.map((family) => {
              const matchedPkg = WEBSITE_PACKAGES.find(p => p.id === family.packageId);
              const isSelected = estimateOptions.familyId === family.id;

              return (
                <button
                  key={family.id}
                  type="button"
                  onClick={() => handleChooseFamily(family.id, family.packageId)}
                  className={`p-6 text-left border rounded transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#297EE9] bg-[#297EE9]/10'
                      : 'border-[#DAE0E5]/15 bg-[#050625] hover:border-[#297EE9]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-base font-bold text-[#F9F6FF]">{family.name}</strong>
                    <span className="text-xs font-mono text-[#297EE9]">
                      {matchedPkg?.name} ({matchedPkg?.priceFormatted})
                    </span>
                  </div>
                  <p className="text-xs text-[#DAE0E5]/70 leading-relaxed font-sans">{family.examples}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Catalog */}
        <div id="templates" className="border-t border-[#DAE0E5]/15 pt-20 mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
                Explore before you choose
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#F9F6FF] tracking-tight">
                See it. Try it. <span className="text-[#297EE9]">Make it yours.</span>
              </h3>
              <p className="text-sm sm:text-base text-[#DAE0E5]/80 mt-2 max-w-[50ch]">
                Six original website templates, ready to explore. Scroll the pages, try the interactions, and see the layout on different screens.
              </p>
            </div>

            {/* Filter selectors */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedFamilyFilter}
                onChange={e => setSelectedFamilyFilter(e.target.value)}
                className="bg-[#050625] border border-[#DAE0E5]/20 text-xs font-mono text-[#DAE0E5] px-3 py-2 rounded focus:outline-none focus:border-[#297EE9]"
              >
                <option value="">All business types</option>
                {TEMPLATE_FAMILIES.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>

              <select
                value={selectedPackageFilter}
                onChange={e => setSelectedPackageFilter(e.target.value)}
                className="bg-[#050625] border border-[#DAE0E5]/20 text-xs font-mono text-[#DAE0E5] px-3 py-2 rounded focus:outline-none focus:border-[#297EE9]"
              >
                <option value="">All packages</option>
                {WEBSITE_PACKAGES.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.priceFormatted})</option>
                ))}
              </select>

              {(selectedFamilyFilter || selectedPackageFilter) && (
                <button
                  type="button"
                  onClick={() => { setSelectedFamilyFilter(''); setSelectedPackageFilter(''); }}
                  className="text-xs font-mono text-[#297EE9] flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* 6 Template Cards in DeepBook minimal frame */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const matchedPkg = WEBSITE_PACKAGES.find(p => p.id === template.packageId);
              const isSelected = estimateOptions.templateId === template.id;

              return (
                <div
                  key={template.id}
                  className={`border rounded-lg p-6 flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-[#297EE9] bg-[#297EE9]/10'
                      : 'border-[#DAE0E5]/15 bg-[#050625] hover:border-[#297EE9]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#DAE0E5]/60 mb-2">
                      <span className="text-[#297EE9] uppercase">{template.category}</span>
                      <span>{matchedPkg?.name} · {matchedPkg?.priceFormatted}</span>
                    </div>

                    <h4 className="text-xl font-bold text-[#F9F6FF] mb-1">{template.name}</h4>
                    <p className="text-xs font-mono text-[#DAE0E5]/50 mb-4">{template.brand}</p>
                    <p className="text-xs text-[#DAE0E5]/80 leading-relaxed mb-4">{template.description}</p>

                    <div className="border-t border-[#DAE0E5]/10 pt-3 mb-6">
                      <span className="text-[10px] font-mono text-[#DAE0E5]/50 uppercase tracking-widest block mb-2">
                        Sample Interactions
                      </span>
                      <ul className="space-y-1.5 text-xs font-mono text-[#DAE0E5]/80">
                        {template.interactions.map((interaction, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-2">
                            <span className="text-[#297EE9] text-[10px]">▪</span>
                            <span>{interaction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleChooseTemplate(template.id, template.packageId, template.familyId)}
                    className="w-full py-2.5 px-3 border border-[#297EE9]/40 hover:border-[#297EE9] hover:bg-[#297EE9]/15 text-[#297EE9] hover:text-[#F9F6FF] text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer rounded"
                  >
                    <span>Use this template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Estimator */}
        <div id="website-estimate" className="border-t border-[#DAE0E5]/15 pt-20 mb-24 md:mb-32">
          <div className="max-w-[720px] mb-12">
            <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
              Make it yours
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F9F6FF] tracking-tight mb-4">
              Build your estimate.
            </h3>
            <p className="text-sm sm:text-base text-[#DAE0E5]/80 leading-relaxed">
              Choose your starting point and the extras you need. Review the scope with us before paying a deposit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Controls: 7 cols */}
            <div className="lg:col-span-7 space-y-6">
              {/* Package selector */}
              <div>
                <label className="text-xs font-mono text-[#DAE0E5]/70 uppercase tracking-wider block mb-2">
                  Website Package
                </label>
                <select
                  value={estimateOptions.packageId}
                  onChange={e => {
                    const nextPkg = e.target.value as PackageId;
                    setEstimateOptions(prev => ({
                      ...prev,
                      packageId: nextPkg,
                      careId: supportsCare(nextPkg, prev.careId) ? prev.careId : 'none',
                      productBatches: nextPkg === 'shop' ? prev.productBatches : 0
                    }));
                  }}
                  className="w-full bg-[#03041a] border border-[#DAE0E5]/20 text-sm font-mono text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]"
                >
                  {WEBSITE_PACKAGES.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — {pkg.priceFormatted} once-off ({pkg.deliveryTime})
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Care */}
              <div>
                <label className="text-xs font-mono text-[#DAE0E5]/70 uppercase tracking-wider block mb-2">
                  Monthly Care (Optional)
                </label>
                <select
                  value={estimateOptions.careId}
                  onChange={e => setEstimateOptions(prev => ({ ...prev, careId: e.target.value as EstimateOptions['careId'] }))}
                  className="w-full bg-[#03041a] border border-[#DAE0E5]/20 text-sm font-mono text-[#F9F6FF] p-3 rounded focus:outline-none focus:border-[#297EE9]"
                >
                  <option value="none">No care plan — arrange hosting separately</option>
                  {CARE_PLANS.filter(c => c.packages.includes(estimateOptions.packageId)).map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — {plan.priceFormatted}/month ({plan.for})
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Extras */}
              <div className="border border-[#DAE0E5]/15 bg-[#03041a] p-6 rounded-lg space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#297EE9] block">
                  Optional Scope Extras
                </span>

                {/* Additional pages */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-[#DAE0E5]/10">
                  <div>
                    <strong className="text-sm text-[#F9F6FF] block">Additional pages</strong>
                    <span className="text-xs font-mono text-[#DAE0E5]/60">R750 each · existing layout</span>
                  </div>
                  <select
                    value={estimateOptions.extraPages ?? 0}
                    onChange={e => setEstimateOptions(prev => ({ ...prev, extraPages: Number(e.target.value) }))}
                    className="bg-[#050625] border border-[#DAE0E5]/20 text-xs font-mono text-[#F9F6FF] px-3 py-1.5 rounded focus:outline-none focus:border-[#297EE9]"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'page' : 'pages'}</option>
                    ))}
                  </select>
                </div>

                {/* Product Batches (if shop) */}
                {estimateOptions.packageId === 'shop' && (
                  <div className="flex items-center justify-between gap-4 py-2 border-b border-[#DAE0E5]/10">
                    <div>
                      <strong className="text-sm text-[#F9F6FF] block">Extra product batches</strong>
                      <span className="text-xs font-mono text-[#DAE0E5]/60">10 simple products · R750 per batch</span>
                    </div>
                    <select
                      value={estimateOptions.productBatches ?? 0}
                      onChange={e => setEstimateOptions(prev => ({ ...prev, productBatches: Number(e.target.value) }))}
                      className="bg-[#050625] border border-[#DAE0E5]/20 text-xs font-mono text-[#F9F6FF] px-3 py-1.5 rounded focus:outline-none focus:border-[#297EE9]"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'batch' : 'batches'}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Copywriting */}
                <label className="flex items-start gap-3 py-2 cursor-pointer border-b border-[#DAE0E5]/10">
                  <input
                    type="checkbox"
                    checked={Boolean(estimateOptions.copywriting)}
                    onChange={e => setEstimateOptions(prev => ({ ...prev, copywriting: e.target.checked }))}
                    className="mt-1 accent-[#297EE9]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-[#F9F6FF]">Website copywriting</strong>
                      <span className="text-xs font-mono text-[#297EE9]">+R2,000</span>
                    </div>
                    <span className="text-xs text-[#DAE0E5]/60 block font-sans">
                      Up to 5 pages, maximum 400 words per page
                    </span>
                  </div>
                </label>

                {/* Starter logo kit */}
                <label className="flex items-start gap-3 py-2 cursor-pointer border-b border-[#DAE0E5]/10">
                  <input
                    type="checkbox"
                    checked={Boolean(estimateOptions.brandKit)}
                    onChange={e => setEstimateOptions(prev => ({ ...prev, brandKit: e.target.checked }))}
                    className="mt-1 accent-[#297EE9]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-[#F9F6FF]">Starter logo kit</strong>
                      <span className="text-xs font-mono text-[#297EE9]">+R2,500</span>
                    </div>
                    <span className="text-xs text-[#DAE0E5]/60 block font-sans">
                      2 concepts, 2 revision rounds, final logo files and colour palette
                    </span>
                  </div>
                </label>

                {/* Blog setup */}
                <label className="flex items-start gap-3 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(estimateOptions.blog)}
                    onChange={e => setEstimateOptions(prev => ({ ...prev, blog: e.target.checked }))}
                    className="mt-1 accent-[#297EE9]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-[#F9F6FF]">Blog setup</strong>
                      <span className="text-xs font-mono text-[#297EE9]">+R1,500</span>
                    </div>
                    <span className="text-xs text-[#DAE0E5]/60 block font-sans">
                      Includes formatting and publishing 1 supplied article
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Right Summary: 5 cols */}
            <div className="lg:col-span-5 border border-[#DAE0E5]/15 bg-[#03041a] p-6 sm:p-8 rounded-lg shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#DAE0E5]/15 pb-4">
                <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Estimated Total</span>
                </span>
                <span className="text-xs font-mono text-[#DAE0E5]/60">Fixed Scope</span>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[#F9F6FF] mb-1">
                  Kubhexa {currentEstimate.plan.name}
                </h4>
                {currentEstimate.template && (
                  <p className="text-xs font-mono text-[#297EE9]">Template: {currentEstimate.template.name}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 font-mono text-xs border-y border-[#DAE0E5]/10 py-4">
                <div className="flex justify-between">
                  <span className="text-[#DAE0E5]/70">Website build</span>
                  <span className="text-[#F9F6FF] font-bold">{formatZAR(currentEstimate.plan.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#DAE0E5]/70">Selected extras</span>
                  <span className="text-[#F9F6FF] font-bold">{formatZAR(currentEstimate.addOnTotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#DAE0E5]/10 text-sm">
                  <span className="text-[#F9F6FF] font-bold">Once-off estimate</span>
                  <span className="text-[#297EE9] font-bold">{formatZAR(currentEstimate.onceOff)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#DAE0E5]/70">Optional monthly care</span>
                  <span className="text-[#F9F6FF]">{currentEstimate.care ? `${formatZAR(currentEstimate.monthly)}/mo` : 'None'}</span>
                </div>
                <div className="flex justify-between pt-1 text-[11px] text-[#DAE0E5]/60">
                  <span>First-year Kubhexa fees</span>
                  <span>{formatZAR(currentEstimate.firstYearFees)}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#DAE0E5]/60 leading-relaxed font-sans">
                Build + extras + 12 months of selected care. Domains, external subscriptions and VAT if applicable are additional. Scope and final quote confirmed before deposit.
              </div>

              <button
                type="button"
                onClick={handleRequestEstimate}
                className="w-full py-4 bg-[#297EE9] text-[#F9F6FF] text-xs font-semibold tracking-wider uppercase transition-all hover:bg-[#1E6CD4] shadow-[0_0_25px_rgba(41,126,233,0.4)] flex items-center justify-center gap-2 cursor-pointer rounded"
              >
                <span>Request this estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Inclusions & Care Plans */}
        <div id="website-care" className="border-t border-[#DAE0E5]/15 pt-20 mb-24 md:mb-32">
          {/* Inclusions */}
          <div className="mb-20">
            <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
              Standard Craftsmanship
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F9F6FF] tracking-tight mb-8">
              Included in every website.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inclusions.map(inc => (
                <div key={inc.title} className="p-6 border border-[#DAE0E5]/15 bg-[#050625] rounded">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="w-4 h-4 text-[#297EE9]" />
                    <h4 className="text-base font-bold text-[#F9F6FF]">{inc.title}</h4>
                  </div>
                  <p className="text-xs text-[#DAE0E5]/80 leading-relaxed font-sans">{inc.copy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Care Plans */}
          <div>
            <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
              After Launch
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F9F6FF] tracking-tight mb-8">
              A little ongoing care.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CARE_PLANS.map(plan => (
                <div key={plan.id} className="p-6 border border-[#DAE0E5]/15 bg-[#050625] rounded flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#DAE0E5]/50 block mb-1">{plan.for}</span>
                    <h4 className="text-xl font-bold text-[#F9F6FF] mb-2">{plan.name}</h4>
                    <div className="text-2xl font-bold text-[#297EE9] font-mono mb-4">
                      {plan.priceFormatted}<span className="text-xs text-[#DAE0E5]/60 font-normal"> /month</span>
                    </div>
                    <ul className="space-y-2 text-xs font-mono text-[#DAE0E5]/80 mb-6">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#297EE9] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-[10px] text-[#DAE0E5]/50 font-sans">
                    Month to month with 30 days’ notice. Routine backups and technical maintenance.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scope, Ownership & Running Costs */}
        <div id="website-terms" className="border-t border-[#DAE0E5]/15 pt-20">
          <span className="text-xs font-mono text-[#297EE9] uppercase tracking-widest block mb-2">
            Transparency
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F9F6FF] tracking-tight mb-8">
            Understand the running costs.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 border border-[#DAE0E5]/15 bg-[#050625] rounded">
              <h4 className="text-base font-bold text-[#F9F6FF] mb-2">Domain registration</h4>
              <p className="text-xs text-[#DAE0E5]/80 leading-relaxed font-sans mb-3">
                Billed annually in your name. As a reference, xneelo lists .co.za registration and renewal at R110/year, VAT inclusive.
              </p>
              <span className="text-xs font-mono text-[#297EE9]">~R110 / year</span>
            </div>

            <div className="p-6 border border-[#DAE0E5]/15 bg-[#050625] rounded">
              <h4 className="text-base font-bold text-[#F9F6FF] mb-2">Payment processing</h4>
              <p className="text-xs text-[#DAE0E5]/80 leading-relaxed font-sans mb-3">
                Merchant fees are separate from the build. PayFast’s listed card rate is 3.2% + R2 per transaction, excluding VAT.
              </p>
              <span className="text-xs font-mono text-[#297EE9]">PayFast 3.2% + R2</span>
            </div>

            <div className="p-6 border border-[#DAE0E5]/15 bg-[#050625] rounded">
              <h4 className="text-base font-bold text-[#F9F6FF] mb-2">First-year example</h4>
              <p className="text-xs text-[#DAE0E5]/80 leading-relaxed font-sans mb-3">
                Business build R5,990 + Essential Care R349 × 12 + R110 domain = <strong className="text-[#F9F6FF]">R10,288</strong>.
              </p>
              <span className="text-xs font-mono text-[#297EE9]">Total estimated: R10,288</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
