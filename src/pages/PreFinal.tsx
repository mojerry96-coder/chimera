import { useMemo } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

/**
 * PAGE 13 — Evidence summary.  Route /pre-final
 *
 * One breath before the boardroom, and the player must confront their own
 * evidence. Section 10 page 13 is unambiguous: a read-only ledger and one
 * button. No metric cards, no charts, no gradient.
 *
 * Rows that do not apply are omitted rather than shown empty — a thin ledger
 * is itself information about how the run went.
 */
export default function PreFinal() {
  const { go } = useSceneNav("pre-final");
  const s = useSim();
  const r = useReveal([2.8]);

  useVoice(useMemo(() => [VO.P13_ADB_01, VO.P13_ADB_02], []));

  const rows = useMemo(() => {
    const out: [string, string][] = [];
    if (s.architectureValidity !== "none")
      out.push(["Architecture", `${s.patternDesigned ?? "—"} / ${s.architectureValidity}`]);
    if (s.justificationQuality !== "none") out.push(["Justification", s.justificationQuality]);
    if (s.allocation) out.push(["D-07", s.allocation.d07 >= 30 ? "Fixed" : "Under-resourced"]);
    if (s.crisisChoice)
      out.push(["Crisis", s.crisisChoice === "A" ? "Resolved" : "Escalated"]);
    if (s.workflowSequence) out.push(["UAT workflow", "Approved"]);
    out.push(["Time", `${s.timeRemaining} hours`]);
    out.push(["Trust", `${s.pilotConfidence}%`]);
    out.push(["Readiness", `${s.launchReadiness}%`]);
    return out;
  }, [s]);

  return (
    <PageShell
      pageNumber="13"
      media={<Plate src={PLATE.P13_CORRIDOR} alt="The corridor outside the boardroom." push />}
    >
      {r.at(1) && (
        <>
          <Box x={920} y={94} w={880} h={892} z={10} className="flat-panel" />

          <Box x={974} y={166} w={720} h={82} z={20}>
            <span className="label text-[var(--accent)]">Before you go in</span>
            <h1 className="heading-lg mt-14 text-[var(--paper)]">YOUR EVIDENCE</h1>
          </Box>

          {/* Rows are 720x54 with a 1px bottom rule. */}
          <Box x={974} y={286} w={720} h={516} z={20}>
            <div className="flex flex-col">
              {rows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex h-[54px] shrink-0 items-center justify-between border-b border-[var(--line)]"
                >
                  <span className="label text-[var(--text-muted)]">{k}</span>
                  <span className="body font-medium capitalize text-[var(--paper)]">{v}</span>
                </div>
              ))}
            </div>
          </Box>

          <Box x={1280} y={850} w={414} h={64} z={20}>
            <PrimaryButton onClick={() => go("final")}>
              Go in <ArrowRight size={18} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
