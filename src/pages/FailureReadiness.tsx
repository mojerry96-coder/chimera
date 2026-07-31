import { ArrowRight, Warning } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { SecondaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

const RISKS = [
  { head: "Unresolved technical risk", body: "Critical defects remain open in systems the pilot depends on." },
  { head: "Incomplete validation", body: "The evidence chain never reached a state anyone could sign." },
  { head: "Launch not recommended", body: "No responsible recommendation can be made from here." }
];

/**
 * PAGE 19 — Failure: launch readiness critical.  Route /failure-readiness
 *
 * A polished recommendation cannot repair an unsafe system.
 *
 * The mockup for this page shows a rocket mission-control room with a launch
 * pad outside the window and a non-Nigerian crew. That contradicts master
 * section 1.1, which forbids a science-fiction command centre, and the
 * continuity rules in bible section 12. Master section 21 governs, so the
 * background is the red defect board as specified — cooled and quiet, with the
 * board still visible behind the evidence table. No alarm pulse.
 */
export default function FailureReadiness() {
  const { go } = useSceneNav("failure-readiness");
  const readiness = useSim((s) => s.launchReadiness);
  const r = useReveal([0.2]);

  return (
    <PageShell
      pageNumber="19"
      media={<Plate src={PLATE.P06_RED_BOARD} alt="The defect board, quiet." filter="subdued" />}
    >
      {r.at(1) && (
        <>
          <Box x={340} y={118} w={1240} h={810} z={10} className="flat-panel" />

          <Box x={448} y={236} w={1020} h={100} z={20}>
            <h1 className="display-md text-[var(--paper)]">
              LAUNCH READINESS
              <br />
              <span className="text-[var(--danger)]">CRITICAL</span>
            </h1>
          </Box>

          {/* Static mark. Section 18 forbids pulsing. */}
          <Box x={448} y={386} w={260} h={260} z={20}>
            <div className="flex h-full w-full items-center justify-center rounded-[var(--radius-major)] border border-[var(--danger)]">
              <Warning size={110} className="text-[var(--danger)]" />
            </div>
          </Box>

          <Box x={760} y={378} w={650} h={230} z={20}>
            <div className="flex h-full flex-col justify-center gap-20">
              {RISKS.map((k) => (
                <div key={k.head} className="border-l-2 border-[var(--danger)] pl-18">
                  <p className="font-manrope text-[17px] font-semibold text-[var(--paper)]">
                    {k.head}
                  </p>
                  <p className="body mt-4 text-[var(--text-muted)]">{k.body}</p>
                </div>
              ))}
            </div>
          </Box>

          {/* Value and words together, never colour alone. */}
          <Box x={448} y={690} w={960} h={108} z={20}>
            <div className="flex h-full items-center justify-between rounded-[var(--radius-card)] border border-[var(--line)] px-36">
              <span className="label text-[var(--text-muted)]">Overall readiness</span>
              <div className="flex items-baseline gap-18">
                <span
                  className="text-[56px] tabular-nums text-[var(--danger)]"
                  style={{ fontFamily: '"Afacad", sans-serif', lineHeight: 1 }}
                >
                  {readiness}%
                </span>
                <span className="label text-[var(--danger)]">Below safe threshold</span>
              </div>
            </div>
          </Box>

          <Box x={790} y={830} w={360} h={62} z={20}>
            <SecondaryButton onClick={() => go("debrief")}>
              Review Decisions <ArrowRight size={16} />
            </SecondaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
