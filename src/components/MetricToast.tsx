import { useEffect } from "react";
import { useSim } from "@/state/simStore";

/**
 * Master prompt section 11 — contextual variable updates.
 *
 * There is no permanent status rail. Changes surface only after a decision,
 * showing only the variables that moved. Timing is as published: enter 220ms,
 * hold 2200ms, exit 180ms.
 *
 * Section 17 — aria-live="polite". The one assertive announcement in the whole
 * simulation is the Page 10 crisis interruption, which is raised on that page.
 */
export function MetricToast() {
  const toast = useSim((s) => s.toast);
  const clearToast = useSim((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 2200 + 220);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="absolute right-[56px] top-[52px] z-50 w-[340px] rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[22px] shadow-[var(--shadow-panel)]"
      style={{ animation: "chimera-toast-in 220ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      <p className="label text-[var(--accent)]">{toast.cause}</p>

      <div className="mt-16 divide-y divide-[var(--line)]">
        {toast.deltas.map((d) => (
          <div key={d.label} className="flex items-center justify-between py-12">
            <span className="body text-[var(--text-muted)]">{d.label}</span>
            <span className="body font-medium text-[var(--paper)]">
              {d.before} → {d.after}
            </span>
          </div>
        ))}
      </div>

      <style>{`@keyframes chimera-toast-in{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}`}</style>
    </aside>
  );
}
