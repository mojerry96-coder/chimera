import { ArrowCounterClockwise, ArrowRight, Hourglass } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, SecondaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

/**
 * PAGE 17 — Failure: time expired.  Route /failure-time
 *
 * Repeated indecision is itself a decision. Section 10 page 17 — no red
 * full-page alarm, no character performance, no dialogue. Air-conditioning and
 * one distant chair movement are the whole soundtrack.
 */
export default function FailureTime() {
  const { go } = useSceneNav("failure-time");
  const spent = useSim((s) => s.timeSpentByTask);
  const reset = useSim((s) => s.reset);
  const r = useReveal([0.2]);

  const causes = Object.entries(spent)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <PageShell
      pageNumber="17"
      media={<Plate src={PLATE.P15_EMPTY_DAY} alt="The empty project room in daylight." filter="subdued" />}
    >
      {r.at(1) && (
        <>
          <Box x={390} y={146} w={1140} h={744} z={10} className="flat-panel" />

          <Box x={514} y={246} w={900} h={84} z={20}>
            <div className="flex items-center gap-18">
              <Hourglass size={34} className="text-[var(--text-muted)]" />
              <h1 className="display-md text-[var(--paper)]">TIME EXPIRED</h1>
            </div>
          </Box>

          <Box x={610} y={366} w={700} h={126} z={20}>
            <p
              className="text-center text-[96px] tabular-nums text-[var(--text-faint)]"
              style={{ fontFamily: '"Afacad", sans-serif', lineHeight: 1 }}
            >
              00:00:00
            </p>
          </Box>

          <Box x={560} y={530} w={800} h={74} z={20}>
            <p className="body-lg text-center text-[var(--paper-soft)]">
              The mission window closed before a recommendation reached the board.
              The launch decision was made without you.
            </p>
          </Box>

          <Box x={642} y={638} w={636} h={84} z={20}>
            <div className="flex flex-col gap-10">
              {causes.length > 0 ? (
                causes.map(([task, hours]) => (
                  <div key={task} className="flex items-center justify-between">
                    <span className="body text-[var(--text-muted)]">{task}</span>
                    <span className="body font-medium text-[var(--paper)]">{hours}h</span>
                  </div>
                ))
              ) : (
                <p className="body text-center text-[var(--text-muted)]">
                  Time drained without being spent on any task.
                </p>
              )}
            </div>
          </Box>

          <Box x={610} y={756} w={330} h={62} z={20}>
            <SecondaryButton onClick={() => go("debrief")}>
              Review Decisions <ArrowRight size={16} />
            </SecondaryButton>
          </Box>

          <Box x={964} y={756} w={330} h={62} z={20}>
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
