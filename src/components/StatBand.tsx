export function StatBand() {
  const stats = [
    {
      value: 'R2,990',
      label: 'Websites from',
      sub: 'Transparent small-business launch pricing',
      // Geometric SVG: concentric precision circles & focal crosshair
      diagram: (
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full opacity-20">
          <circle cx="80" cy="80" r="70" stroke="#297EE9" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="80" cy="80" r="45" stroke="#DAE0E5" strokeWidth="1" />
          <circle cx="80" cy="80" r="20" stroke="#297EE9" strokeWidth="1" />
          <line x1="80" y1="0" x2="80" y2="160" stroke="#DAE0E5" strokeWidth="0.75" />
          <line x1="0" y1="80" x2="160" y2="80" stroke="#DAE0E5" strokeWidth="0.75" />
          <rect x="76" y="76" width="8" height="8" fill="#297EE9" />
        </svg>
      )
    },
    {
      value: '5',
      label: 'Website packages',
      sub: 'From lean Start to full custom Shop',
      // Geometric SVG: stepped isometric layers
      diagram: (
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full opacity-20">
          <polygon points="80,20 140,55 80,90 20,55" stroke="#297EE9" strokeWidth="1" />
          <polygon points="80,50 140,85 80,120 20,85" stroke="#DAE0E5" strokeWidth="1" strokeDasharray="4 2" />
          <polygon points="80,80 140,115 80,150 20,115" stroke="#297EE9" strokeWidth="1" />
          <line x1="80" y1="20" x2="80" y2="150" stroke="#DAE0E5" strokeWidth="0.75" />
        </svg>
      )
    },
    {
      value: '3–5 days',
      label: 'Start package delivery',
      sub: 'Rapid agile turnaround to live production',
      // Geometric SVG: vector timeline & calibrated tick intervals
      diagram: (
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full opacity-20">
          <line x1="20" y1="80" x2="140" y2="80" stroke="#297EE9" strokeWidth="1.5" />
          <circle cx="35" cy="80" r="5" fill="#297EE9" />
          <circle cx="70" cy="80" r="5" stroke="#DAE0E5" strokeWidth="1.5" />
          <circle cx="105" cy="80" r="5" stroke="#DAE0E5" strokeWidth="1.5" />
          <circle cx="135" cy="80" r="6" fill="#CEF23F" />
          <path d="M20 50 L80 20 L140 50" stroke="#DAE0E5" strokeWidth="0.75" strokeDasharray="2 2" />
          <path d="M20 110 L80 140 L140 110" stroke="#DAE0E5" strokeWidth="0.75" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      value: '3',
      label: 'Selected projects',
      sub: 'Featured digital platforms & client systems',
      // Geometric SVG: tri-coordinate triangular nodes
      diagram: (
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full opacity-20">
          <polygon points="80,25 135,130 25,130" stroke="#297EE9" strokeWidth="1" />
          <circle cx="80" cy="25" r="5" fill="#297EE9" />
          <circle cx="135" cy="130" r="5" fill="#297EE9" />
          <circle cx="25" cy="130" r="5" fill="#297EE9" />
          <circle cx="80" cy="95" r="24" stroke="#DAE0E5" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      )
    }
  ];

  return (
    <section
      className="relative w-full bg-[#050625] border-y border-[#DAE0E5]/15 py-12 md:py-16 select-none"
      aria-label="Studio proof and metrics"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between p-6 sm:p-8 rounded-lg border border-[#DAE0E5]/10 bg-[#050625]/60 overflow-hidden group hover:border-[#297EE9]/40 transition-colors duration-300"
            >
              {/* Technical background diagram */}
              <div className="absolute right-[-10%] top-[-10%] w-36 h-36 md:w-44 md:h-44 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40">
                {stat.diagram}
              </div>

              {/* Stat number */}
              <div className="relative z-10 font-bold text-4xl sm:text-5xl md:text-6xl text-[#297EE9] tracking-tight mb-4 tabular-nums">
                {stat.value}
              </div>

              {/* Label & Description */}
              <div className="relative z-10 flex flex-col">
                <span className="text-base sm:text-lg font-semibold text-[#F9F6FF] mb-1">
                  {stat.label}
                </span>
                <span className="text-xs text-[#DAE0E5]/70 font-mono">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
