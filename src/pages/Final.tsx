import { useMemo, useState } from "react";
import { ArrowRight, RocketLaunch, Steps, Hourglass, Check } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, SecondaryButton } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

/**
 * Master section 10 page 14 — Full Launch, Phased Launch, Delay Launch.
 *
 * The mockup for this page reads GO LIVE / DELAY LAUNCH / PARTIAL LAUNCH.
 * Master section 21 makes the master document the source of truth, so these
 * are the labels and this is the order.
 *
 * No option is marked correct. The outcome band comes from accumulated
 * evidence, not from which card was chosen.
 */
const OPTIONS = [
  { id: "full" as const, label: "Full Launch", Icon: RocketLaunch, blurb: "All five systems go live to all three pilot universities." },
  { id: "phased" as const, label: "Phased Launch", Icon: Steps, blurb: "One university first, the rest once the evidence holds." },
  { id: "delay" as const, label: "Delay Launch", Icon: Hourglass, blurb: "Hold the date until the outstanding risk is closed." }
];

/**
 * PAGE 14 — Final recommendation.  Route /final
 *
 * The player owns a recommendation rather than discovering a hidden correct
 * answer. Section 10 page 14 limits the evidence shown here to three figures —
 * architecture, backlog and justification are deliberately not repeated.
 */
export default function Final() {
  const { go } = useSceneNav("final");
  const patch = useSim((s) => s.patch);
  const timeRemaining = useSim((s) => s.timeRemaining);
  const pilotConfidence = useSim((s) => s.pilotConfidence);
  const launchReadiness = useSim((s) => s.launchReadiness);

  const [choice, setChoice] = useState<"full" | "phased" | "delay" | null>(null);
  const [uiReady, setUiReady] = useState(false);

  const cues = useMemo<MediaCue[]>(
    () => [
      { src: VIDEO.V04_DOOR, poster: PLATE.P04_DOOR, alt: "Entering the boardroom." },
      { src: VIDEO.V08_EXEC, poster: PLATE.P08_EXEC, alt: "The executive three-shot." }
    ],
    []
  );

  useVoice(useMemo(() => [VO.P14_ADB_01], []));

  const evidence = [
    ["Time remaining", `${timeRemaining}h`],
    ["Pilot confidence", `${pilotConfidence}%`],
    ["Launch readiness", `${launchReadiness}%`]
  ];

  const confirm = () => {
    if (!choice) return;
    patch({ finalDecision: choice }, "Recommendation recorded");
    go("outcome");
  };

  return (
    <PageShell
      pageNumber="14"
      media={<MediaSequence cues={cues} onComplete={() => setUiReady(true)} />}
    >
      {uiReady && (
        <>
          <Box x={310} y={94} w={1300} h={894} z={10} className="flat-panel" />

          <Box x={382} y={170} w={1100} h={86} z={20}>
            <h1 className="display-md text-[var(--paper)]">
              FINAL <span className="text-[var(--accent)]">RECOMMENDATION</span>
            </h1>
          </Box>

          <Box x={382} y={274} w={900} h={58} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">
              Give the board your recommendation, and the evidence behind it.
            </p>
          </Box>

          {/* Cards are 370x290 with a 24px gap. */}
          <Box x={382} y={390} w={1156} h={290} z={20}>
            <div className="flex h-full gap-24">
              {OPTIONS.map((o) => {
                const on = choice === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setChoice(o.id)}
                    aria-pressed={on}
                    className={`relative flex h-full w-[370px] flex-col justify-between rounded-[var(--radius-card)] border p-28 text-left transition-colors ${
                      on
                        ? "border-[var(--accent)] bg-[var(--surface-raised)]"
                        : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-raised)]"
                    }`}
                  >
                    {on && (
                      <span className="absolute right-20 top-20 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[var(--accent)]">
                        <Check size={16} weight="bold" className="text-[var(--bg-deep)]" />
                      </span>
                    )}
                    <o.Icon size={38} className={on ? "text-[var(--accent)]" : "text-[var(--text-muted)]"} />
                    <div>
                      <p className="heading-md text-[var(--paper)]">{o.label}</p>
                      <p className="body mt-10 text-[var(--text-muted)]">{o.blurb}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Box>

          {/* Only these three figures appear here. */}
          <Box x={382} y={718} w={1156} h={44} z={20}>
            <div className="flex h-full items-center gap-40">
              {evidence.map(([k, v]) => (
                <span key={k} className="flex items-baseline gap-10">
                  <span className="label text-[var(--text-muted)]">{k}</span>
                  <span className="body font-semibold text-[var(--paper)]">{v}</span>
                </span>
              ))}
            </div>
          </Box>

          <Box x={742} y={822} w={260} h={60} z={20}>
            <SecondaryButton onClick={() => go("pre-final")}>Review Evidence</SecondaryButton>
          </Box>

          {choice && (
            <Box x={1032} y={822} w={414} h={60} z={20}>
              <PrimaryButton onClick={confirm}>
                Confirm Recommendation <ArrowRight size={18} />
              </PrimaryButton>
            </Box>
          )}
        </>
      )}
    </PageShell>
  );
}
