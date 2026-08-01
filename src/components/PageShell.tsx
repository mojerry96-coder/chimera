import type { ReactNode } from "react";
import { FixedStage, Box } from "@/lib/stage";
import { ProjectChimeraBrand } from "./Brand";
import { MetricToast } from "./MetricToast";
import { AudioGatePrompt } from "./AudioGatePrompt";

type PageShellProps = {
  media: ReactNode;
  children: ReactNode;
  pageNumber: string;
  showBrand?: boolean;
};

/**
 * Master prompt section 5.
 *
 * Section 1.4 — no permanent navigation, profile, notification bell, network
 * icon, initials, location, date, status footer or always-visible metrics
 * rail. The brand lockup and page marker are the only persistent chrome.
 */
export function PageShell({ media, children, pageNumber, showBrand = true }: PageShellProps) {
  return (
    <FixedStage>
      <div className="absolute inset-0 bg-[var(--bg)]">{media}</div>

      {showBrand && (
        <Box x={64} y={52} w={390} h={54} z={30}>
          <ProjectChimeraBrand />
        </Box>
      )}

      <Box x={1810} y={54} w={54} h={32} z={30}>
        <span className="label text-[var(--accent)]">{pageNumber}</span>
      </Box>

      {children}

      <MetricToast />
      <AudioGatePrompt />
    </FixedStage>
  );
}
