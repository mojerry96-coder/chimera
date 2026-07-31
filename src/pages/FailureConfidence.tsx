import { ArrowCounterClockwise, ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, SecondaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

const CONSEQUENCES = [
  "Pilot universities withdrew their sign-off",
  "The board lost confidence in the programme",
  "Launch authority was revoked"
];

/**
 * PAGE 18 — Failure: pilot confidence collapsed.  Route /failure-confidence
 *
 * Stakeholder trust as a real launch dependency. Section 10 page 18 forbids
 * exaggerated distressed acting, so the background is the daylight boardroom
 * plate rather than a performance.
 *
 * Section 17 — the value and the words appear together, so colour is never the
 * only signal.
 */
export default function FailureConfidence() {
  const { go } = useSceneNav("failure-confidence");
  const confidence = useSim((s) => s.pilotConfidence);
  const reset = useSim((s) => s.reset);
  const r = useReveal([0.2]);

  return (
    <PageShell
      pageNumber="18"
      media={<Plate src={PLATE.P18_EXEC_DAY} alt="The executive boardroom in daylight." filter="subdued" />}
    >
      {r.at(1) && (
        <>
          <Box x={486} y={126} w={1010} h={780} z={10} className="flat-panel" />

          <Box x={540} y={246} w={900} h={160} z={20}>
            <h1 className="display-md text-[var(--paper)]">
              PILOT CONFIDENCE
              <br />
              <span className="text-[var(--danger)]">COLLAPSED</span>
            </h1>
          </Box>

          <Box x={540} y={436} w={700} h={72} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">
              The universities the platform exists to serve stopped believing it would work.
              Without their confidence there is nothing left to launch.
            </p>
          </Box>

          <Box x={540} y={542} w={560} h={136} z={20}>
            <div className="flex flex-col gap-14">
              {CONSEQUENCES.map((c) => (
                <div key={c} className="flex items-center gap-14">
                  <span className="text-[var(--danger)]">✕</span>
                  <span className="body text-[var(--text-muted)]">{c}</span>
                </div>
              ))}
            </div>
          </Box>

          {/* Value and label together — never colour alone. */}
          <Box x={1168} y={510} w={220} h={150} z={20}>
            <div className="flex h-full flex-col items-center justify-center rounded-[var(--radius-card)] border border-[var(--danger)]">
              <span
                className="text-[64px] tabular-nums text-[var(--danger)]"
                style={{ fontFamily: '"Afacad", sans-serif', lineHeight: 1 }}
              >
                {confidence}%
              </span>
              <span className="label mt-12 text-center text-[var(--danger)]">
                Pilot
                <br />
                confidence
              </span>
            </div>
          </Box>

          <Box x={540} y={748} w={330} h={62} z={20}>
            <SecondaryButton onClick={() => go("debrief")}>
              Review Decisions <ArrowRight size={16} />
            </SecondaryButton>
          </Box>

          <Box x={892} y={748} w={330} h={62} z={20}>
            <PrimaryButton
              onClick={() => {
                reset();
                go("intro-01");
              }}
            >
              Redo Simulation <ArrowCounterClockwise size={16} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
