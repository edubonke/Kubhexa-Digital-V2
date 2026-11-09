export function KubhexaLogo({ className = 'h-7' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric K mark with tiny lime accent */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Main stem */}
        <path
          d="M6 4H13V32H6V4Z"
          fill="#297EE9"
        />
        {/* Upper diagonal arm */}
        <path
          d="M13 18L26 4H33L19 19.5L13 18Z"
          fill="#297EE9"
        />
        {/* Lower diagonal leg */}
        <path
          d="M16.5 16.5L31 32H23L13 21V16L16.5 16.5Z"
          fill="#1E5BB5"
        />
        {/* Tiny Lime Accent Apex facet */}
        <polygon
          points="26,4 33,4 30,8 24,7"
          fill="#CEF23F"
        />
      </svg>
      <span className="font-semibold text-lg tracking-tight text-[#F9F6FF] flex items-center">
        <span>KUBHEXA</span>
        <span className="ml-1.5 text-xs tracking-wider text-[#DAE0E5]/60 font-mono">DIGITAL</span>
      </span>
    </div>
  );
}
