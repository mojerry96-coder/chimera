/**
 * Brand lockup — master prompt section 5.
 *
 * PLACEHOLDER MARK. The 20 reference mockups show four different marks across
 * pages: a lion, a gryphon, a hexagon and a compass. No single mark is
 * specified in either source document, so this is a neutral geometric stand-in
 * that respects the palette and weight. Swap `ProjectChimeraMark` once the
 * real lockup is chosen; nothing else needs to change.
 */
export function ProjectChimeraMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 42 42" fill="none" className={className} aria-hidden="true">
      <path
        d="M21 3.5 36.4 12v17L21 37.5 5.6 29V12L21 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M21 13.5 28.7 18v9L21 31.5 13.3 27v-9L21 13.5Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function ProjectChimeraBrand() {
  return (
    <div className="flex items-center gap-16">
      <ProjectChimeraMark className="h-[42px] w-[42px] text-[var(--accent)]" />
      <div>
        <div className="font-manrope text-[18px] font-semibold uppercase tracking-[0.16em] text-[var(--paper)]">
          Project Chimera
        </div>
        <div className="mt-6 font-manrope text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
          Serious Simulation Platform
        </div>
      </div>
    </div>
  );
}
