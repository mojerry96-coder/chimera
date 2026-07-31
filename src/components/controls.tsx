import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Master prompt section 6. Focus ring comes from the global :focus-visible rule. */
export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-[64px] w-full items-center justify-between gap-24 rounded-[var(--radius-control)] bg-[var(--accent)] px-28 font-manrope text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--bg-deep)] transition-colors duration-150 hover:bg-[var(--accent-light)] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-[64px] w-full items-center justify-center gap-18 rounded-[var(--radius-control)] border border-[var(--line-strong)] bg-[var(--surface)] px-28 font-manrope text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] transition-colors duration-150 hover:bg-[var(--surface-raised)] ${className}`}
    >
      {children}
    </button>
  );
}

export function TextAction({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-[64px] items-center gap-12 font-manrope text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] transition-colors duration-150 hover:text-[var(--accent-light)] ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Section 17 — semantic states use icons and words, never colour alone.
 * `tone` only tints; the label always carries the meaning.
 */
export function Pill({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "accent";
}) {
  const tones = {
    neutral: "border-[var(--line-strong)] text-[var(--text-muted)]",
    success: "border-[var(--success)] text-[var(--success)]",
    warning: "border-[var(--warning)] text-[var(--warning)]",
    danger: "border-[var(--danger)] text-[var(--danger)]",
    accent: "border-[var(--accent)] text-[var(--accent)]"
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] border px-14 py-6 font-manrope text-[11px] font-semibold uppercase tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
