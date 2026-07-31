import { ArrowCounterClockwise, ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, SecondaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";
import { CRISIS } from "@/config/missionData";

const CONSEQUENCES = [
  { head: "Public trust down", body: "The receipts were already public. Silence confirmed them." },
  { head: "Financial impact escalating", body: `Duplicate debits continued past the ${CRISIS.amountLabel} that was reported.` },
  { head: "Response ineffective", body: "No one contacted the student. The pilot withdrew." }
];

/**
 * PAGE 20 — Failure: crisis mismanaged.  Route /failure-crisis
 *
 * The ethical failure, landed without spectacle.
 *
 * Section 10 page 20 holds the empty daylight room for four seconds with no UI
 * before the panel appears — the pause is the point, so it is not shortened.
 *
 * The mockup for this page shows a breaking-news broadcast with a red LIVE
 * banner and a non-Nigerian cast. Master section 10 states no breaking-news
 * spectacle is required and that the failure should feel professional and
 * ethically serious, so none of that is used.
 */
export default function FailureCrisis() {
  const { go } = useSceneNav("failure-crisis");
  const reset = useSim((s) => s.reset);
  // Four uncomfortable seconds of room tone before anything appears.
  const r = useReveal([4.0]);

  return (
    <PageShell
      pageNumber="20"
      showBrand={r.at(1)}
      media={<Plate src={PLATE.P15_EMPTY_DAY} alt="The empty project room in daylight." filter="subdued" />}
    >
      {r.at(1) && (
        <>
          <Box x={470} y={82} w={960} h={916} z={10} className="flat-panel" />

          <Box x={530} y={160} w={840} h={120} z={20}>
            <h1 className="display-md text-[var(--paper)]">
              CRISIS MISMANAGED
              <br />
              <span className="text-[var(--danger)]">PILOT COLLAPSED</span>
            </h1>
          </Box>

          <Box x={530} y={318} w={760} h={94} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">
              A student at {CRISIS.university} was charged {CRISIS.amountLabel} twice and told no one
              would answer. The system failed her, and then so did the response.
            </p>
          </Box>

          <Box x={530} y={474} w={760} h={286} z={20}>
            <div className="flex h-full flex-col justify-center gap-24">
              {CONSEQUENCES.map((c) => (
                <div
                  key={c.head}
                  className="flex items-start gap-18 border-b border-[var(--line)] pb-20"
                >
                  <span className="mt-2 text-[var(--danger)]">✕</span>
                  <div>
                    <p className="font-manrope text-[17px] font-semibold text-[var(--paper)]">
                      {c.head}
                    </p>
                    <p className="body mt-4 text-[var(--text-muted)]">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Box>

          <Box x={530} y={822} w={350} h={62} z={20}>
            <SecondaryButton onClick={() => go("debrief")}>
              Review Decisions <ArrowRight size={16} />
            </SecondaryButton>
          </Box>

          <Box x={904} y={822} w={350} h={62} z={20}>
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
